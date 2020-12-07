import firebase from 'firebase'
import CryptoJS from 'crypto-js'

/**
 * Appends account information to Firestore.
 * @param {String} userEmail Email of the logged in user.
 * @param {String} aesKey Key used for AES encryption. This is also the hash of their master password!
 * @param {String} accountURL URL for the website being saved.
 * @param {String} accountName Name (or email) of the account being saved.
 * @param {String} accountPassword Password (plaintext!) for the account being saved.
 * @param {firebase.firestore.Firestore} db Firestore reference, optional
 * @returns {Promise} A promise that signals when the data has been inserted.
 */
export function putAccount(userEmail, aesKey, accountURL, accountName, accountPassword, db = undefined) {
    let dbRef = db == undefined ? firebase.firestore() : db

    let accounts = { 
        [accountURL]: {
            accountName: accountName,
            password: encrypt(accountPassword, aesKey)
        }
    }

    return dbRef.collection('accounts').doc(userEmail).set({ accounts }, {merge: true})
}

/**
 * Gets all accounts belonging to a single user from Firestore.
 * @param {String} userEmail Email of the logged in user.
 * @returns {Promise} A promise containing data about the user's accounts.
 */
export function getAccounts(userEmail) {
    const db = firebase.firestore()
    return db.collection('accounts').doc(userEmail).get()
}

/** 
 *  Gets a single account from the logged in user.
 *  @param {String} userEmail Email of the logged in user.
 *  @param {String} aesKey Key used for AES encryption. This is also the hash of their master password!
 *  @param {String} accountURL URL for the website being retrieved.
 *  @returns {Promise} A promise containing the decrypted password of the account.
*/

export function getAccount(userEmail, aesKey, accountURL) {
    const db = firebase.firestore()

    return new Promise((resolve, reject) => {
        db.collection('accounts').doc(userEmail).get()
            .then((result) => {
                resolve({password: decrypt(result.data()['accounts'][accountURL]['password'], aesKey)})
            })
            .catch((err) => {
                console.log(err)
                reject({ err })
            })
    })
}

/**
 * Removes an account from the user's list of accounts.
 * @param {String} userEmail Email of the user who is logged into Axcess.
 * @param {String} accountURL Email of the account the user wishes to remove.
 * @param {firebase.firestore.Firestore} db Firestore reference, optional 
 */
export function removeAccount(userEmail, accountURL, db = undefined) {
    let dbRef = db == undefined ? firebase.firestore() : db
    var userRef = dbRef.collection('accounts').doc(userEmail)

    return userRef.update(
        new firebase.firestore.FieldPath('accounts', accountURL), 
        firebase.firestore.FieldValue.delete() 
    )
}

export function editAccount(userEmail, aesKey, accountURL = '', newAccountURL = '', accountName = '', accountPassword = '') {
    const db = firebase.firestore()

    // Check to make sure all optional parameters are filled out in this case
    // CLUNKY, ideally we would just edit the name of the map!
    if (accountURL != '' && accountName != '' && accountPassword != '') {
        return removeAccount(userEmail, accountURL, db)
            .then(() => {
                return putAccount(userEmail, aesKey, newAccountURL, accountName, accountPassword, db)
            })
        
    }

    // return userRef.update( new firebase.firestore.FieldPath('accounts', accountURL), newAccountURL)
}

/**
 * Search the current user's accounts by domain and name
 * @param {String} searchTerm The term to search by
 */
export function searchAccounts (email, searchTerm, maxResults, callback) {
    if (searchTerm.length == 0) return []

    const lowerSearchTerm = searchTerm.toLowerCase()
    getAccounts(email).then(snapshot => {
        const accounts = snapshot.data().accounts
        const matches = Object.keys(accounts)
            .filter(key => {
                const domainMatches = key.toLowerCase().includes(lowerSearchTerm)
                const nameMatches = accounts[key].accountName.toLowerCase().includes(lowerSearchTerm)
                return domainMatches || nameMatches
            })
            .map(key => ({...accounts[key], domain: key}))
            .sort((a, b) => ('' + a.accountName.attr).localeCompare(b.attr)) // Alphabetize results
            .slice(0, maxResults)

        callback(matches)
    })
}

/**
 * Encrypts plaintext using AES-256 and a key.
 * @param {String} plaintext The text to be encrypted
 * @param {String} key The key used for encryption, this is the hash of the master password
 */
export function encrypt(plaintext, key) {
    return CryptoJS.AES.encrypt(plaintext, key).toString()
}

/**
 * Decrypts ciphertext using AES-256.
 * @param {String} ciphertext The text to be decrypted.
 * @param {String} key The key used for decryption, this is the hash of the master password.
 * @returns {String} The decrypted text.
 */
export function decrypt(ciphertext, key) {

    if(ciphertext == null || ciphertext == '' || key == null || key == '')
        return 'error'

    let bytes = CryptoJS.AES.decrypt(ciphertext, key)
    return bytes.toString(CryptoJS.enc.Utf8)
}

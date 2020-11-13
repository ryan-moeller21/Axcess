import firebase from 'firebase'
import CryptoJS from 'crypto-js'

/**
 * Appends account information to Firestore.
 * @param {String} userEmail Email of the logged in user.
 * @param {String} aesKey Key used for AES encryption. This is also the hash of their master password!
 * @param {String} accountURL URL for the website being saved.
 * @param {String} accountName Name (or email) of the account being saved.
 * @param {String} accountPassword Password (plaintext!) for the account being saved.
 * @returns {Promise} A promise that signals when the data has been inserted.
 */
export function putAccount(userEmail, aesKey, accountURL, accountName, accountPassword) {
    const db = firebase.firestore()
    let accounts = { }

    // Have to do it this way, otherwise JavaScript wants to use accountURL as a string literal instead of the variable's value for the keyname :(
    accounts[accountURL] = {
        accountName: accountName,
        password: encrypt(accountPassword, aesKey)
    }

    return db.collection('accounts').doc(userEmail).set({ accounts }, {merge: true})
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

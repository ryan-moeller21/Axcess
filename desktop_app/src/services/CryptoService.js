import firebase from 'firebase'
import CryptoJS from 'crypto-js'

/*
    Appends account information to Firestore.

    userEmail: string       - Email of the logged in user.
    aesKey: string          - Key used for AES encryption. This is also the hash of their master password!
    accountURL: string      - URL for the website being saved.
    accountName: string     - Name (or email) of the account being saved.
    accountPassword: string - Password (plaintext!) for the account being saved.
*/
export function putAccount(userEmail, aesKey, accountURL, accountName, accountPassword) {
    const db = firebase.firestore()

    let accounts = { }

    // Have to do it this way, otherwise JavaScript wants to use accountURL as a string literal instead of the variable's value for the keyname :(
    accounts[accountURL] = {
        accountName: accountName,
        password: encrypt(accountPassword, aesKey)
    }

    db.collection('accounts').doc(userEmail).set({ accounts }, {merge: true})
}

/*
    Gets all accounts belonging to a single user from Firestore.

    userEmail: string   - Email of the logged in user.

    Return: Promise - A promise containing data about the user's accounts.
*/
export function getAccounts(userEmail) {
    const db = firebase.firestore()
    return db.collection('accounts').doc(userEmail).get()
}

/*
    Gets a single account from the logged in user.

    userEmail: string       - Email of the logged in user.
    aesKey: string          - Key used for AES encryption. This is also the hash of their master password!
    accountURL: string      - URL for the website being retrieved.
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

/*
    Encrypts plaintext using AES-256 and a key.

    plaintext: string   - The text to be encrypted
    key: string         - The key used for encryption, this is the hash of the master password
*/
export function encrypt(plaintext, key) {
    return CryptoJS.AES.encrypt(plaintext, key).toString()
}

/*
    Decrypts ciphertext using AES-256.

    ciphertext: string  - The text to be decrypted
    key: string         - The key used for decryption, this is the hash of the master password
*/
export function decrypt(ciphertext, key) {
    let bytes = CryptoJS.AES.decrypt(ciphertext, key)
    return bytes.toString(CryptoJS.enc.Utf8)
}

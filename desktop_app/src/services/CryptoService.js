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

    db.collection('accounts').doc(userEmail).update({
        url: accountURL,
        accountName: accountName,
        password: encrypt(aesKey, accountPassword)
    })
}

/*
    Gets all accounts belonging to a single user from Firestore.

    userEmail: string   - Email of the logged in user.
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

    // I don't think this will work, since I'm returning inside a promise...
    db.collection('accounts').doc(userEmail).get()
        .then((result) => {
            return decrypt(aesKey, result[accountURL])
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

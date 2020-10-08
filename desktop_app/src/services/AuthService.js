import firebase from 'firebase' // TODO: We should be using 'firebase/app', which is recommended for real builds. However, this causes firebase.firestore() to fail! Why??
import 'firebase/firebase-auth'
import { SEVERITY } from '../components/SnackbarManager.jsx'
import bcrypt, { hash } from 'bcryptjs'

/*
    Front-end function used to either login or register for an account with Axcess.

    email: string                   - Email entered by the user
    password: string                - Password entered by the user
    passwordConfirmation: string    - If defined, it's a register attempt. Otherwise it's a login attempt.
*/
export function tryLoginOrRegister(email, password, passwordConfirmation = undefined) {
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            reject({
                msg: 'All required fields are not filled out.',
                severity: SEVERITY.ERROR
            })
        }
        if (passwordConfirmation && passwordConfirmation != password) {
            reject({
                msg: 'Passwords don\'t match.',
                severity: SEVERITY.ERROR
            })
        }
        if (passwordConfirmation) {
            createNewUser(email, password, resolve, reject)
        } else {
            signIn(email, password, resolve, reject)
        }
    })
}

/*
    Private function that does creates a new user for our service. It first hashes the entered password, providing end-to-end security
    for the user's password, preventing us from blindly relying on TLS to make the password secure during transit. The salt for the password
    must be stored in the database, so that is pushed to Firestore. The username and password are then stored in Firebase's Authentication
    service, where it holds the username and password information for us. So, we never directly manage hashed passwords - Google does this for us.

    email: string       - Email entered by the user
    password: string    - Password entered by the user
    resolve: callback   - callback function to call when we successfully complete the action for the promise
    reject: callback    - callback function to call when we encounter failure
*/
function createNewUser(email, password, resolve, reject) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err

            firebase.auth().createUserWithEmailAndPassword(email, hash)
            .then(() => {
                // This has to be done until after the user successfully registers. 
                // If it occured before registration, then the salt would be overwritten in the database.
                // This would cause the user to be unable to log in, as the entered password would be hashed with this new salt,
                // which doesn't match the salt used during password generation.
                const db = firebase.firestore()
                db.collection('salts').doc(email).set({
                    'salt': salt
                })
                resolve({
                    msg: 'User successfully registered.',
                    severity: SEVERITY.SUCCESS
                })
            })
            .catch((err) => {
                console.log(err)
                reject({
                    msg: 'A user already exists with that email.',
                    severity: SEVERITY.ERROR
                })
            })
        })
    })
}

/*
    Private function that tries to login to the service. It first gets the salt from our Firestore database, and then rehashes the password
    with the same salt. It then sends that password to firebase, for it to compare against the saved copy.

    email: string       - Email entered by the user
    password: string    - Password entered by the user
    resolve: callback   - callback function to call when we successfully complete the action for the promise
    reject: callback    - callback function to call when we encounter failure
*/
function signIn(email, password, resolve, reject) {
    const db = firebase.firestore()
    db.collection('salts').doc(email).get()
    .then((result) => {
        // The password should be guaranteed to not be undefined, but I would occasionally get an error from
        // bcrypt complaining about the password being undefined... Not sure why, but this check prevents that.
        if (password != undefined && result.data() != undefined) {
            hash(password, result.data().salt)
            .then((hashedPassword) => {
                firebase.auth().signInWithEmailAndPassword(email, hashedPassword)
                .then(() => {
                    resolve({
                        msg: 'User successfully signed in.',
                        severity: SEVERITY.SUCCESS
                    })
                })
                .catch((err) => {
                    reject({
                        msg: 'Incorrect username/password specified.',
                        severity: SEVERITY.ERROR
                    })
                })
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            reject({
                msg: 'We can\'t seem to find your account.',
                severity: SEVERITY.ERROR
            })
        }
    })
    .catch((err) => {
        reject({
            msg: 'Database error, try again later.',
            severity: SEVERITY.ERROR
        })
        console.log(err)
    })
}
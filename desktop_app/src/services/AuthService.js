import firebase from 'firebase/app'
import 'firebase/firebase-auth'

export function authWithEmail(email, password, passwordConfirmation = undefined) {
    if (passwordConfirmation && passwordConfirmation != password) {
        alert("Passwords don't match")
        return
    }

    if (passwordConfirmation) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((reason) => {
            alert(`Account creation failed: ${reason.message}`)
        })
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch((reason) => {
            alert(`Login failed: ${reason.message}`)
        })
    }
}
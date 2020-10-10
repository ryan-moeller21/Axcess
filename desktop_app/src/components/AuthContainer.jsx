import React, { useState }  from 'react'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import MainPage from './MainPage.jsx'
import LoginPage from './LoginPage.jsx'

export default function AuthContainer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        setIsLoggedIn(user ? true : false)
    })

    return isLoggedIn ? (<MainPage setIsLoggedIn={setIsLoggedIn} />) : (<LoginPage />)
}
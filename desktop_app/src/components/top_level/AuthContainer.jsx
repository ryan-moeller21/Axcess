import React, { useState }  from 'react'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import MainPage from './MainPage.jsx'
import LoginPage from '../login/LoginPage.jsx'

export default function AuthContainer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [key, setKey] = useState('')

    firebase.auth().onAuthStateChanged((user) => {
        setIsLoggedIn(user ? true : false)
    })

    return isLoggedIn ? (<MainPage email={email} aesKey={key}/>) : (<LoginPage setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} setKey={setKey} />)
}
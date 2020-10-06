import React from 'react'
import firebase from 'firebase'
import MainPage from './MainPage.jsx'
import LoginPage from './LoginPage.jsx'

function AuthContainer() {
    return firebase.auth().currentUser ? (<MainPage />) : (<LoginPage />)
}

export default AuthContainer

import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import MainPage from './MainPage.jsx'
import LoginPage from './LoginPage.jsx'

export default class AuthContainer extends React.Component {
    constructor() {
        super()
        this.state = { isLoggedIn: false }
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({isLoggedIn: user ? true : false})
        })
    }

    render() {
        return this.state.isLoggedIn ? (<MainPage />) : (<LoginPage />)
    }
}
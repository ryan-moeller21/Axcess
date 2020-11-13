import React, { useState }  from 'react'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import { Container } from '@material-ui/core'
import SnackbarManager, { SEVERITY } from '../top_level/SnackbarManager.jsx'
import MainPage from './MainPage.jsx'
import LoginPage from '../login/LoginPage.jsx'

export default function AuthContainer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [key, setKey] = useState('')

    // Snackbar State
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState(SEVERITY.ERROR)

    firebase.auth().onAuthStateChanged((user) => {
        setIsLoggedIn(user ? true : false)
    })

    const showSnackbar = (message, severity) => {
        setSnackbarText(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    return (
        <Container>
            {isLoggedIn ? (<MainPage aesKey={key} showSnackbar={showSnackbar}/>) : (<LoginPage setIsLoggedIn={setIsLoggedIn} setKey={setKey} showSnackbar={showSnackbar}/>)}
            <SnackbarManager open={snackbarOpen} text={snackbarText} severity={snackbarSeverity} setOpen={setSnackbarOpen}/>
        </Container>
    )

    //return isLoggedIn ? (<MainPage aesKey={key}/>) : (<LoginPage setIsLoggedIn={setIsLoggedIn} setKey={setKey} />)
}
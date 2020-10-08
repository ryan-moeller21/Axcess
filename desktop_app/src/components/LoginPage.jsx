import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import { tryLoginOrRegister } from '../services/AuthService'
import SnackbarManager, { SEVERITY } from './SnackbarManager.jsx'

const useStyles = makeStyles((theme) => ({
    textCenter: {
        textAlign: 'center'
    },
    authForm: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'column',
        padding: 25,
    }
}))

export default function LoginPage(props) {
    const classes = useStyles()

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined)
    const [createNewAccount, setCreateNewAccount] = useState(false)

    // Snackbar Crap
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState(SEVERITY.ERROR)

    let mounted = false

    var changeAuthTypeText = createNewAccount
        ? 'I already have an account'
        : 'I don\'t have an account yet'

    const showSnackbar = (message, severity) => {
        if (mounted) { // Without this if, we were updating the component when it wasn't being rendered any more, because we went into the app. This prevents that.
            setSnackbarText(message)
            setSnackbarSeverity(severity)
            setSnackbarOpen(true)
        }
    }

    const signInClicked = () => {
        tryLoginOrRegister(email, password, createNewAccount ? passwordConfirm : undefined)
        .then((result) => {
            mounted = false
            props.setIsLoggedIn(true)
        })
        .catch((error) => {
            showSnackbar(error.msg, error.severity)
        })
    }

    return (
        <Container maxWidth='xs'>
            <Card className={classes.authFormContainer}>
                <Typography variant="h5" component="h2" className={classes.textCenter}>Continue with email:</Typography>
                <form className={classes.authForm}>
                    <TextField required
                        label='Email'
                        onChange={({ target: { value } }) => setEmail(value)}/>
                    <TextField required
                        label='Password'
                        type='password'
                        onChange={({ target: { value } }) => setPassword(value)}/>
                    {
                        createNewAccount
                            ? <TextField required
                                label='Confirm password'
                                type='password'
                                onChange={({ target: { value } }) => setPasswordConfirm(value)}/>
                            : undefined
                    }
                    <Button style={{margin: 5 }} variant='contained' onClick={signInClicked}>{createNewAccount ? "Register" : "Log In"}</Button>
                    <Button size="small" style={{textDecorationLine: 'underline'}} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                </form>
            </Card>
            <SnackbarManager open={snackbarOpen} text={snackbarText} severity={snackbarSeverity} setOpen={setSnackbarOpen}/>
        </Container>
    )
}

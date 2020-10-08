import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { tryLoginOrRegister } from '../services/AuthService'

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginPage(props) {
    const classes = useStyles()

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined)
    const [createNewAccount, setCreateNewAccount] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    var changeAuthTypeText = createNewAccount
        ? 'I already have an account'
        : 'I don\'t have an account yet'

    const showSnackbar = (message) => {
        setSnackbarText(message)
        setSnackbarOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const signInClicked = () => {

        tryLoginOrRegister(email, password, createNewAccount ? passwordConfirm : undefined)
        .then((result) => {
            props.setIsLoggedIn(true)
        })
        .catch((error) => {
            showSnackbar(error.msg)
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
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Container>
    )
}

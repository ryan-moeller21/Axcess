import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import firebase from 'firebase'
import bcrypt, { hash } from 'bcryptjs'

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

export default function LoginPage() {
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

    const createNewUser = (email, password) => {
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
                })
                .catch((err) => {
                    // TODO: Show popup, I think that a Material UI Snackbar would look great here.
                    throw(err)
                })
            })
        })
    }
    
    const signIn = (email, password) => {
        const db = firebase.firestore()
        db.collection('salts').doc(email).get()
        .then((result) => {
            if (result.data() != undefined) {
                hash(password, result.data().salt)
                .then((hashedPassword) => {
                    firebase.auth().signInWithEmailAndPassword(email, hashedPassword)
                    .catch(function(error) {
                        console.log(error)
                        showSnackbar('Incorrect username/password specified.')
                        throw error // TODO: For whatever reason, Node thinks that we don't catch this error, and it says so in the console. How do we fix this?
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                showSnackbar('We can\'t seem to find your account.')
            }
        })
        .catch((err) => {
            showSnackbar('Database error, try again later.')
            throw err
        })
    }
    
    const authWithEmail = (email, password, passwordConfirmation = undefined) => {
        if (!email || !password) {
            return
        }
        if (passwordConfirmation && passwordConfirmation != password) {
            alert("Passwords don't match")
            return
        }
        if (passwordConfirmation) {
            createNewUser(email, password)
        } else {
            signIn(email, password)
        }
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
                    <Button style={{margin: 5 }} variant='contained' onClick={() => authWithEmail(email, password, createNewAccount ? passwordConfirm : undefined)}>{createNewAccount ? "Register" : "Log In"}</Button>
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

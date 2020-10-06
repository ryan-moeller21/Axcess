import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import firebase from 'firebase'

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

function authWithEmail(email, password, passwordConfirmation = undefined) {
    if (!email || !password) {
        return
    }

    console.log("Called authWithEmail")
    if (passwordConfirmation && passwordConfirmation != password) {
        alert("Passwords don't match")
        return
    }

    if (passwordConfirmation) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
    }
}

export default function LoginPage() {
    const classes = useStyles()

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined)
    const [createNewAccount, setCreateNewAccount] = useState(false)

    var changeAuthTypeText = createNewAccount
        ? 'I already have an account'
        : 'I don\'t have an account yet'

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
                    <Button style={{margin: 5 }} variant='contained' onClick={() => authWithEmail(email, password, createNewAccount ? passwordConfirm : undefined)}>Log In</Button>
                    <Button size="small" style={{textDecorationLine: 'underline'}} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                </form>
            </Card>
        </Container>
    )
}

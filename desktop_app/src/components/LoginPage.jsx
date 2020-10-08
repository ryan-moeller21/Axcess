import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import { authWithEmail } from '../services/AuthService'

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

export default function LoginPage() {
    const classes = useStyles()

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined)
    const [createNewAccount, setCreateNewAccount] = useState(false)

    var loginButtonText = createNewAccount
        ? 'Create account'
        : 'Log in'

    var changeAuthTypeText = createNewAccount
        ? 'I already have an account'
        : 'I don\'t have an account yet'

    return (
        <div>
            <Typography variant='h2' component='h1' align='center' color='textPrimary' style={{ padding: 25 }}>Welcome to Axכess:</Typography>
            <Container maxWidth='xs'>
                <Card style={{ marginTop: 150, padding: 10 }}>
                    <Typography variant='h5' component='h2' className={classes.textCenter}>Continue with email:</Typography>
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
                        <Button style={{ margin: 5 }} variant='contained' onClick={() => authWithEmail(email, password, createNewAccount ? passwordConfirm : undefined)}>{loginButtonText}</Button>
                        <Button size='small' style={{textDecorationLine: 'underline'}} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                    </form>
                </Card>
            </Container>
        </div>
    )
}

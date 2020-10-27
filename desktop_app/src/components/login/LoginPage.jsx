import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import { tryLoginOrRegister } from '../../services/AuthService'
import SnackbarManager, { SEVERITY } from '../top_level/SnackbarManager.jsx'
import Colors from '../Colors.json'


const useStyles = makeStyles((theme) => ({
   
    textCenter: {
        textAlign: 'center',
        padding: 25,
        color: Colors['FONT_PRIMARY'],
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 25,
        paddingLeft:25,
        paddingRight: 25,
        paddingBottom: 7
       
    },
    authForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        backgroundColor: Colors['BACKGROUND'],
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    input: {
        color: Colors['FONT_SECONDARY']
    }
}))


export default function LoginPage (props) {
    const classes = useStyles()

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined)
    const [createNewAccount, setCreateNewAccount] = useState(false)

    // Snackbar Crap
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState(SEVERITY.ERROR)

    let mounted = true

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
                props.setEmail(email)
                props.setKey(result.key)
                props.setIsLoggedIn(true)
            })
            .catch((error) => {
                showSnackbar(error.msg, error.severity)
            })
    }

    //TODO: Add logo?
    return (
        <Container style={{marginTop: '10vmin'}}  maxWidth='sm'>
            <Card className={classes.authFormContainer} style={{ backgroundColor: "transparent" }} elevation={0}>
                <Typography variant="h4" component="h2" className={classes.textCenter}>Axɔess</Typography>
                <form className={classes.authForm}>
                    <TextField required
                        label='Email'
                        InputProps={{
                            className: classes.input
                        }}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        onChange={({ target: { value } }) => setEmail(value)}/>
                    <TextField required
                        label='Password'
                        type='password'
                        InputProps={{
                            className: classes.input
                        }}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        onChange={({ target: { value } }) => setPassword(value)}/>
                    {
                        createNewAccount
                            ? <TextField required
                                label='Confirm password'
                                type='password'
                                InputProps={{
                                    className: classes.input
                                }}
                                InputLabelProps={{
                                    className: classes.input
                                }}
                                onChange={({ target: { value } }) => setPasswordConfirm(value)}/>
                            : undefined
                    }
                    <Button style={{ margin: 5 }} variant='contained' onClick={signInClicked}>{createNewAccount ? 'Register' : 'Log In'}</Button>
                    <Button size="small" style={{ textDecorationLine: 'underline', color: Colors['FONT_SECONDARY'] }} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                </form>
            </Card>
            <SnackbarManager open={snackbarOpen} text={snackbarText} severity={snackbarSeverity} setOpen={setSnackbarOpen}/>
        </Container>
    )
}

LoginPage.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setKey: PropTypes.func.isRequired
}

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import { tryLoginOrRegister } from '../../services/AuthService'
import SnackbarManager, { SEVERITY } from '../top_level/SnackbarManager.jsx'
import Colors from '../Colors.json'


const useStyles = makeStyles(() => ({
   
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
    },
    textField: {
        margin: '10px'
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: `${Colors['FONT_SECONDARY']} !important`
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
                    <TextField
                        label='Email'
                        variant="outlined"
                        className={classes.textField}
                        InputProps={{
                            className: classes.input,
                            classes: { notchedOutline: classes.notchedOutline }
                        }}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        onChange={({ target: { value } }) => setEmail(value)}/>
                    <TextField
                        label='Password'
                        type='password'
                        variant="outlined"
                        className={classes.textField}
                        InputProps={{
                            className: classes.input,
                            classes: { notchedOutline: classes.notchedOutline }
                        }}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        onChange={({ target: { value } }) => setPassword(value)}/>
                    {
                        createNewAccount
                            ? <TextField
                                label='Confirm password'
                                type='password'
                                variant="outlined"
                                className={classes.textField}
                                InputProps={{
                                    className: classes.input,
                                    classes: { notchedOutline: classes.notchedOutline }
                                }}
                                InputLabelProps={{
                                    className: classes.input
                                }}
                                onChange={({ target: { value } }) => setPasswordConfirm(value)}/>
                            : undefined
                    }
                    <Button id="button" classes={{ label: 'loginButton' }} style={{ marginTop: 25, marginBottom: 15 }} variant='contained' onClick={signInClicked}>{createNewAccount ? 'Register' : 'Log In'}</Button>
                    <Button id="textHover" size="small" style={{ textDecorationLine: 'underline', transitionDuration: '0.1s' }} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                </form>
            </Card>
            <SnackbarManager open={snackbarOpen} text={snackbarText} severity={snackbarSeverity} setOpen={setSnackbarOpen}/>
        </Container>
    )
}

LoginPage.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setKey: PropTypes.func.isRequired
}
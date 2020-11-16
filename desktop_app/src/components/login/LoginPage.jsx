import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Container, Button, Card, Typography } from '@material-ui/core'
import { tryLoginOrRegister } from '../../services/AuthService'
import Colors from '../Colors.json'

const useStyles = makeStyles(() => ({
    textCenter: {
        textAlign: 'center',
        color: Colors['FONT_PRIMARY'],
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 25,
        paddingLeft:25,
        paddingRight: 25,
        paddingBottom: 7,
        backgroundColor: Colors['COLOR_PRIMARY']
       
    },
    authForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        backgroundColor: Colors['COLOR_PRIMARY'],
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        color: Colors['BACKGROUND']
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

    var changeAuthTypeText = createNewAccount
        ? 'I already have an account'
        : 'I don\'t have an account yet'

    /**
     * Handles the main button press. Calls tryLoginOrRegister, which handles the logic of either logging in or registering the user, along with checking for 
     * password correctness, account existance, and more.
     */
    const signInClicked = () => {
        tryLoginOrRegister(email, password, createNewAccount ? passwordConfirm : undefined)
            .then((result) => {
                props.setKey(result.key)
            })
            .catch((error) => {
                props.showSnackbar(error.msg, error.severity)
            })
    }

    /**
     * 
     * @param {React.KeyboardEvent<HTMLDivElement>} event
     */
    const enterPressed = (event) => {
        signInClicked()
        event.target.blur()
        document.getElementById('button').focus()
    }

    //TODO: Add logo?
    return (
        <Container style={{marginTop: '10vmin'}}  maxWidth='sm'>
            <Card className={classes.authFormContainer} style={{ backgroundColor: "transparent" }} elevation={0}>
                <Typography variant="h3" component="h2" className={classes.textCenter}>Axɔess</Typography>
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
                        id='passwordInput'
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
                        onChange={({ target: { value } }) => setPassword(value)}
                        onKeyDown={(event) => event.key === 'Enter' ? enterPressed(event) : null }/>
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
                                onChange={({ target: { value } }) => setPasswordConfirm(value)}
                                onKeyDown={(event) => event.key === 'Enter' ? enterPressed(event) : null}/>
                            : undefined
                    }
                    <Button id="button" classes={{ label: 'loginButton' }} style={{ marginTop: 25, marginBottom: 15 }} variant='contained' onClick={signInClicked}>{createNewAccount ? 'Register' : 'Log In'}</Button>
                    <Button id="textHover" size="small" style={{ textDecorationLine: 'underline', transitionDuration: '0.1s' }} onClick={() => setCreateNewAccount(!createNewAccount)}>{changeAuthTypeText}</Button>
                </form>
            </Card>
        </Container>
    )
}

LoginPage.propTypes = {
    setKey: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func.isRequired
}

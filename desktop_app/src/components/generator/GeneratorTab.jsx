import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Slider, Typography } from '@material-ui/core';
import Colors from '../Colors.json'
import { SEVERITY } from '../top_level/SnackbarManager.jsx'

const useStyles = makeStyles((theme) => ({
    FormLabel: {
        color: Colors['FONT_PRIMARY'],
        paddingBottom: 15,
        paddingTop: 30
    },
    FormGroup: {
        color: Colors['FONT_PRIMARY'],
    },
    slider: {
        width: 300,
        color: Colors['GREEN_ACCENT'],
        paddingBottom: 20
    },
    button: {
        width: 200,
        height: 30,
        borderRadius: 7
    },
    centerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickToBottom: {

        position: 'fixed',
        bottom: 50
    },
    colorPrimary: {
        colorPrimary: Colors['COLOR_PRIMARY']
    }
}))

/*
Generates a password given that matches the selected character options.
Should be O(n) 
*/
function PwdGenerator(props) {
    const classes = useStyles()

    // Password Slider Constants
    const DEFAULT_PASSWORD_LENGTH = 18
    const MIN_PASSWORD_LENGTH = 8
    const MAX_PASSWORD_LENGTH = 32
    const RECOMMENDED_PASSWORD_LENGTH = 15

    // Password Generation Constants
    const upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerChars="abcdefghijklmnopqrstuvwxyz"
    const numericalChars="0123456789"
    const symChars="!@#$%^&*()_+-={[}];:|?.>,<~"

    // Password State
    const [passwordLength, setPasswordLength] = useState(DEFAULT_PASSWORD_LENGTH)
    const [generatedPassword, setGeneratedPassword] = useState('')
    
    //Dialog State
    const [open, setOpen] = React.useState(false);


    // Password Generation Parameters
    var allowedChars = ''
    var charSpaceLen = 0

    const [state, setState] = React.useState({
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: false
    })

    const updateCharacterSet = () => {
        var tempCharSet = ''

        if(state.upperCase) {
            tempCharSet = tempCharSet.concat(upperChars)
        }
        if(state.lowerCase) {
            tempCharSet = tempCharSet.concat(lowerChars)
        }
        if(state.numbers) {
            tempCharSet = tempCharSet.concat(numericalChars)
        }
        if(state.symbols) {
            tempCharSet = tempCharSet.concat(symChars)
        }

        allowedChars = tempCharSet
        charSpaceLen = allowedChars.length
    }

    const handleCheckChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
        updateCharacterSet()
    }

    const handleSlideChange = (event, newValue) => {
        setPasswordLength(newValue)
        if (newValue < RECOMMENDED_PASSWORD_LENGTH)
            props.showSnackbar('Warning: Using passwords under ' + RECOMMENDED_PASSWORD_LENGTH + ' characters is discouraged.', SEVERITY.WARNING)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const generateClicked = () => {
        if(!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols) {
            props.showSnackbar('Please select a set of characters.', SEVERITY.ERROR)
        }
        else {
            var newPass = ''
            do {
                newPass = ''
                for(var iterator = 0; iterator < passwordLength; iterator ++) {
                    /*Select a random character from our allowed characters and append to the generating password. */
                    newPass = newPass.concat(allowedChars.charAt(Math.floor(Math.random() * charSpaceLen)))
                }
            } while(!isGoodPassword(newPass))

            if (isGoodPassword)
                setGeneratedPassword(newPass)
            else
                setGeneratedPassword('Bad Password')
        }
    }

    /*
    Regular expressions for testing whether a password is "good"
    */
    const isUpperCase = (string) => /^[A-Z]*$/.test(string)
    const isLowerCase = (string) => /^[a-z]*$/.test(string)
    const isNumber = (string) => /^[0-9]*$/.test(string)
    const isSymbol = (string) => /^[!@#$%^&*]*$/.test(string)
    /* 
    Checks if a given password includes all of the currently selected password criteria.
    This is needed since the generation may or may not include all of the selected character types due to randomness.
    */
    function isGoodPassword(newPassword) {
        var upperFlag = !state.upperCase
        var lowerFlag = !state.lowerCase
        var numFlag = !state.numbers
        var symFlag = !state.symbols
        var iterator
        for(iterator = 0; iterator < passwordLength; iterator ++){
            var current = newPassword.charAt(Math.floor(iterator))
            if(state.upperCase){
                if(isUpperCase(current)) {
                    upperFlag = true
                }
            }
            if(state.lowerCase){
                if(isLowerCase(current)) {
                    lowerFlag = true
                }
            }
            if(state.numbers){
                if(isNumber(current)) {
                    numFlag = true
                }
            }
            if(state.symbols){
                if(isSymbol(current)) {
                    symFlag = true
                }
            }
        }
            
        return upperFlag && lowerFlag && numFlag && symFlag
    }
    
    // Check the currently selected buttons to update password generation settings.
    updateCharacterSet()

    return(
        <div hidden={props.index !== props.value}>
            
            <Typography variant='h3'>
                Password Generator
            </Typography>
                
            <Container className={classes.centerContent}>
                <FormControl className={classes.FormControl} >
                    <FormLabel id="formLabel" className={classes.FormLabel} variant='h5' >Valid characters for new password</FormLabel>
                    <FormGroup className={classes.FormGroup}>
                        {/*Checkbox grouping for selecting password paramters */}
                        <FormControlLabel
                            control={<Checkbox className={classes.colorPrimary} checked={state.upperCase} onChange={handleCheckChange} name="upperCase" style={{color: Colors['GREEN_ACCENT']}} />}
                            label="Uppercase Letters"     
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.lowerCase} onChange={handleCheckChange} name="lowerCase" style={{color: Colors['GREEN_ACCENT']}} />}
                            label="Lowercase Letters"     
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.numbers} onChange={handleCheckChange} name="numbers" style={{color: Colors['GREEN_ACCENT']}} />}
                            label="Numbers"      
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.symbols} onChange={handleCheckChange} name="symbols" style={{color: Colors['GREEN_ACCENT']}} />}
                            label="Symbols"             
                        />
                    </FormGroup>
                </FormControl>
            </Container>

            <Typography gutterBottom className={classes.FormLabel} style={{ textAlign: 'center'}} variant="h6">Password Length</Typography>
            <Container className={ classes.centerContent } maxWidth='sm'>
                <Slider
                    className={classes.slider}
                    defaultValue={DEFAULT_PASSWORD_LENGTH}
                    valueLabelDisplay="auto"
                    step={1}
                    min={MIN_PASSWORD_LENGTH}
                    max={MAX_PASSWORD_LENGTH}
                    onChange={handleSlideChange}
                />
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"New Password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {generatedPassword}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="large" variant='contained'>
                        Copy
                    </Button>
                </DialogActions>
            </Dialog>
            <Container className={classes.centerContent} style={{ position: 'relative', marginBottom:'75px'}}>
                <Button className={classes.stickToBottom} size="large" variant='contained' disabled={!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols} onClick={generateClicked}> Generate </Button>
            </Container>
            <Container className={classes.centerContent}>
                <Typography variant='h4' style={{ color: Colors['FONT_PRIMARY'] }}>
                    { generatedPassword }
                </Typography>
            </Container>

            <Container className={classes.centerContent} style={{ position: 'relative', marginTop: '100px'}}>
                <Button className={classes.stickToBottom} size="large" variant='contained' onClick={generateClicked}> Generate </Button>
            </Container>

        </div>
    )
}

PwdGenerator.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string,
    showSnackbar: PropTypes.func.isRequired
}

export default PwdGenerator
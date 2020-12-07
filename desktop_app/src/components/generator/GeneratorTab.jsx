import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Slider, Typography } from '@material-ui/core';
import Colors from '../Colors.json'
import { SEVERITY } from '../top_level/SnackbarManager.jsx'
import copyToClipboard from 'copy-to-clipboard'
import {generatePassword} from '../../services/GeneratorService.js'

const useStyles = makeStyles(() => ({
    FormLabel: {
        color: Colors['FONT_PRIMARY'],
        marginTop: 10,
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

    // Password State
    const [passwordLength, setPasswordLength] = useState(DEFAULT_PASSWORD_LENGTH)
    const [generatedPassword, setGeneratedPassword] = useState('')
    
    //Dialog State
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: false
    })
    
    const handleCheckChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
       
    }

    const handleSlideChange = (event, newValue) => {
        setPasswordLength(newValue)
        if (newValue < RECOMMENDED_PASSWORD_LENGTH)
            props.showSnackbar('Warning: Using passwords under ' + RECOMMENDED_PASSWORD_LENGTH + ' characters is discouraged.', SEVERITY.WARNING)
    }

    const handleClose = () => {
        copyToClipboard(generatedPassword)
        props.showSnackbar('Password copied to clipboard!', SEVERITY.SUCCESS)
        setOpen(false);
    };

    /*
    Calls the generate password method from the genrator services file.
    */
    const generateClicked = () => {
        if(!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols) {
            props.showSnackbar('Please select a set of characters.', SEVERITY.ERROR)
        }
        else {
            var newPass = generatePassword(state.upperCase, state.lowerCase, state.numbers, state.symbols, passwordLength)
            setGeneratedPassword(newPass)
            setOpen(true);

        }
    }

    return(
        <React.Fragment>
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
                    { /* generatedPassword */ }
                </Typography>
            </Container>

            <Container className={classes.centerContent} style={{ position: 'relative', marginTop: '100px'}}>
                <Button className={classes.stickToBottom} size="large" variant='contained' onClick={generateClicked}> Generate </Button>
            </Container>

        </React.Fragment>
    )
}

PwdGenerator.propTypes = {
    showSnackbar: PropTypes.func.isRequired
}

export default PwdGenerator
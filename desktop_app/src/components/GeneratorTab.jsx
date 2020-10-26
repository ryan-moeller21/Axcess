import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Slider, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    },
    pos:{
        margin: 12
    }
}))

/*
Generates a password given that matches the selected character options.
Should be O(n) 
*/
function PwdGenerator(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: false
    });
    const [passwordLength, setPasswordLength] = React.useState(10);
    
    const handleCheckChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
    };
    const handleSlideChange = (event, newValue) => {
        setPasswordLength(newValue);
    }
    const generateClicked = () => {
        console.log("Generated with length" + passwordLength);

        var allowedChars="";
        var newPass="";
        var charSpace = 0;
        const upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerChars="abcdefghijklmnopqrstuvwxyz";
        const numChars="0123456789";
        const symChars="!@#$%^&*";

        /*
        If no character types are selected, reject the generation attempt
        TODO: Investigate not allowing the button to be pressed unless at least one state is true
        */
        if(!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols){
            console.log("TODO: Handle rejection gracefully");
        }
        else{
            if(state.upperCase){
                allowedChars = allowedChars.concat(upperChars);
                charSpace += 26;
            }
            if(state.lowerCase){
                allowedChars = allowedChars.concat(lowerChars);
                charSpace += 26;
            }
            if(state.numbers){
                allowedChars = allowedChars.concat(numChars);
                charSpace += 10;
            }
            if(state.symbols){
                allowedChars = allowedChars.concat(symChars);
                charSpace += 8;

            }

            do{
                newPass = "";
                for(var iterator = 0; iterator < passwordLength; iterator ++){
                    /*Select a random character from our allowed characters and append to the generating password. */
                    newPass = newPass.concat(allowedChars.charAt(Math.floor(Math.random() * charSpace)))
                }
            }while(!isGoodPassword(newPass))
           
            console.log(newPass);
            console.log(isGoodPassword(newPass))
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
    function isGoodPassword(newPassword){
        var upperFlag = !state.upperCase;
        var lowerFlag = !state.lowerCase;
        var numFlag = !state.numbers;
        var symFlag = !state.symbols;
        var iterator;
        for(iterator = 0; iterator < passwordLength; iterator ++){
            var current = newPassword.charAt(Math.floor(iterator))
            if(state.upperCase){
                if(isUpperCase(current)){
                    upperFlag = true;
                }
            }
            if(state.lowerCase){
                if(isLowerCase(current)){
                    lowerFlag = true;
                }
            }
            if(state.numbers){
                if(isNumber(current)){
                    numFlag = true;
                }
            }
            if(state.symbols){
                if(isSymbol(current)){
                    symFlag = true
                }
            }
        }
            
        return upperFlag && lowerFlag && numFlag && symFlag;
    }
    

    return(
        <div hidden={props.index !== props.value}>
            <Grid className={classes.root} container>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        Password Generator
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3} md={2}>
                    <Card className={classes.pos}>
                        <CardContent>
                            <FormControl className={classes.FormControl}>
                                <FormLabel>Valid characters for new password</FormLabel>
                                <FormGroup>
                                    {/*Checkbox grouping for selecting password paramters */}
                                    <FormControlLabel
                                        control={<Checkbox checked={state.upperCase} onChange={handleCheckChange} name="upperCase" />}
                                        label="Uppercase Letters"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={state.lowerCase} onChange={handleCheckChange} name="lowerCase" />}
                                        label="Lowercase Letters"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={state.numbers} onChange={handleCheckChange} name="numbers" />}
                                        label="Numbers"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={state.symbols} onChange={handleCheckChange} name="symbols" />}
                                        label="Symbols"
                                    />
                                </FormGroup>
                            </FormControl>
                    
                            <Typography gutterBottom>Password Length</Typography>
                            {/*TODO: Make this slider more narrow while contained in the card. */}
                            <Slider
                                defaultValue={10}
                                valueLabelDisplay="auto"
                                step={1}
                                min={8}
                                max={20}
                                onChange={handleSlideChange}
                            />
                            <Button variant="contained" color="primary" disabled={!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols} onClick={generateClicked}>Submit</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4} md={2}>
                    <Card className={classes.pos}>
                        <CardContent>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="password-input" label="Password" defaultValue="password"/>
                                <TextField id="website-input" label="Website" defaultValue="website.com" />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

PwdGenerator.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string
}

export default PwdGenerator

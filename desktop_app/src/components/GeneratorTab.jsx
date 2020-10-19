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
    const generateClicked = () => {
        console.log("Generated");

        var allowedChars="";
        const upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerChars="abcdefghijklmnopqrstuvwxyz";
        const numChars="0123456789";
        const symChars="!@#$%^&*";

        /*If no character types are selected, reject the generation attempt
        TODO: Investigate not allowing the button to be pressed unless at least one state is true*/
        if(!state.upperCase&&!state.lowerCase&&!state.numbers&&!state.symbols){
            console.log("TODO: Handle rejection gracefully");
        }
        else{
            if(state.upperCase){
                allowedChars = allowedChars.concat(upperChars);
                console.log("Appending uppers");
            }
            if(state.lowerCase){
                allowedChars = allowedChars.concat(lowerChars);
                console.log("Appending lowers");
            }
            if(state.numbers){
                allowedChars = allowedChars.concat(numChars);
                console.log("Appending numbers");
            }
            if(state.symbols){
                allowedChars = allowedChars.concat(symChars);
                console.log("Appending symbols");
            }
            console.log(allowedChars);
        }


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
                            {/*TODO: Make this slider more narrow while contained in the card. This is ugly. */}
                            <Slider
                                defaultValue={10}
                                valueLabelDisplay="auto"
                                step={1}
                                min={8}
                                max={20}
                            />
                            <Button variant="contained" color="primary" onClick={generateClicked}>Submit</Button>
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

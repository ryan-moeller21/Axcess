import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Slider, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    /*root: {
        
        color: '#eceff1',
 
    },*/
    FormLabel: {
        color: '#eceff1',
        paddingBottom: 15,
        paddingLeft: 50,
        paddingTop: 30

    },
    FormGroup: {
        color: '#eceff1',
        paddingLeft: 80
    },
    slider: {
        width: '200',
        color: '#a3f7bf'
    },
    button: {
        width: 200,
        height: 30,
        borderRadius: 7
        
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
            
            <Typography variant='h3'>
                        Password Generator
            </Typography>
                
            <FormControl  className={classes.FormControl} >
                <FormLabel id="formLabel" className={classes.FormLabel} >Valid characters for new password</FormLabel>
                <FormGroup className={classes.FormGroup}>
                    {/*Checkbox grouping for selecting password paramters */}
                    <FormControlLabel
                        control={<Checkbox checked={uppercase} onChange={handleCheckChange} name="uppercase" style={{color: '#a3f7bf'}} />}
                        label="Uppercase Letters"
                        
                                
                    />
                    <FormControlLabel
                        control={<Checkbox checked={lowercase} onChange={handleCheckChange} name="lowercase" style={{color: '#a3f7bf'}} />}
                        label="Lowercase Letters"
                                 
                    />
                    <FormControlLabel
                        control={<Checkbox checked={numbers} onChange={handleCheckChange} name="numbers" style={{color: '#a3f7bf'}}/>}
                        label="Numbers"
                                
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symbols} onChange={handleCheckChange} name="symbols" style={{color: '#a3f7bf'}}/>}
                        label="Symbols"
                                 
                    />
                </FormGroup>
            </FormControl>
              
            <Typography gutterBottom className={classes.FormLabel} style={{ textAlign: 'center'}} variant="h6">Password Length</Typography>
            <Container maxWidth='sm' >
                <Slider
                    className={classes.slider}
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    step={1}
                    min={8}
                    max={20}
                />
            </Container>
  
            
            <form className={classes.root} noValidate autoComplete="off">
                <TextField class="textfeild" id="password-input"  defaultValue="password" color="#eceff1"/>
                <TextField class="textfeild" id="website-input"  defaultValue="website.com"  />
            </form>
            
            <Container>
                <button className={classes.button} id="button" style={{ alignContent:'center' }} variant="contained">Submit</button>
            </Container>
           
        </div>
    )
}

PwdGenerator.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string
}

export default PwdGenerator

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Slider, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    }
}))

function PwdGenerator(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
    });
   
    const handleCheckChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked})
    };
    const {uppercase, lowercase, numbers, symbols} = state;

    return(
        <div hidden={props.index !== props.value}>
            <Grid className={classes.root} container>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        Password Generator
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                <FormControl className={classes.FormControl}>
                    <FormLabel>Valid characters for new password</FormLabel>
                    <FormGroup>
                        {/*Checkbox grouping for selecting password paramters */}
                        <FormControlLabel
                        control={<Checkbox checked={uppercase} onChange={handleCheckChange} name="uppercase" />}
                        label="Uppercase Letters"
                        />
                        <FormControlLabel
                        control={<Checkbox checked={lowercase} onChange={handleCheckChange} name="lowercase" />}
                        label="Lowercase Letters"
                        />
                        <FormControlLabel
                        control={<Checkbox checked={numbers} onChange={handleCheckChange} name="numbers" />}
                        label="Numbers"
                        />
                        <FormControlLabel
                        control={<Checkbox checked={symbols} onChange={handleCheckChange} name="symbols" />}
                        label="Symbols"
                        />
                    </FormGroup>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={3}>
                    <Typography gutterBottom>Password Length</Typography>
                    <Slider
                        defaultValue={10}
                        valueLabelDisplay="auto"
                        step={1}
                        min={8}
                        max={20}
                    />
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={4} sm={6} lg={8}>
                   <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="password-input" label="Password" defaultValue="password"/>
                        <TextField id="website-input" label="Website" defaultValue="website.com" />
                   </form>
                </Grid>
                <Grid item xs={6} sm={4} lg={2}>
                    <button variant="contained">Submit</button>
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

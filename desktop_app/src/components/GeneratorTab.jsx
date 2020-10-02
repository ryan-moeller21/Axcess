import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types'
import { Grid, Slider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    }
}));

function PwdGenerator(props) {
    const classes = useStyles()
    return(
        <div hidden={props.index !== props.value}>
            <Grid className={classes.root} container>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        Password Generator
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='body1'>
                        Password Length
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Slider
                        defaultValue={20}
                        valueLabelDisplay="auto"
                        step={1}
                        min={10}
                        max={30}
                    />
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
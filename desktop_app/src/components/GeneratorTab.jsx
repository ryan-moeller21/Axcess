import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}));

function PwdGenerator(props) {
    const classes = useStyles()
    return(
        <div hidden={props.index !== props.value}>
            <Typography variant='body1'>
                Password Generator
            </Typography>
        </div>
    )
}

PwdGenerator.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string
}

export default PwdGenerator
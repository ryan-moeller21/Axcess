import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
}))

function Template(props) {

    // Stuff goes here

    const classes = useStyles()
    return(
        <div className={classes.root}>
            {props.name}
        </div>
    )
}

Template.propTypes = {
    name: PropTypes.string
}

export default Template
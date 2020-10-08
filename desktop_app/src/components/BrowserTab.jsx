import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function PwdBrowser (props) {
    const classes = useStyles()

    return (
        <div hidden={props.index !== props.value}>
            <Typography variant='body1'>
                Password Browser
            </Typography>
        </div>
    )
}

PwdBrowser.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string
}

export default PwdBrowser

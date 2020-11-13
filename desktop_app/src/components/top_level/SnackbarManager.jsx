import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

// Use to modify the severity (color and icon shown) for the snackbar
export const SEVERITY = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
}

export default function SnackbarManager (props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        props.setOpen(false)
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" onClose={handleClose} {...props} />
    }

    return (
        <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity={props.severity}>
                {props.text}
            </Alert>
        </Snackbar>
    )
}

SnackbarManager.propTypes = {
    open: PropTypes.bool.isRequired,
    severity: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    setOpen: PropTypes.func.isRequired
}

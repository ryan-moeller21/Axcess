import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

// Use to modify the severity (color and icon shown) for the snackbar
export const SEVERITY = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
}

export default function SnackbarManager(props) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpen(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" onClose={handleClose} {...props} />;
    }

    return (
        <Snackbar open={props.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity={props.severity}>
                {props.text}
            </Alert>
        </Snackbar>
    )
}
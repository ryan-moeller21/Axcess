import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography, Button } from '@material-ui/core'
import { decrypt, putAccount, getAccount } from '../services/CryptoService.js'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function PwdBrowser (props) {
    const classes = useStyles()

    const sendAccountToDatabase = () => {
        // TODO: Replace spoofed values with real stateful values
        putAccount(props.email, props.aesKey, 'www.google.com', 'ExampleAccountName123', 'mySuperComplexSecurePassword')
    }

    const getAccountFromDatabase = () => {
        getAccount(props.email, props.aesKey, 'www.google.com')
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div hidden={props.index !== props.value}>
            <Typography variant='body1'>
                Password Browser
            </Typography>
            <Button variant="outlined" color="primary" onClick={sendAccountToDatabase}>
                Send To Database!
            </Button>
            <Button variant="outlined" color="secondary" onClick={getAccountFromDatabase}>
                Get From Database!
            </Button>
        </div>
    )
}

PwdBrowser.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string,
    email: PropTypes.string.isRequired,
    aesKey: PropTypes.string.isRequired
}

export default PwdBrowser

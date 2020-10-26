import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Fab, Grid, Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { decrypt, putAccount, getAccount, getAccounts } from '../services/CryptoService.js'
import Account from './Account.js'
import firebase from 'firebase'
import AccountGrid from './AccountGrid.jsx'

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    addButton: {
        float: 'right'
    }
}))

function PwdBrowser (props) {
    const [accountData, setAccountData] = useState([])
    const classes = useStyles()

    const sendAccountToDatabase = () => {
        // TODO: Replace spoofed values with real stateful values
        putAccount(props.email, props.aesKey, 'www.facebook.com', 'FacebookAccount', 'FacebookPassword')
    }

    const getAccountsFromDatabase = () => {
        getAccounts(props.email)
            .then((result) => {
                var accounts = []
                var data = result.data().accounts
                for (var account in data) {
                    accounts.push(new Account(account, data[account]["accountName"], data[account]["password"]))
                }
                // console.log(accounts[0])
                setAccountData(accounts)
            })
            .catch((error) => {
                console.log(error)
            })
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
        <div className={classes.root} hidden={props.index !== props.value}>
            <Button variant="outlined" color="primary" onClick={sendAccountToDatabase}>
                Send To Database!
            </Button>
            <Button variant="outlined" color="secondary" onClick={getAccountFromDatabase}>
                Get From Database!
            </Button>
            <Button variant="outlined" color="default" onClick={getAccountsFromDatabase}>
                Get From Database!
            </Button>

            <Grid container>
                <Grid item xs={12} >
                    <Fab size='small' className={classes.addButton}>
                        <AddIcon />
                    </Fab>
                </Grid>
                <Grid item xs={12}>
                    { accountData &&
                    <AccountGrid accountData={accountData} />
                    }
                </Grid>
            </Grid>
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

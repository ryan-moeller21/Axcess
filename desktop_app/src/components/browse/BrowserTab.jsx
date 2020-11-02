import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Fab, Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { getAccounts } from '../../services/CryptoService.js'
import Account from './Account.js'
import AccountGrid from './AccountGrid.jsx'
import { decrypt } from '../../services/CryptoService.js'
import SearchView from './SearchView.jsx'
import firebase from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles(() => ({
    root: {
        
    },
    addButton: {
        float: 'right'
    }
}))

function PwdBrowser (props) {
    const user = firebase.auth().currentUser
    const [accountData, setAccountData] = useState([])
    const classes = useStyles()

    // Google has some fancy tool available that gets the favicons for us!
    const getFaviconURL = (domain) => {
        return 'https://s2.googleusercontent.com/s2/favicons?domain=' + domain
    }

    const getAccountsFromDatabase = () => {
        getAccounts(user.email)
            .then((result) => {
                var accounts = []
                var data = result.data().accounts
                for (var account in data) {
                    accounts.push(new Account(account, data[account]["accountName"], decrypt(data[account]["password"], props.aesKey), getFaviconURL(account)))
                }
                setAccountData(accounts)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={classes.root} hidden={props.index !== props.value}>
            { /*
            <Button variant="outlined" color="primary" onClick={() => putAccount(user.email, props.aesKey, 'www.facebook.com', 'FacebookAccount', 'FacebookPassword')}>
                Send To Database!
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => getAccount(user.email, props.aesKey, 'www.google.com')}>
                Get From Database!
            </Button>
            */ }
            <SearchView onItemSelect={item => console.log(`Clicked: ${item}`)}/>
            <Button variant="outlined" color="primary" onClick={getAccountsFromDatabase}>
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
    aesKey: PropTypes.string.isRequired
}

export default PwdBrowser
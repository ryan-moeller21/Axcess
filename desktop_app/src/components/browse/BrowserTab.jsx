import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Grid, IconButton, Button, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { getAccounts } from '../../services/CryptoService.js'
import Account from './Account.js'
import AccountGrid from './AccountGrid.jsx'
import AddModal from './AddModal.jsx'
import { decrypt } from '../../services/CryptoService.js'
import SearchView from './SearchView.jsx'
import firebase from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles(() => ({
    root: {
        
    },
    addButton: {
        float: 'right',
        margin: 5
    },
    searchButton: {
        float: 'right',
        margin: 5
    }
}))

function PwdBrowser (props) {
    const user = firebase.auth().currentUser

    const [accountData, setAccountData] = useState(null)
    const [newAccount, setNewAccount] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const classes = useStyles()

    // Google has some fancy tool available that gets the favicons for us!
    const getFaviconURL = (domain) => {
        return 'https://s2.googleusercontent.com/s2/favicons?domain=' + domain
    }

    if (!accountData) {
        getAccountsFromDatabase()
    }

    function getAccountsFromDatabase() {
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
    const handleAddButton = () => {
        setNewAccount(true)
    }

    function resetNewAccount() {
        setNewAccount(false)
        getAccountsFromDatabase()
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

            { showSearch
                ? <SearchView onItemSelect={item => console.log(`Clicked: ${item}`)} />
                : null
            }
            <Button variant="outlined" color="primary" onClick={getAccountsFromDatabase}>
                Get From Database!
            </Button>
            <Grid container>
                <Grid item xs={12} >
                    <IconButton className={classes.addButton} onClick={handleAddButton}>
                        <AddIcon />
                    </IconButton>

                    <Fab size='small' className={classes.searchButton} onClick={() => setShowSearch(!showSearch)}>
                        { showSearch ? <CloseIcon /> : <SearchIcon /> }
                    </Fab>

                </Grid>
                <Grid item xs={12}>
                    { accountData &&
                    <AccountGrid accountData={accountData} />
                    }
                </Grid>
                <Grid item>
                    {
                        newAccount && <AddModal account={firebase.auth().currentUser} callback={resetNewAccount} aesKey={props.aesKey}/>
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

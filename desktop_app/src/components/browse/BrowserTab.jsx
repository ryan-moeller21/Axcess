import React, { useState} from 'react'
import PropTypes from 'prop-types'
import Account from './Account.js'
import AccountGrid from './AccountGrid.jsx'
import AddModal from './AddModal.jsx'
import SearchView from './SearchView.jsx'
import firebase from 'firebase/app'
import { Grid, Fab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import { getAccounts, decrypt } from '../../services/CryptoService.js'
import { makeStyles } from '@material-ui/core/styles'
import ZeroState from './ZeroState.jsx'

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

    if (!accountData) {
        getAccountsFromDatabase()
    }

    // Google has some fancy tool available that gets the favicons for us!
    const getFaviconURL = (domain) => {
        return 'https://s2.googleusercontent.com/s2/favicons?domain=' + domain
    }

    /**
     * Gets all accounts from the database, and then builds the Cards that each account will be displayed in.
     */
    function getAccountsFromDatabase() {
        getAccounts(user.email)
            .then((result) => {
                if (!result.data()) return 
                const data = result.data().accounts

                // Build the cards in sorted order.
                const accounts = Object.keys(data).sort().map((key) => {
                    const { accountName, password } = data[key]
                    return new Account(key, accountName, decrypt(password, props.aesKey), getFaviconURL(key))
                })

                setAccountData(accounts)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /**
     * Opens up the new account modal.
     */
    const handleAddButton = () => {
        setNewAccount(true)
    }

    /**
     * Callback to handle closing of the new account modal.
     * @param {Boolean} refreshAccounts Whether or not to pull accounts from database
     */
    const resetNewAccount = (refreshAccounts) => {
        setNewAccount(false)

        if (refreshAccounts)
            getAccountsFromDatabase()
    }

    const handleSearchItemClicked = (item) => {
        // copyToClipboard()
        // props.showSnackbar('Password copied to clipboard!', SEVERITY.SUCCESS)
        console.log(item.currentTarget)
    }

    const hasAccounts = () => accountData && accountData.length > 0

    return (
        <React.Fragment>
            { showSearch && hasAccounts() && <SearchView onItemSelect={handleSearchItemClicked} /> }
            <Grid container justify="center">
                { hasAccounts() && <React.Fragment>
                    <Grid item xs={12} >
                        <Fab size='small' className={classes.searchButton} onClick={handleAddButton} >
                            <AddIcon />
                        </Fab>
                        <Fab size='small' className={classes.searchButton} onClick={() => setShowSearch(!showSearch)}>
                            { showSearch ? <CloseIcon /> : <SearchIcon /> }
                        </Fab>
                    </Grid>
                    <Grid item xs={12}>
                        { accountData && <AccountGrid accountData={accountData} showSnackbar={props.showSnackbar}/> }
                    </Grid>
                </React.Fragment> }
                {!hasAccounts() && <ZeroState onCreateAccount={handleAddButton} />}
                <Grid item>
                    { newAccount && <AddModal account={firebase.auth().currentUser} callback={resetNewAccount} aesKey={props.aesKey} showSnackbar={props.showSnackbar}/> }
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

PwdBrowser.propTypes = {
    aesKey: PropTypes.string.isRequired,
    showSnackbar: PropTypes.func.isRequired
}

export default PwdBrowser

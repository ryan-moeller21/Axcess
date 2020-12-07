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
import { getCookie } from '../../services/CookieService.js'
import EditModal from './EditModal.jsx'

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
    const [editAccount, setEditAccount] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const classes = useStyles()

    const [editWebsite, setEditWebsite] = useState('')
    const [editWebsiteName, setEditWebsiteName] = useState('')

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
                var accounts = []
                var data = result.data().accounts

                // This implementation annoys me. Ideally I can call Object.keys(data).sort().values(), which should return all keys (website names), but that 
                // returns an empty array iterator. In the meantime, this iteration over the indexes (which aren't empty, for some reason) works.
                // Build the cards in sorted order.
                const sortedKeys = Object.keys(data).sort()
                for (var index in sortedKeys) {
                    var accountName = sortedKeys[index]
                    accounts.push(new Account(accountName, data[accountName]["accountName"], decrypt(data[accountName]["password"], getCookie('key')), getFaviconURL(accountName)))
                }

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

    /**
     * Callback to handle toggling of the edit account modal.
     * @param {Boolean} refreshAccounts Whether or not to pull accounts from database
     */
    const resetEditAccount = (refreshAccounts) => {
        setEditAccount(false)

        if (refreshAccounts)
            getAccountsFromDatabase()
    }

    const handleEditButtonClicked = (website, websiteAccount, refreshAccounts) => {
        setEditAccount(!editAccount)
        setEditWebsite(website)
        setEditWebsiteName(websiteAccount)

        if (refreshAccounts)
            getAccountsFromDatabase()
    }

    const handleSearchItemClicked = (item) => {
        // copyToClipboard()
        // props.showSnackbar('Password copied to clipboard!', SEVERITY.SUCCESS)
        console.log(item.currentTarget)
    }

    return (
        <div className={classes.root} hidden={props.index !== props.value}>
            { showSearch ? <SearchView onItemSelect={handleSearchItemClicked} /> : null }
            <Grid container>
                <Grid item xs={12} >
                    <Fab size='small' className={classes.searchButton} onClick={handleAddButton} >
                        <AddIcon />
                    </Fab>
                    <Fab size='small' className={classes.searchButton} onClick={() => setShowSearch(!showSearch)}>
                        { showSearch ? <CloseIcon /> : <SearchIcon /> }
                    </Fab>
                </Grid>
                <Grid item xs={12}>
                    { accountData && <AccountGrid accountData={accountData} editCard={handleEditButtonClicked} showSnackbar={props.showSnackbar}/> }
                </Grid>
                <Grid item>
                    { newAccount && <AddModal account={firebase.auth().currentUser} callback={resetNewAccount} showSnackbar={props.showSnackbar}/> }
                </Grid>
                <Grid>
                    { editAccount && <EditModal account={firebase.auth().currentUser} website={editWebsite} websiteAccount={editWebsiteName} callback={resetEditAccount} showSnackbar={props.showSnackbar}/>}
                </Grid>
            </Grid>
        </div>
    )
}

PwdBrowser.propTypes = {
    index: PropTypes.string,
    value: PropTypes.string,
    showSnackbar: PropTypes.func.isRequired
}

export default PwdBrowser

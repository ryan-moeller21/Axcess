import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import AccountCard from './AccountCard.jsx'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function AccountGrid (props) {
    var idCounter = -1
    const classes = useStyles()

    const deleteCallback = (indexToRemove) => {
        props.accountData.splice(indexToRemove, 1)
    }

    const allAccounts = props.accountData.map((index) => {
        return <AccountCard 
            key={idCounter++}
            index={idCounter} // The exact same as key. However, key is only available to React. Use this to remove deleted cards.
            accountName={index.accountName} 
            password={index.password}
            website={index.website} 
            iconURL={index.icon} 
            deleteCallback={deleteCallback} 
            showSnackbar={props.showSnackbar}/>
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={4} justify='center'>
                { allAccounts }
            </Grid>
        </div>
    )
}

AccountGrid.propTypes = {
    accountData: PropTypes.arrayOf(PropTypes.object).isRequired,
    showSnackbar: PropTypes.func.isRequired
}

export default AccountGrid

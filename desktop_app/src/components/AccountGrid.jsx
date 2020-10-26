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
    const allAccounts = props.accountData.map((index) => {
        return <AccountCard key={idCounter++} accountName={index.accountName} password={index.password} website={index.website}/>
    })

    const classes = useStyles()
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
    newAccountCallback: PropTypes.func
}

export default AccountGrid

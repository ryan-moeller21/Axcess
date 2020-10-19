import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        width: '100%',
        backgroundColor: '#29a19c'
    },
    tabs: {
        margin: 0,
        width: '100%'
    },
    indicator: {
        backgroundColor: '#a3f7bf'
    }
}))

function TopNav (props) {
    const [value, setValue] = useState('three')

    const handleChange = (event, newValue) => {
        setValue(newValue)
        props.handleTabChange(newValue)
    }

    const classes = useStyles()
    return (
        <React.Fragment>
            <Toolbar className={classes.root} variant="dense">
                <Tabs variant='fullWidth' className={classes.tabs} value={value} onChange={handleChange} classes={{ indicator: classes.indicator }} indicatorColor="secondary">
                    <Tab value='one' label="Password Generator" />
                    <Tab value='two' label="Browse Accounts" />
                    <Tab value='three' label="Sync Passwords" />
                </Tabs>
            </Toolbar>
        </React.Fragment>
    )
}

TopNav.propTypes = {
    handleTabChange: PropTypes.func
}

export default TopNav

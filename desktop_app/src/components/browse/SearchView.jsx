import React, { useState } from 'react'
import { Card, List, ListItem, ListItemText, TextField, Chip, Typography, InputAdornment, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import { debounce } from '../../services/UtilityService'
import { searchAccounts } from '../../services/CryptoService'
import firebase from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles(() => ({
    card: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: 500,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        zIndex: 1000
    }
}))

export default function SearchView({ onItemSelect }) {
    const user = firebase.auth().currentUser
    const classes = useStyles()

    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

    function search(event) {
        const searchBoxValue = event.target.value
        debounce(searchAccounts, 500)(user.email, searchBoxValue, 10, setResults)
        setSearchTerm(searchBoxValue)
    }

    return (
        <Card className={classes.card}>
            <TextField
                label="Search"
                style={{ width: '100%' }}
                value={searchTerm}
                onChange={search}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        <IconButton
                            aria-label="Clear search box"
                            onClick={() => {
                                setSearchTerm('')
                                setResults([])
                            }}>
                            <Close />
                        </IconButton>
                    </InputAdornment>
                }} />
            <ResultsView
                results={results}
                onItemSelect={onItemSelect}
                hasSearchTerm={searchTerm} />
        </Card>
    )
}

SearchView.propTypes = {
    onItemSelect: PropTypes.func
}

function ResultsView({ results, onItemSelect, searchTerm }) {
    if (results.length == 0) {
        return searchTerm && searchTerm.length > 0
            ? <Typography variant='body1'>No results found</Typography>
            : null
    }

    return (
        <List>
            {
                results.map(item => {
                    return <ListItem button onClick={onItemSelect} key={item.accountName}>
                        <ListItemText>{item.accountName}</ListItemText>
                        <Chip variant="outlined" label={item.domain} />
                    </ListItem>
                })
            }
        </List>
    )
}

ResultsView.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    onItemSelect: PropTypes.func,
    searchTerm: PropTypes.string
}
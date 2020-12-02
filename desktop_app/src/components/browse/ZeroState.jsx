import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    card: {
        padding: 15,
        marginTop: '10vmin',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
}))

export default function ZeroState(props) {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <Typography variant='body1' component='h2' style={{ marginBottom: 15 }}>It looks like you don&lsquo;t have any accounts saved yet!</Typography>
            <Button variant='contained' color='primary' onClick={props.onCreateAccount}>Get Started</Button>
        </Card>
    )
}

ZeroState.propTypes = {
    onCreateAccount: PropTypes.func.isRequired
}
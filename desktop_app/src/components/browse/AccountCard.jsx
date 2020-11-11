import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, Container } from '@material-ui/core'
import clsx from "clsx"
import { ExpandMore, VpnKey } from '@material-ui/icons'
import copyToClipboard from 'copy-to-clipboard'
import { SEVERITY } from '../top_level/SnackbarManager.jsx'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '200px',
        height: 'auto',
        textAlign: 'center'
    },
    media: {
        
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))

function AccountCard (props) {
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const copyPasswordToClipboard = () => {
        copyToClipboard(props.password)
        props.showSnackbar('Password copied to clipboard!', SEVERITY.SUCCESS)
    }

    const classes = useStyles()
    return (
        <Grid item>
            <Card className={classes.root}>
                <CardContent>
                    <img src={props.iconURL}/>
                    <Typography variant='h6' color='textPrimary'>
                        {props.website}
                    </Typography>
                    <Typography variant='body1' color='textSecondary'>
                        {props.accountName}
                    </Typography>
                </CardContent>
                <Collapse in={expanded}>
                    <CardContent>
                        <Typography variant='body1' style={{overflowWrap: 'break-word'}}>
                            {props.password}
                        </Typography>
                    </CardContent>
                </Collapse>
                <CardActions>
                    <Container style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <IconButton
                            onClick={copyPasswordToClipboard}>
                            <VpnKey fontSize='small'/>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}>
                            <ExpandMore fontSize='small'/>
                        </IconButton>
                    </Container>
                </CardActions>
            </Card>
        </Grid>
    )
}

AccountCard.propTypes = {
    website: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    showSnackbar: PropTypes.func.isRequired
}

export default AccountCard

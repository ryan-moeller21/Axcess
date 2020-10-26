import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { ButtonBase, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, Paper, Typography } from '@material-ui/core'
import clsx from "clsx"
import { ExpandMore } from '@material-ui/icons'

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

    const classes = useStyles()
    return (
        <Grid item>
            <Card className={classes.root}>
                {/* <CardMedia
                className={classes.media}
                image="/src/components/Cat.jpg"
                title="Website Icon" /> */}
                <CardContent>
                    <Typography variant='body1'>
                        {props.website}
                    </Typography>
                    <Typography variant='body1'>
                        {props.accountName}
                    </Typography>
                </CardContent>
                <Collapse in={expanded}>
                    <CardContent>
                        <Typography variant='body1'>
                            {props.password}
                        </Typography>
                    </CardContent>
                </Collapse>
                <CardActions>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                    >
                        <ExpandMore fontSize='small'/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

AccountCard.propTypes = {
    website: PropTypes.string.isRequired,
    accountName:PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default AccountCard

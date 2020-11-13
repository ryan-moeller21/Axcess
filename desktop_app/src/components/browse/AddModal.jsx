import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Modal, Fade, Card, CardContent, Typography, Grid, TextField, Button } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/auth'
import { putAccount } from '../../services/CryptoService.js'
import { SEVERITY } from '../top_level/SnackbarManager.jsx'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    cardRoot: {
        display: 'flex',
        width: 500,
        height: 300,
        backgroundColor: 'White'
    },
    textField: {
        // width: 60
    }
}))

function AddModal (props) {
    // Stuff goes here
    const [open, setOpen] = useState(false)
    const [website, setWebsite] = useState(undefined)
    const [accountName, setAccountName] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    useEffect(() => { setOpen(true)} , [props.account])

    const handleClose = () => {
        setOpen(false)
        props.callback(false)
    }

    const handleInsert = () => {
        const user = firebase.auth().currentUser
        putAccount(user.email, props.aesKey, website, accountName, password)
            .then((result) => {
                props.callback(true)
                props.showSnackbar('Account successfully inserted.', SEVERITY.SUCCESS)
            })
    }
    
    const classes = useStyles()
    return (
        <Modal className={classes.root}
            open={open}
            onClose={handleClose}
        >
            <Fade in={open}>
                <Card className={classes.cardRoot}>
                    <CardContent className={classes.content}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Add New Account</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>Website</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textField} label='website' onChange={({ target: { value } }) => setWebsite(value)}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>Account Name</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textField} label='accountName' onChange={({ target: { value } }) => setAccountName(value)}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>Password</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textField} label='password' type='password' onChange={({ target: { value } }) => setPassword(value)}/>
                            </Grid>
                            <Grid className={classes.modalHeader} item xs={6}>
                                <Button className={classes.modalButton} variant='outlined' onClick={handleClose} color="secondary">Close</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button className={classes.modalButton} variant='outlined' onClick={handleInsert} color="primary">Add</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
}


AddModal.propTypes = {
    account: PropTypes.object,
    callback: PropTypes.func,
    aesKey: PropTypes.string.isRequired,
    showSnackbar: PropTypes.func.isRequired
}

export default AddModal

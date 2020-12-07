import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Modal, Fade, Card, CardContent, Typography, Grid, TextField, Button } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/auth'
import { editAccount } from '../../services/CryptoService.js'
import { SEVERITY } from '../top_level/SnackbarManager.jsx'
import { getCookie } from '../../services/CookieService.js'

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

function EditModal (props) {
    // Stuff goes here
    const [open, setOpen] = useState(false)
    const [website, setWebsite] = useState('')
    const [accountName, setAccountName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => { setOpen(true)} , [props.account])

    const handleClose = () => {
        setOpen(false)
        props.callback(website, accountName, false)
    }

    const handleInsert = () => {
        if (password == '') {
            props.showSnackbar('Please enter a password.', SEVERITY.ERROR)
        } else {
            editAccount(firebase.auth().currentUser.email, getCookie('key'), props.website, website == '' ? props.website : website, accountName == '' ? props.websiteAccount : accountName, password)
                .then(() => {
                    props.callback(true)
                    props.showSnackbar('Account edited.', SEVERITY.SUCCESS)
                })
                .catch(() => {
                    props.showSnackbar('Database error, try again later.', SEVERITY.SUCCESS)
                })
        }
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
                                <TextField className={classes.textField} label='website' inputProps={{defaultValue: props.website}} onChange={({ target: { value } }) => setWebsite(value)}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>Account Name</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textField} label='accountName' inputProps={{defaultValue: props.websiteAccount}} onChange={({ target: { value } }) => setAccountName(value)}/>
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
                                <Button className={classes.modalButton} variant='outlined' onClick={handleInsert} color="primary">Save</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
}


EditModal.propTypes = {
    account: PropTypes.object,
    website: PropTypes.string.isRequired,
    websiteAccount: PropTypes.string.isRequired,
    callback: PropTypes.func,
    showSnackbar: PropTypes.func.isRequired
}

export default EditModal

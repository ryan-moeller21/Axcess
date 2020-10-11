import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TopNav from './TopNav.jsx'
import GeneratorTab from './GeneratorTab.jsx'
import BrowserTab from './BrowserTab.jsx'
import { encrypt, decrypt } from '../services/CryptoService.js'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function MainPage (props) {
    const [value, setValue] = useState('two')

    function handleTabChange (newValue) {
        setValue(newValue)
    }

    if (props.email.length > 0 && props.aesKey.length > 0)
    {
        // Proof of concept of encryption. 
        var ciphertext = encrypt(props.email, props.aesKey)
        var plaintext = decrypt(ciphertext, props.aesKey)

        console.log('Email: ' + props.email)
        console.log('Encrypted Email: ' + ciphertext)
        console.log('Decrypted Email: ' + plaintext);

    }

    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />

            <GeneratorTab value={value} index='one' />
            <BrowserTab value={value} index='two' />
        </React.Fragment>
    )
}

MainPage.propTypes = {
    email: PropTypes.string.isRequired,
    aesKey: PropTypes.string.isRequired
}

export default MainPage

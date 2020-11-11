import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from './TopNav.jsx'
import GeneratorTab from '../generator/GeneratorTab.jsx'
import BrowserTab from '../browse/BrowserTab.jsx'
import SnackbarManager, { SEVERITY } from '../top_level/SnackbarManager.jsx'

// Enum for page navigation
const PAGES = {
    GENERATOR: 'one',
    BROWSER: 'two'
}

function MainPage (props) {
    const [value, setValue] = useState(PAGES.BROWSER)

    // Snackbar State
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState(SEVERITY.ERROR)

    function handleTabChange (newValue) {
        setValue(newValue)
    }

    const showSnackbar = (message, severity) => {
        setSnackbarText(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />
            <GeneratorTab value={value} index={PAGES.GENERATOR} showSnackbar={showSnackbar} />
            <BrowserTab value={value} aesKey={props.aesKey} index={PAGES.BROWSER} showSnackbar={showSnackbar} />
            <SnackbarManager open={snackbarOpen} text={snackbarText} severity={snackbarSeverity} setOpen={setSnackbarOpen}/>
        </React.Fragment>
    )
}

MainPage.propTypes = {
    aesKey: PropTypes.string.isRequired
}

export default MainPage

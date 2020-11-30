import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from './TopNav.jsx'
import GeneratorTab from '../generator/GeneratorTab.jsx'
import BrowserTab from '../browse/BrowserTab.jsx'

// Enum for page navigation
const PAGES = {
    GENERATOR: 'one',
    BROWSER: 'two'
}

function MainPage (props) {
    const [tab, setTab] = useState(PAGES.BROWSER)

    /**
     * Handles changing of the current UI location.
     * @param {PAGES} newValue 
     */
    function handleTabChange (newValue) {
        setTab(newValue)
    }

    function CurrentTab() {
        switch (tab) {
        case PAGES.BROWSER:
            return <BrowserTab aesKey={props.aesKey} showSnackbar={props.showSnackbar} />
        case PAGES.GENERATOR:
            return <GeneratorTab showSnackbar={props.showSnackbar}/>
        }
    }

    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />
            <CurrentTab />
        </React.Fragment>
    )
}

MainPage.propTypes = {
    aesKey: PropTypes.string.isRequired,
    showSnackbar: PropTypes.func.isRequired
}

export default MainPage

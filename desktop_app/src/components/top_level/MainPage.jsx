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
    const [value, setValue] = useState(PAGES.BROWSER)

    /**
     * Handles changing of the current UI location.
     * @param {PAGES} newValue 
     */
    function handleTabChange (newValue) {
        setValue(newValue)
    }

    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />
            <GeneratorTab value={value} index={PAGES.GENERATOR} showSnackbar={props.showSnackbar} />
            <BrowserTab value={value} index={PAGES.BROWSER} showSnackbar={props.showSnackbar} />
        </React.Fragment>
    )
}

MainPage.propTypes = {
    showSnackbar: PropTypes.func.isRequired
}

export default MainPage

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

    function handleTabChange (newValue) {
        setValue(newValue)
    }

    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />

            <GeneratorTab value={value} index={PAGES.GENERATOR} />
            <BrowserTab value={value} aesKey={props.aesKey} index={PAGES.BROWSER} />
        </React.Fragment>
    )
}

MainPage.propTypes = {
    aesKey: PropTypes.string.isRequired
}

export default MainPage

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TopNav from './TopNav.jsx'
import GeneratorTab from './GeneratorTab.jsx'
import BrowserTab from './BrowserTab.jsx'
import SyncTab from './SyncTab.jsx'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

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
            <BrowserTab value={value} email={props.email} aesKey={props.aesKey} index={PAGES.BROWSER} />
        </React.Fragment>
    )
}

MainPage.propTypes = {
    email: PropTypes.string.isRequired,
    aesKey: PropTypes.string.isRequired
}

export default MainPage

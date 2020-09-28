import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TopNav from './TopNav.jsx'
import GeneratorTab from './GeneratorTab.jsx'
import BrowserTab from './BrowserTab.jsx'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function MainPage () {
    const [value, setValue] = useState('two')

    function handleTabChange (newValue) {
        setValue(newValue)
    }

    const classes = useStyles()
    return (
        <React.Fragment>
            <TopNav handleTabChange={handleTabChange} />

            <GeneratorTab value={value} index='one' />
            <BrowserTab value={value} index='two' />
        </React.Fragment>
    )
}

export default MainPage

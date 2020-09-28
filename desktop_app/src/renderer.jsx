import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import MainPage from './components/MainPage.jsx'

import * as firebase from 'firebase'

const firebaseConfig = {} // TODO: Replace with real config
firebase.initializeApp(firebaseConfig)

console.log('Loaded React.')
ReactDOM.render(
    <MainPage />,
    document.getElementById('root')
)

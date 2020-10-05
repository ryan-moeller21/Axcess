import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import AuthContainer from './components/AuthContainer.jsx'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBxrwvzYRZKU3GbGX_5Ma3CFdb7_-yDE0o",
  authDomain: "axcess-948f0.firebaseapp.com",
  databaseURL: "https://axcess-948f0.firebaseio.com",
  projectId: "axcess-948f0",
  storageBucket: "axcess-948f0.appspot.com",
  messagingSenderId: "760322066308",
  appId: "1:760322066308:web:ca19a043aa6a7278193fd1",
  measurementId: "G-RMY9X4B2Z9"
};
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

console.log('Loaded React.')
ReactDOM.render(
    <AuthContainer />,
    document.getElementById('root')
)

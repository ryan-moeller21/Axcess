/* eslint-disable no-undef */
// const Application = ('spectron').Application
import { Application } from 'spectron'
import assert from 'assert'
import electronPath from 'electron' // Require Electron from the binaries included in node_modules.
import path from 'path'
import chai from 'chai'
import firebase from 'firebase'
import { encrypt, decrypt, putAccount, getAccount, getAccounts } from '../src/services/CryptoService.js'

// Testing Globals
const exampleEmail = 'unittesting@example.com'
const exampleKey = '$2a$10$8lzkpQsb11EvrMaMHHxS3u8EU72yNrN3PtL6BQc86QxPgZIL4OjXO' // Key for the account unittesting@example.com
const exampleWebsite = 'www.axcess.com'
const exampleUsername = 'AxcessIsCool'
const examplePassword = 'averysecure,longpassword'

var expect = chai.expect

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

// Each describe block describes a "block" of tests. These tests should be of a similar theme. For example, one
// block of tests could just be testing the login screen. Another block could just test database functionality.
describe('Application Launch', function () {
    this.timeout(10000)

    beforeEach(function () {
        this.app = new Application({
            path: electronPath,
            // The following line tells spectron to look and use the main.js file
            // and the package.json located 1 level above.
            args: [path.join(__dirname, '..')]
        })
        return this.app.start()
    })

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    })

    it('Axcess Window Launches', function () {
        return this.app.client.getWindowCount().then(function (count) {
            assert.equal(count, 2)
        // Please note that getWindowCount() will return 2 if `dev tools` are opened.
        // assert.equal(count, 2)
        })
    })
})

// Test encryption functionality
describe('Encryption / Decryption', function () {
    it('Encryption Test', function () {
        const plaintext = 'unit testing is fun'
        const ciphertext = encrypt(plaintext, exampleKey)
        const decryptedCiphertext = decrypt(ciphertext, exampleKey)

        expect(decryptedCiphertext).to.equal(plaintext)
    })
})

// Test database functionality
describe('Database', function () { 
    before(function () {
        firebase.initializeApp(firebaseConfig)
    })

    describe('Insert Into Database', function () {
        it('Insert Account', function() {
            putAccount(exampleEmail, exampleKey, exampleWebsite, exampleUsername, examplePassword)
                .catch((error) => {
                    console.log(error)
                    assert(0)
                })
        })
    })

    describe('Query Database', function () {
        it('Get Accounts', function () {
            getAccounts(exampleEmail)
                .then((accounts) => {
                    const accountData = accounts.data()
                    expect(Object.keys(accountData).length).to.greaterThan(0)
                    expect(accountData['www.facebook.com']['accountName']).to.equal('UnitTesting')
                })
                .catch((error) => {
                    console.log(error)
                    assert(0)
                })
        })
        it('Get Single Account', function() {
            getAccount(exampleEmail, exampleKey, exampleWebsite)
                .then((password) => {
                    expect(password).to.equal(examplePassword)
                })
                .catch((error) => {
                    console.log(error)
                    assert(0)
                })
        })
    })
})

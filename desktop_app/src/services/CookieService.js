/**
 * Sets a cookie for some key value pair.
 * @param {String} key Key for the cookie
 * @param {Object} value Value for the cookie
 */
export function setCookie(key, value) {
    // Handle zero state, otherwise JSON.parse will fail on empty cookie string
    if (document.cookie == '') {
        document.cookie = '{}'
    }

    let cookieJSON = JSON.parse(document.cookie)
    cookieJSON[key] = value
    document.cookie = JSON.stringify(cookieJSON)
}

/**
 * Gets a cookie for a given key.
 * @param {String} key Key for the cookie.
 */
export function getCookie(key) {
    return JSON.parse(document.cookie)[key]
}

/**
 * Clears all cookies.
 */
export function clearCookies() {
    document.cookie = '{}'
}
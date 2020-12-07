
/*

*/
const upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerChars="abcdefghijklmnopqrstuvwxyz"
const numericalChars="0123456789"
const symChars="!@#$%^&*()_+-={[}];:|?.>,<~"

/*
Regular expressions for testing whether a password is "good"
*/
const isUpperCase = (string) => /^[A-Z]*$/.test(string)
const isLowerCase = (string) => /^[a-z]*$/.test(string)
const isNumber = (string) => /^[0-9]*$/.test(string)
const isSymbol = (string) => /^[!@#$%^&*]*$/.test(string)




/**
 * G
 * @param {Boolean} upperCase Whether the password should contain uppercase letters.
 * @param {Boolean} lowerCase Whether the password should contain lowercase letters.
 * @param {Boolean} numbers Whether the password should contain numbers.
 * @param {Boolean} symbols Whether the password should contain special characters/symbols.
 * @param {Integer} passwordLength Length of the password to be generated.
 */
export function generatePassword (upperCase, lowerCase, numbers, symbols, passwordLength) {
    var allowedChars = ''
    var charSpaceLen = 0
    if(upperCase) {
        allowedChars = allowedChars.concat(upperChars)
    }
    if(lowerCase) {
        allowedChars = allowedChars.concat(lowerChars)
    }
    if(numbers) {
        allowedChars = allowedChars.concat(numericalChars)
    }
    if(symbols) {
        allowedChars = allowedChars.concat(symChars)
    }

    charSpaceLen = allowedChars.length
    var newPass = ''
    var isGoodPassword
    do {
        /*Attempt to generate the password */
        newPass = ''
        for(var iterator = 0; iterator < passwordLength; iterator ++) {
            /*Select a random character from our allowed characters and append to the generating password. */
            newPass = newPass.concat(allowedChars.charAt(Math.floor(Math.random() * charSpaceLen)))
        }

        /* 
        Checks if a given password includes all of the currently selected password criteria.
        This is needed since the generation may or may not include all of the selected character types due to randomness.
        */
        var upperFlag = !upperCase
        var lowerFlag = !lowerCase
        var numFlag = !numbers
        var symFlag = !symbols
           
        for(iterator = 0; iterator < passwordLength; iterator ++){
            var current = newPass.charAt(Math.floor(iterator))
            if(upperCase){
                if(isUpperCase(current)) {
                    upperFlag = true
                }
            }
            if(lowerCase){
                if(isLowerCase(current)) {
                    lowerFlag = true
                }
            }
            if(numbers){
                if(isNumber(current)) {
                    numFlag = true
                }
            }
            if(symbols){
                if(isSymbol(current)) {
                    symFlag = true
                }
            }
        }
                
        isGoodPassword = upperFlag && lowerFlag && numFlag && symFlag
    } while(!isGoodPassword)

    return newPass
       

}
/** Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds.
 * @param {() => any} func: The function to debounce
 * @param {Array} funcArgs: Arguments to pass to the function
 * @param {Int} wait: The idle time (in ms) required before the function is called
 * @param {Boolean} immediate: If true, trigger the function on the leading edge instead of the trailing
 * 
*/
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
} 
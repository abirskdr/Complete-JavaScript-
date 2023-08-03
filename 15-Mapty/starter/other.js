const firstName = 'Abir'; //firstName is a global variable in the "other" script, and so can be accessed by other scripts as well, given that the other scripts appear after the "other.js" script in the HTML

// console.log(months); // error:months is not defined
// months is in the "script.js" and as other.js appears before script.js, it does not have access to anything from script.js (as by the time "other.js" is executed, "script.js" has not yet been loaded, and so therefore, it does not find this variable in the global scope)

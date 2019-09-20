// Assume Monday 7th January 2019 - starting date to be overwritten 
var myYear = 2019;
var myMonth = 1;
var myDate = 7;
var myDay = 1;
var myDebug = 0; // Switch off console.log() Debug
var myTrace = 1; // switch on function trace call to the console.log()

var myMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// need to use this to start at the correct month ... count across the boundary and give correct index to myMonths ... saves on testing :) 
var myNumberMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

var myDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Lets try query by class need period . to signify class name ... 
var myH2 = document.querySelector("h2");
var myDYear = document.querySelector(".Year");
var myDMonths = document.querySelectorAll(".Month");

var myDebugText = document.querySelector(".Debug");

// ***********************************
// set up the page on window loading *
// ***********************************
//
window.onload = function () {

    // Trace this function
    traceFunction("window-onload");
    traceFunction("Populating first page on load or reload");

    // Initialise the main page
    initPage();

    traceFunction("Testing Local Storage");
    // First test local storage is supported by web page
    if (testLocalStorageSupported()) {

        traceFunction("Testing for stored data");
        // Now see if we have stored data
        if (testLocalStorage()) {

            traceFunction("Getting data from local storage");

            // Now get the data
            if (popActions()) {

                // Removed alert() as form does not get populated till its been called .... 
                traceFunction("Retrieved Data from local storage");
            }
        }
    }
}
// ************************************************
// initPage() set up the page with starting month *
//                                                *
// ************************************************
function initPage() {
    // Test function call
    traceFunction("initPage");

    // Test Data
    if (myDebug) {
        console.log(myYear);
        console.log(myMonths);
        console.log(myDays);
        console.log(myDYear);
        console.log(myDMonths);
        console.log(myDMonths[0]);
        console.log(myMonths[0]);
    }

    let myDate = new Date();
    //
    // Now test for actual day, date, month and year
    // myDay, myDate,, myMonth, myYear
    //
    getDayMonthYear(myDate);

    // Start at current month
    // Change to order months 
    orderMonths();

    // Test year change 
    myH2.innerHTML = "Year:" + myYear;

    // Debug Text 
    myDebugText.innerHTML = myDate;
}
// *********************************
// New Function getDayMonthYear    *
// Gets current day, month and year*
// *********************************
//
// Using globals at the moment ... need to define a return variable myDateData == > { myDay, myMonth, myDate, myYear} to use local data and scope
// 
function getDayMonthYear(myDate) {

    traceFunction("getDayMonthYear");

    let myToday = myDate;
    // Returns 0-6 (0) assume 0 is Sunday
    myDay = myToday.getDay();
    // Returns 0-11 assume 0 is January 
    myMonth = myToday.getMonth();
    // My date - returns 1 -31 - need to test for leap year 
    myDate = myToday.getDate();
    // Returns number for YYYY
    myYear = myToday.getFullYear();

    if (myDebug) {
        console.log(myDay);
        console.log(myMonth);
        console.log(myDate);
        console.log(myYear);
    }
}
// *****************************************************
// New Function orderMonths() and set text in Calendar *
// orderMonths ()                                      *
// *****************************************************
//
function orderMonths() {

    traceFunction("orderMonths");

    // Start at current month and year 
    let j = myMonth;
    let myYearText = String(myYear) + "\<br\>";

    // Order Months from current
    for (i = 0; i < 12; i++) {

        if (myDebug) {
            console.log(j);
            console.log(myMonths[myNumberMonths[j]]);
        }

        // Test month change & Index across the year boundary if necessary
        if (j >= 12) {
            myYearText = String(myYear + 1) + "\<br\>";
        }

        // Index across the year boundary if necessary
        myDMonths[i].innerHTML = myYearText + myMonths[myNumberMonths[j]];
        j++;
    }
}

// *************************************
// Test if local storage is supported  *
// testLocalStorageSupported ()        *
// *************************************
//
function testLocalStorageSupported() {

    let myResult = false;

    // Trace this function 
    traceFunction("testLocalStorageSupported");

    // Test that local storage is supported 
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (myDebug) {
            console.log("Local Storage is supported :)")
        }
        myResult = true;
    } else {
        alert("Local Storage is not supported");
        // Sorry! No Web Storage support..
        if (myDebug) {
            console.log("Local Storage is not supported :(");
        }
    }
    return myResult;
}

// ************************************
// Test to see if we have stored data *
// testLocalStorage                   *
//*************************************
//
function testLocalStorage() {

    let myResult = false;

    // Trace this function
    traceFunction("testLocalStorage");

    // Check for saved data  -- stored as a string so need to test as a string or cast to logical. 
    let myValue = localStorage.getItem("myStorage");

    // Check for local storage - set this function to return myValue ? 
    if (myValue == "true") {
        myResult = true;
        if (myDebug) {
            console.log("Actions in local storage");
        }

    } else {
        if (myDebug) {
            console.log("Actions not in local storage");
        }
    }
    return myResult;
}

// ****************************
// Function to myReset the form *
// ****************************
//
function myReset() {

    // Trace function
    traceFunction("myReset");

    // Set local storage to false
    localStorage.setItem("myStorage", "false");

    alert("Form Reset");

}

// **************************
// Function to mySave data  *
// **************************
//
function mySave() {
    let myResult = false;

    // Trace this function
    traceFunction("mySave");

    // Set myStorage = true for local data 
    localStorage.setItem("myStorage", "true");
    let myValue = localStorage.getItem("myStorage");

    if (myDebug) {
        console.log(myValue);
    }
    myDebug = 1;
    if (myValue) {
        myResult = true;
        if (myDebug) {
            console.log(myValue);
            console.log("Saving to Local Storage");
        }
    } else {
        alert("Cannot Save to local storage");
        if (myDebug) {
            console.log(myValue);
            console.log("Cannot save to Local Storage");
        }
        return myResult;
    }

    // So save my actions in local storage
    let myActions = document.querySelectorAll(".Action");
    let myLen = myActions.length;

    // Check the data 
    if (myDebug) {
        console.log(myActions);
        console.log(myLen);
    }

    // Populate my Actions
    for (i = 0; i < myLen; i++) {
        let myName = "action" + String(i);
        let myValue = myActions[i].innerHTML;
        localStorage.setItem(myName, myValue);

        if (myDebug) {
            console.log(myName + ":" + myValue);
        }
    }

    // Save Criteria for Success 
    let myCOS = document.querySelector(".COS");
    myValue = myCOS.innerHTML;
    localStorage.setItem("COS", myValue);

    // Check the data again 
    if (myDebug) {
        console.log(myActions);
        console.log(myLen);
        console.log(myValue);
    }
    if (myResult) {
        alert("Data Saved");
    }
    return myResult;
}

// Functiont to populate Action divs if in local storgae 
//
// Functiont to Save data 
function popActions() {

    let myResult = false;

    // Trace this function
    traceFunction("popActions");

    // Check for saved data  
    let myValue = localStorage.getItem("myStorage");

    // Check for local storage - set this function to return myValue ? 
    if (myValue == "true") {
        myResult = true;
        if (myDebug) {
            console.log("Actions in local storage");
        }
    } else {
        if (myDebug) {
            console.log("Actions not in local storage");
        }
        return myResult;
    }

    //
    // My Actions must be in local storage - get the data and populate the Action and COS divs. 
    // 

    // Populate my Actions
    let myActions = document.querySelectorAll(".Action");
    let myLen = myActions.length;

    for (i = 0; i < myLen; i++) {
        let myName = "action" + String(i);
        let myValue = localStorage.getItem(myName);

        myActions[i].innerHTML = myValue;
        if (myDebug) {
            console.log(myName + ":" + myValue);
        }
    }

    let myCOS = document.querySelector(".COS");
    myValue = localStorage.getItem("COS");

    myCOS.innerHTML = myValue;

    // Check the data 
    if (myDebug) {
        console.log(myActions);
        console.log(myLen);
        console.log(myValue);
    }
    return myResult;
}

// Utilities 
//
function traceFunction(myFunctionName) {
    if (myTrace) {
        console.log(myFunctionName);
    }
}

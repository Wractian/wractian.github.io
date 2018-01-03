
/**
 * Date Function
 * @return {[type]} [description]
 */
function init() {
    'use strict';
    var date;
    var ordinal;
    var day;
    var dayofweek;
    var month;
    var year;
    var dateraw = new Date();
    day = dateraw.getDate();
    switch (day) {
        case 1:
        case 21:
        case 31:
            ordinal = "st";
            break;
        case 2:
        case 22:
            ordinal = "nd";
            break;
        case 3:
        case 23:
            ordinal = "rd";
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            ordinal = "th";
            break;
        default:
            ordinal = null;
    }
    day = day + ordinal
    switch (dateraw.getDay()) {
        case 0:
            dayofweek = "Sunday";
            break;
        case 1:
            dayofweek = "Monday";
            break;
        case 2:
            dayofweek = "Tuesday";
            break;
        case 3:
            dayofweek = "Wednesday";
            break;
        case 4:
            dayofweek = "Thurday";
            break;
        case 5:
            dayofweek = "Friday";
            break;
        case 6:
            dayofweek = "Saturday";
            break;
        default:
            dayofweek = null;
    }
    switch (dateraw.getMonth()) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "Febuary";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default:
            month = null;

    }
    year = dateraw.getFullYear();
    date = dayofweek + ", " + month + " " + day + ", " + year;
    document.getElementById("datetext").innerHTML = date;


}
function settingsbutton() {
    if (document.getElementById("settingspage").style.display=="none"){
        $( "#settingspage" ).show();
    } else {
        closesettings();
    }
}
function closesettings() {
    $( "#settingspage" ).hide();
}
function resized() {
    var cw = $('.link').width();
    $('.link').css({ 'height': cw + 'px' });
    return ("done");
}

function load() {
    resized();
    $( "#settingsbutton" ).click(function() {
    window.location.replace("#settings");
    settingsbutton();
    });
    $( "#settingsclose" ).click(function() {
    closesettings();
});
}

init();

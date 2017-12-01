function init() {
    'use strict';
    var day
    var dayofweek = null;
    var month = null;
    var year = null;
    var dateraw = new Date();
    day = dateraw.getDate();
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
    console.log(year);
    console.log(month);
    console.log(dayofweek);
    console.log(day);

}

function resized() {
    var cw = $('.link').width();
    $('.link').css({'height': cw + 'px'});
}



init();
"use strict";

function roshtimer() {
  var timer, timerID, startD, currentD, roshmin
  if (window.roshtimeractive) {
    window.roshtimeractive = false;
  } else {
    window.roshtimeractive = true;
  }
  startD = new Date()
  window.Domlist["roshtext"].innerHTML = "Roshan is dead"
  timer = function() {
    currentD = new Date();
    if ((currentD - startD >= 480000) && (!roshmin)) {
      console.log('roshmin ' + msToTime(currentD - startD))
      window.Domlist["roshtext"].innerHTML = "Roshan might be alive"
      roshmin = true;
    } else if (currentD - startD >= 660000) {
      console.log('roshmax ' + msToTime(currentD - startD))
      window.Domlist["roshtext"].innerHTML = "Roshan is alive"
      return 0
    }
    if (window.roshtimeractive) {
      timerID = window.requestAnimationFrame(timer);
    } else {
      window.Domlist["roshtext"].innerHTML = "Roshan is alive"
    }
  }
  timer();
}

function gametimer() {

}


//INIT FUNCTION
function init() {
  whtml(function() {
    Domlist["gamebutton"].firstElementChild.children[4].onclick = function() {
      if (window.gamebutton) {
        window.gamebutton = 0;
        Domlist["gamebutton"].firstElementChild.children[1].style.fill = "#e44949"
        Domlist["gamebutton"].firstElementChild.children[3].innerHTML = "Pause"
      } else {
        window.gamebutton = 1;
        Domlist["gamebutton"].firstElementChild.children[1].style.fill = "#19ee06"
        Domlist["gamebutton"].firstElementChild.children[3].innerHTML = "Start"
      }
    };
  });
  whtmlupdateinit();
  document.getElementById('roshbutton').onclick = roshtimer

}
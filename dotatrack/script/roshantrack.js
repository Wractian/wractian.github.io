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
  if (!window.gametime) {
    window.gametime = 1
    var timer, start = new Date(),
      pausetotal = 0,
      startoffset = new Date(start.valueOf() - 90000),
      timerID, now, previous, currenttime;
    previous = start
    timer = function() {
      now = new Date()
      if (!window.gamebutton) {
        //if unpaused
        var seconds = parseInt((currenttime / 1000) % 60);
        var minutes = parseInt(((currenttime / (1000 * 60)) % 60));
        currenttime = (((now - start) + pausetotal) - (start - startoffset))
        window.Domlist["gametext"].innerHTML = ("The current time is: " + msToTime(currenttime))
        if (window.Domlist['solarstate'].src.includes("Sun") && (Math.floor(((minutes / 4) % 2))) && ((minutes > 0))) {
          window.Domlist["solarstate"].src = 'content/Moon.svg'
        }
        if (window.Domlist['solarstate'].src.includes("Moon") && (Math.floor(((minutes / 4) % 2) == 0))) {
          window.Domlist["solarstate"].src = 'content/Sun.svg'
        }
        if ((currenttime > 0) && (String(seconds)).includes("53")) {
          console.log("STACK")
        }
      } else {
        //if paused
        pausetotal = pausetotal + (previous - now)
      }
      previous = now;
      timerID = window.requestAnimationFrame(timer);
    }
    timer()
  }

}


//INIT FUNCTION
function init() {
  whtml(function() {
    Domlist["gamebutton"].firstElementChild.children[4].onclick = function() {
      if (window.gamebutton) {
        window.gamebutton = 0;
        Domlist["gamebutton"].firstElementChild.children[1].style.fill = "#e44949"
        Domlist["gamebutton"].firstElementChild.children[3].innerHTML = "Pause"
        gametimer();
      } else {
        window.gamebutton = 1;
        Domlist["gamebutton"].firstElementChild.children[1].style.fill = "#19ee06"
        Domlist["gamebutton"].firstElementChild.children[3].innerHTML = "Start"
      }
    };
    var overlay = document.getElementById("mapoverlay")
    for (var i = 0; i < 4; i++) {
      overlay.getElementById('BRune' + [i]).style.display = "none"
    }
    for (var i = 0; i < 18; i++) {
      overlay.getElementById('Camp' + [i]).style.display = "none"
    }

  });
  whtmlupdateinit();
  document.getElementById('roshbutton').onclick = roshtimer

}

function showBRunes() {
  var overlay = document.getElementById("mapoverlay")
  for (var i = 0; i < 4; i++) {
    overlay.getElementById('BRune' + [i]).style.display = "block"
  }
}

function hideBRunes() {
  var overlay = document.getElementById("mapoverlay")
  for (var i = 0; i < 4; i++) {
    overlay.getElementById('BRune' + [i]).style.display = "none"
  }
}

function hideCamps() {
  var overlay = document.getElementById("mapoverlay")
  for (var i = 0; i < 18; i++) {
    overlay.getElementById('Camp' + [i]).style.display = "none"
  }
}

function showCamps() {
  var overlay = document.getElementById("mapoverlay")
  for (var i = 0; i < 18; i++) {
    overlay.getElementById('Camp' + [i]).style.display = "block"
  }
}






//ws
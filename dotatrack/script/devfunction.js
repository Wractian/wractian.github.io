'use strict';

function ping(a = "ping") {
  console.log(a)
}


function msToTime(duration) {
  var multiplier
  if (duration < 0) {
    multiplier = '-'
    duration = Math.abs(duration)
  } else {
    multiplier = ''
  }
  var seconds = parseInt((duration / 1000) % 60);
  var minutes = parseInt((duration / (1000 * 60)) % 60);
  var hours = parseInt(Math.floor((duration / (1000 * 60 * 60))));
  if (!hours == '0') {
    minutes = (minutes < 10) ? "0" + minutes : minutes;
  }
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  if (hours >= 1) {
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}

function whtmlupdateinit() {
  var target = document.querySelector("body");
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      whtmlupdatelist();
    });
  });
  var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  }
  observer.observe(target, config);
  whtmlupdatelist();
}

function whtmlupdatelist() {
  var z
  if (!window.Domlist) {
    window.Domlist = []
  }
  z = document.getElementsByTagName("*")
  for (var i = 0; i < z.length; i++) {
    if (!(z[i].getAttribute("whtmlupdate") == null)) {
      window.Domlist[z[i].getAttribute("whtmlupdate")] = z[i];
      z[i].removeAttribute("whtmlupdate")
    }

  }
}





function whtml(_callback) {
  var z, elem, file, xhttp, method
  xhttp = new XMLHttpRequest();
  z = document.getElementsByTagName("*")
  for (var i = 0; i < z.length; i++) {
    elem = z[i];
    method = elem.getAttribute("whtml")

    if (method) {
      method = method.split(/\s+/)
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elem[method[0] + "HTML"] = this.responseText;
          } else if (this.status == 404) {
            elem[method[0] + "HTML"] = "404"
          }
          elem.removeAttribute("whtml")
          whtml(_callback);
        }
      }
      xhttp.open("GET", method[1], true);
      xhttp.send();
      return 0;
    }
  }
  if (typeof _callback == 'function') {
    _callback()
  }
}









//dsad
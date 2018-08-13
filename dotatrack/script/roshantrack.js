"usestrict";

class timer {
  constructor(end = "5000", func) {
    this.args = []
    this.start = new Date();
    this.end = end;
    if (!func == '') {
      this.endfunc = window[func]
    }
    this.timerID = ''
    if (arguments.length > 2) {
      for (var i = 2; i < arguments.length; i++) {
        this.args[i - 2] = arguments[i]
      }

    }
  }
  timer() {
    this.timerID = window.requestAnimationFrame(this.timer.bind(this))
    if ((new Date() - this.start) >= this.end) {
      if (typeof this.endfunc == 'function') {
        this.endfunc(...this.args)
      }
      this.stoptimer()
    }
  }
  stoptimer() {
    window.cancelAnimationFrame(this.timerID)
  }
  starttimer() {
    this.timerID = window.requestAnimationFrame(this.timer.bind(this))
  }
}

function init() {
  var xhttp;
  roshmin = new timer(4800, "ping", "roshmin")
  roshmax = new timer(6600, "ping", "roshmax")
  roshmin.starttimer();
  roshmax.starttimer();
  //workaround to easally edit svg file without constant copypaste
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "content/map1.svg", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    var str, img
    if (this.readyState == 4) {
      str = this.responseText.replace('<?xml version="1.0" encoding="utf-8"?>', '')
      str = str.replace('<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->', '')
      document.getElementById('overlaywrapper').outerHTML = str;
    }
  }
}
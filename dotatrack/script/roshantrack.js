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


var time;
roshmin = new timer(4800, "ping", "roshmin")
roshmax = new timer(6600, "ping", "roshmax")
roshmin.starttimer();
roshmax.starttimer();
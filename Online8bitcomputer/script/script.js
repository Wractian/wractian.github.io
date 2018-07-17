class SevenSegment {
  constructor(id) {
    this.id = id;
    this.input = [1, 1, 1, 1, 1, 1, 0, 0]

  }
  retEle() { //Returns element of 7segment
    return document.getElementById(this.id);
  }
  retSeg(segment) { //Returns segment from 7segment
    return this.retEle().getElementsByClassName("7d" + segment)[0]
  }
  colorSeg(segment, color) {
    this.retSeg(segment).style.fill = color;
  }
  setOutput(colorOff = "#FF0000", colorOn = "#b1b1b1") {
    for (var i = 0; i < 8; i++) {
      if (this.input[i] === 1) {
        this.colorSeg(String.fromCharCode(97 + i), "#FF0000")
      } else {
        this.colorSeg(String.fromCharCode(97 + i), "#eFeFeF")
      }
    }
  }
}
class SegmentController {
  constructor(bits) {
    this.Segments = [];
    this.bits = bits;
    this.segTruth = []
    this.segTruth[0] = [1, 1, 1, 1, 1, 1, 0, 0]
    this.segTruth[1] = [0, 1, 1, 0, 0, 0, 0, 0]
    this.segTruth[2] = [1, 1, 0, 1, 1, 0, 1, 0]
    this.segTruth[3] = [1, 1, 1, 1, 0, 0, 1, 0]
    this.segTruth[4] = [0, 1, 1, 0, 0, 1, 1, 0]
    this.segTruth[5] = [1, 0, 1, 1, 0, 1, 1, 0]
    this.segTruth[6] = [1, 0, 1, 1, 1, 1, 1, 0]
    this.segTruth[7] = [1, 1, 1, 0, 0, 0, 0, 0]
    this.segTruth[8] = [1, 1, 1, 1, 1, 1, 1, 0]
    this.segTruth[9] = [1, 1, 1, 1, 0, 1, 1, 0]
    this.segTruth[10] = [0, 0, 0, 0, 0, 0, 1, 0]
  }
  addSegment() {
    for (var i = 0; i < arguments.length; i++) {
      this.Segments.push(new SevenSegment(arguments[i]));
    }
  }
  setSegment(input, segment) {
    this.Segments[segment].input = input;
  }
  updateDisplay() {
    for (var i = 0; i < this.Segments.length; i++) {
      this.Segments[i].setOutput();
    }
  }
  clearSegments() {
    for (var i = 0; i < this.Segments.length; i++) {
      this.setSegment([1, 1, 1, 1, 1, 1, 0, 0], i)
    }
    this.updateDisplay
  }
}
class LED {
  constructor() {
    this.state = 0;
    this.colorOff = "#008A42";
    this.colorOn = "#00FF00";
  }
  on() {
    this.state = 1;
  }
  off() {
    this.state = 0;
  }
  toggle() {
    if (this.state) {
      this.off();
    } else {
      this.on();
    }
  }
}
class LEDholder {
  constructor(id, bits = 8) {
    this.id = id;
    this.LEDs = [];
    this.bits = bits
    this.state = "00000000"
  }
  addLED() {
    for (var i = 0; i < arguments[0]; i++) {
      this.LEDs.push(new LED());
    }
  }
  setOutput(input) {
    this.state = input;
    var stepper = String(input).split("");
    console.log(stepper)
    for (var i = 0; i < this.LEDs.length; i++) {
      if (stepper[(String(input).length - 1) - i] == "1") {
        this.LEDs[i].on()
      } else {
        this.LEDs[i].off()
      }
    }
  }
  setLED(value, position) {

  }
  updateLEDs() {
    var elements = [];
    elements = document.getElementById(this.id).children
    for (var i = 0; i < this.LEDs.length; i++) {
      if (this.LEDs[i].state) { //1
        elements[(elements.length - 1) - i].children[2].style.fill = this.LEDs[i].colorOn
      } else { //0
        elements[(elements.length - 1) - i].children[2].style.fill = this.LEDs[i].colorOff
      }
    }
  }
}

function init() {
  LEDholders = [];
  display = new SegmentController(8);
  display.addSegment("7d1", "7d2", "7d3", "7d4");
  display.updateDisplay();
  LEDholders[0] = new LEDholder("LEDholder0");
  LEDholders[0].addLED(8);
  LEDholders[0].updateLEDs();
  LEDholders[1] = new LEDholder("LEDholder1", 9);
  LEDholders[1].addLED(9);
  LEDholders[1].LEDs[8].colorOff = "#000080"
  LEDholders[1].LEDs[8].colorOn = "#0000FF"
  LEDholders[1].updateLEDs();
  LEDholders[2] = new LEDholder("LEDholder2");
  LEDholders[2].addLED(8);
  LEDholders[2].updateLEDs();

}

function submitBinary() {
  event.preventDefault();
  var number = parseInt(document.getElementById('binaryinput').value, 2);
  var length = String(number).length
  display.clearSegments()
  for (var i = 0; i < length; i++) {
    display.setSegment(display.segTruth[String(number).charAt((length - 1) - i)], i)
  }
  display.updateDisplay()
}


function clickLED(a, b) {
  LEDholders[a.replace("LEDholder", "")].LEDs[b].toggle();
  LEDholders[a.replace("LEDholder", "")].updateLEDs();
}






//fd
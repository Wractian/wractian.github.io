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
    for (var i = 0; i < arguments.length - 1; i++) {
      this.addSegment(arguments[i + 1])
    }
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
    this.updateDisplay();
  }
  addSegment(a) {
    this.Segments.push(new SevenSegment(a));
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
    this.updateDisplay();
  }
}
class LED {
  constructor(colorOn = "#00FF00", colorOff = "#008A42") {
    this.state = 0;
    this.colorOff = colorOff;
    this.colorOn = colorOn;
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
  constructor(id, bits = 8, colorOn = "#00FF00", colorOff = "#008A42", onupdate = "") {
    this.id = id;
    this.LEDs = [];
    this.bits = bits
    this.state = "00000000"
    this.defaultColor = [colorOn, colorOff]
    this.onUpdate = onupdate;
    for (var i = 0; i < bits; i++) {
      this.addLED(1);
    }
    this.updateLEDs();
  }
  addLED() {
    for (var i = 0; i < arguments[0]; i++) {
      this.LEDs.push(new LED(this.defaultColor[0], this.defaultColor[1]));
    }
  }
  setOutput(input) {
    this.state = input;
    var stepper = String(input).split("");
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
    let input = ''
    elements = document.getElementById(this.id).children
    for (var i = 0; i < this.LEDs.length; i++) {
      if (this.LEDs[i].state) { //1
        elements[(elements.length - 1) - i].children[2].style.fill = this.LEDs[i].colorOn
      } else { //0
        elements[(elements.length - 1) - i].children[2].style.fill = this.LEDs[i].colorOff
      }
      input = this.LEDs[i].state + input
    }
    this.state = input
    if (!(this.onUpdate == "")) {
      window[this.onUpdate]();
    }
  }
}
class ALU {
  constructor(bits = 1) {
    this.state = "000000000"
    this.subMode = 0
    this.bits = bits
  }
  flip(a) {
    let b = '';
    for (var i = 0; i < a.length; i++) {
      b = b + (a[i] == "1" ? "0" : "1");
    }
    return b;
  }
  xor(a, b) {
    return (a === b ? 0 : 1);
  }
  and(a, b) {
    return a == 1 && b == 1 ? 1 : 0;
  }
  or(a, b) {
    return (a || b);
  }
  halfAdder(a, b) {
    const sum = this.xor(a, b);
    const carry = this.and(a, b);
    return [sum, carry];
  }
  fullAdder(a, b, carry) {
    const halfAdd = this.halfAdder(a, b)
    const sum = this.xor(carry, halfAdd[0]);
    carry = this.and(carry, halfAdd[0]);
    carry = this.or(carry, halfAdd[1])
    return [sum, carry]
  }
  calculate(a, b) {
    let sum = '';
    let carry = 0;
    if (this.subMode) { //2's complimant
      b = this.flip(b);
      carry = 1;
    }
    for (var i = this.bits - 1; i >= 0; i--) {
      const fullAdd = this.fullAdder(a[i], b[i], carry);
      sum = fullAdd[0] + sum;
      carry = fullAdd[1];
    }
    if (this.subMode) { //Fixes Carry bit for 2's
      carry = "0"
    }
    return [sum, carry]
  }
}
class RAM {
  constructor(abit, bit) {
    this.abit = abit;
    this.bit = bit;
    this.astate = 0
    this.state = "00000000"
    this.statestorage = []
  }
  changeAState(a = "0000") {
    this.astate = a;
    this.state = this.statestorage[a]
  }
}


function init() {
  Alu = new ALU(8);
  display = new SegmentController(8, "7d1", "7d2", "7d3", "7d4");
  LEDholders = [];
  LEDholders[0] = new LEDholder("LEDholder0", 8, "#00FF00", "#008A42");
  LEDholders[1] = new LEDholder("LEDholder1", 1, "#0000FF", "#000080");
  LEDholders[2] = new LEDholder("LEDholder2", 8, "#00FF00", "#008A42");
  LEDholders[3] = new LEDholder("LEDholder3", 8, "#00FF00", "#008A42");
  LEDholders[4] = new LEDholder("LEDholder4", 4, "#FFb100", "#6b2a00", "alertAddress");
  LEDholders[5] = new LEDholder("LEDholder5", 8, "#FF0000", "#580000", "alertMemory");
  LEDholders[6] = new LEDholder("LEDholder6", 8, "#00ffff", "#005454");
  Ram = new RAM(LEDholders[4], LEDholders[5]);
}

//Dev Functions
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

function addAB() {
  a = LEDholders[0].state;
  b = LEDholders[3].state;
  c = Alu.calculate(a, b);
  LEDholders[1].setOutput(c[1]);
  LEDholders[1].updateLEDs();
  LEDholders[2].setOutput(c[0]);
  LEDholders[2].updateLEDs();
  document.getElementById('binaryinput').value = c[0]
  submitBinary()
}

function addSwap() {
  console.log("swap")
  if (document.getElementById('ALUcheck').innerHTML == "sub") {
    document.getElementById('ALUcheck').innerHTML = "add"
    document.getElementById('Calculate').style.background = "#d10000"
    Alu.subMode = 0;
  } else {
    document.getElementById('ALUcheck').innerHTML = "sub"
    document.getElementById('Calculate').style.background = "#0000d1"
    Alu.subMode = 1;
  }
}

function clockButton(a) {
  if (a === 0 || a === 1) {

  } else if (a === 2) {

  } else {
    clock()
  }
}

function alertAddress() {
  if (!(typeof Ram === 'undefined')) {
    Ram.state = Ram.statestorage[Ram.abit.state];
    Ram.bit.setOutput(Ram.state)
    Ram.bit.updateLEDs();
    console.log(Ram.state)
  }
}

function alertMemory() {
  if (!(typeof Ram === 'undefined')) {
    Ram.state = Ram.bit.state
    Ram.statestorage[Ram.abit.state] = Ram.state;
    console.log(Ram.state)
  }
}
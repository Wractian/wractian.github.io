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
  constructor(bits = 1, aReg, bReg) {
    this.state = "000000000"
    this.subMode = 0
    this.bits = bits
    this.AReg = aReg
    this.BReg = bReg
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
  calcAB() {
    let a = this.AReg.state;
    let b = this.BReg.state;
    let c = Alu.calculate(a, b);
    LEDholders[1].setOutput(c[1]);
    LEDholders[1].updateLEDs();
    LEDholders[2].setOutput(c[0]);
    LEDholders[2].updateLEDs();
  }
}
class RAM {
  constructor(abit, bit) {
    this.abit = abit;
    this.bit = bit;
    this.astate = 0
    this.state = "00000000";
    this.statestorage = []
  }
  changeAState(a = "0000") {
    this.astate = a;
    this.state = this.statestorage[a]
  }
}
class Clock {
  constructor() {
    this.state = 0
    this.continue = 0
    this.clocks = 0
    this.duration = 250
  }
  clockOn() {
    if (!control.state["HLT"]) {
      if (this.state === 0) {
        this.state = 1;
        document.getElementById("clockLED").src = "content/Indicator.svg"
        this.clocks = setTimeout(this.clockOff.bind(this), this.duration)
        Alu.calcAB();
        //PutStuff here
        if (control.state["SU"]) {
          Alu.subMode = 1
        } else {
          Alu.subMode = 0
        }
        if (control.state["CE"]) {
          LEDholders[6].setOutput(countup(LEDholders[6].state));
          LEDholders[6].updateLEDs();
        }
        if (control.state["CO"]) {
          LEDholders[7].setOutput(LEDholders[6].state);
          LEDholders[7].updateLEDs();
        }
        if (control.state["MI"]) {
          LEDholders[4].setOutput(LEDholders[7].state)
          LEDholders[4].updateLEDs();
        }
        if (control.state["AI"]) {
          LEDholders[7].setOutput(LEDholders[0].state)
          LEDholders[7].updateLEDs();
        }
        if (control.state["RO"]) {
          LEDholders[7].setOutput(LEDholders[5].state)
          LEDholders[7].updateLEDs();
        }
        if (control.state["II"]) {
          LEDholders[8].setOutput(LEDholders[7].state)
          LEDholders[8].updateLEDs();
        }
      }
    }
  }
  clockOff() {
    this.state = 0;
    document.getElementById("clockLED").src = "content/OffIndicator.svg"
    if (this.continue) {
      this.clocks = setTimeout(this.clockOn.bind(this), this.duration)
    }
  }
}
class OverallController {
  constructor() {
    this.state = []
  }
  Halt(input) {
    this.state["HLT"] = input;
  }
  CounterEnable(input) {
    this.state["CE"] = input;
  }
  CounterOutput(input) {
    this.state["CO"] = input;
  }
  MemoryInput(input) {
    this.state["MI"] = input;
  }
  RAMInput(input) {
    this.state["RI"] = input;
  }
  RAMOutput(input) {
    this.state["RO"] = input;
  }
  InstructionInput(input) {
    this.state["II"] = input;
  }
  InstructionOutput(input) {
    this.state["IO"] = input;
  }
  ARegisterInput(input) {
    this.state["AI"] = input;
  }
  ARegisterOutput(input) {
    this.state["AO"] = input;
  }
  SumOutput(input) {
    this.state["SO"] = input;
  }
  Sub(input) {
    this.state["SU"] = input;
  }
  BRegisterInput(input) {
    this.state["AI"] = input;
  }
  DisplayOutput(input) {
    this.state["OI"] = input;
  }
  Jump(input) {
    this.state["J"] = input;
  }
}
//Hlt,


function init() {
  display = new SegmentController(8, "7d1", "7d2", "7d3", "7d4");
  LEDholders = [];
  LEDholders[0] = new LEDholder("LEDholder0", 8, "#00FF00", "#008A42");
  LEDholders[1] = new LEDholder("LEDholder1", 1, "#0000FF", "#000080");
  LEDholders[2] = new LEDholder("LEDholder2", 8, "#00FF00", "#008A42");
  LEDholders[3] = new LEDholder("LEDholder3", 8, "#00FF00", "#008A42");
  LEDholders[4] = new LEDholder("LEDholder4", 4, "#FFb100", "#6b2a00", "alertAddress");
  LEDholders[5] = new LEDholder("LEDholder5", 8, "#FF0000", "#580000", "alertMemory");
  LEDholders[6] = new LEDholder("LEDholder6", 4, "#ff00e6", "#550048");
  LEDholders[7] = new LEDholder("LEDholder7", 8, "#00ffff", "#005454");
  LEDholders[8] = new LEDholder("LEDholder8", 8, "#0000FF", "#000080")
  LEDholders[8].LEDs[0].colorOff = "#6b2a00"
  LEDholders[8].LEDs[1].colorOff = "#6b2a00"
  LEDholders[8].LEDs[2].colorOff = "#6b2a00"
  LEDholders[8].LEDs[3].colorOff = "#6b2a00"
  LEDholders[8].LEDs[0].colorOn = "#FFb100"
  LEDholders[8].LEDs[1].colorOn = "#FFb100"
  LEDholders[8].LEDs[2].colorOn = "#FFb100"
  LEDholders[8].LEDs[3].colorOn = "#FFb100"
  LEDholders[8].updateLEDs();
  Ram = new RAM(LEDholders[4], LEDholders[5]);
  Alu = new ALU(8, LEDholders[0], LEDholders[3]);
  clock = new Clock();
  control = new OverallController();
  document.getElementById("Hertz").children[0].innerHTML = (Math.trunc((1 / (clock.duration / 1000)) * 100) / 100);
}

//Dev Functions, sloppy frankenstein code
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

function addSwap() {
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

function alertAddress() {
  if (!(typeof Ram === 'undefined')) {
    Ram.state = Ram.statestorage[Ram.abit.state];
    Ram.bit.setOutput(Ram.state)
    Ram.bit.updateLEDs();
  }
}

function alertMemory() {
  if (!(typeof Ram === 'undefined')) {
    Ram.state = Ram.bit.state
    Ram.statestorage[Ram.abit.state] = Ram.state;
  }
}

function clockButton(a) {
  if (a === 0 || a === 1) {
    if (a === 0) {
      clock.duration += 50
    } else {
      if (clock.duration > 0) {
        clock.duration -= 50
      }
    }
    document.getElementById("Hertz").children[0].innerHTML = (Math.trunc((1 / (clock.duration / 1000)) * 100) / 100);
  } else if (a === 2) {
    if (clock.continue) {
      document.getElementById("pauseplay").src = "content/play.svg";
      document.getElementById("singlestep").src = "content/singleFrame.svg"
      clock.continue = 0
      if (clock.state === 0) {
        clearTimeout(clock.clocks);
      }
    } else {
      document.getElementById("pauseplay").src = "content/pause.svg";
      document.getElementById("singlestep").src = "content/OffsingleFrame.svg"
      clock.continue = 1
      clock.clockOn()
    }
  } else {
    if (clock.continue === 0) {
      clock.clockOn()
    }
  }
}

function countup(a) {
  let carry = 0;
  let sum = '';
  let b = '0001'
  for (var i = 3; i >= 0; i--) {
    const fullAdd = Alu.fullAdder(a[i], b[i], carry);
    sum = fullAdd[0] + sum;
    carry = fullAdd[1];
  }
  return sum;
}






//oll
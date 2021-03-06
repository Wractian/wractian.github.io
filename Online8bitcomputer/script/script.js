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
  setOutput(a) {
    let number = parseInt(a, 2);
    let length = String(number).length
    this.clearSegments()
    for (var i = 0; i < length; i++) {
      this.setSegment(display.segTruth[String(number).charAt((length - 1) - i)], i)

    }
    display.updateDisplay()
  }
}
class LED {
  constructor(parent = "", colorOn = "#00FF00", colorOff = "#008A42") {
    this.state = 0;
    this.colorOff = colorOff;
    this.colorOn = colorOn;
    this.element = parent.innerHTML += `<svg class="LED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 560" xml:space="preserve">
    <path class="st0" d="M220.9,333.7c0,156.7,0,223.8,0,223.8H199V333.7H220.9z" />
    <path class="st0" d="M89.5,333.7c0,141,0,201.5,0,201.5H67.6V333.7H89.5z" />
    <path class="st1"
      d="M27.8,188.2v92.6H2v52.9h284.6v-52.9h-25.9l-0.2-92.4c0,0,0.2-185.3-116.1-185.3 C27.8,3,27.8,188.2,27.8,188.2z"
      fill="#00FF00" stroke="#008A42" />
    <path class="st2" d="M27.8,280.8c238.6,0,232.8,0,232.8,0" />
  </svg>`
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
  update() {
    if (this.state) { //1
      this.element.children[2].style.fill = this.colorOn
    } else { //0
      this.element.children[2].style.fill = this.colorOff
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
      this.LEDs.push(new LED(document.getElementById(this.id),this.defaultColor[0], this.defaultColor[1]));
      
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
    this.updateLEDs();
  }
  setLED(value, position) {

  }
  retFirstFour() {
    let s = ''
    for (var i = 0; i < 4; i++) {
      s = this.state[(this.state.length - 1) - i] + s
    }
    return s
  }
  retLastFour() {
    let s = ''
    for (var i = 4; i < this.state.length; i++) {
      s = this.state[(this.state.length - 1) - i] + s
    }
    return s
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
  clearLEDs() {
    let b = ''
    for (var i = 0; i < this.bits; i++) {
      b = b + "0"
    }
    this.setOutput(b)
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
    LEDholders[2].setOutput(c[1]);
    LEDholders[2].updateLEDs();
    LEDholders[3].setOutput(c[0]);
    LEDholders[3].updateLEDs();
    if (c[0] == "00000000") {
      LEDholders[1].setOutput("1");
    } else {
      LEDholders[1].setOutput(0);
    }
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
    this.duration = 20
  }
  clockOn() {
    if (!control.state["HLT"]) {
      if (this.state === 0) {
        this.state = 1;
        document.getElementById("clockLED").src = "content/Indicator.svg"
        this.clocks = setTimeout(this.clockOff.bind(this), this.duration)

        //Fetch Command
        if (LEDholders[10].state[0] == "1") {
          control.state["CO"] = 1;
          control.state["MI"] = 1;
        } else if (LEDholders[10].state[1] == "1") {
          control.state["RO"] = 1;
          control.state["II"] = 1;
        } else if (LEDholders[10].state[2] == "1") {
          control.state["CE"] = 1;
        } else {
          control.setState(LEDholders[11].retLastFour(), LEDholders[10].state)
        }
        //PutStuff here
        if (control.state["SU"]) {
          Alu.subMode = 1
        } else {
          Alu.subMode = 0
        }
        if (control.state["CE"]) {
          LEDholders[7].setOutput(countup(LEDholders[7].state));
        }
        if (control.state["CO"]) {
          LEDholders[8].setOutput(LEDholders[7].state);
        }
        if (control.state["SO"]) {
          LEDholders[8].setOutput(LEDholders[3].state);
        }
        if (control.state["RO"]) {
          LEDholders[8].setOutput(LEDholders[6].state)
        }
        if (control.state["AO"]) {
          console.log("error1")
          LEDholders[8].setOutput(LEDholders[0].state)
          console.log("error2")
        }
        if (control.state["IO"]) {
          LEDholders[8].setOutput(LEDholders[11].retFirstFour())
        }
        if (control.state["MI"]) {
          LEDholders[5].setOutput(LEDholders[8].state)
        }
        if (control.state["AI"]) {
          LEDholders[0].setOutput(LEDholders[8].state)
        }
        if (control.state["BI"]) {
          LEDholders[4].setOutput(LEDholders[8].state)
        }
        if (control.state["II"]) {
          LEDholders[11].setOutput(LEDholders[8].state)
        }
        if (control.state["RI"]) {
          console.log("error3")
          LEDholders[6].setOutput(LEDholders[8].state)
          console.log("error4")
        }
        if (control.state["OI"]) {
          display.setOutput(LEDholders[0].state)
        }
        if (control.state["J"]) {
          LEDholders[7].setOutput(LEDholders[8].state)
        }
        if (control.state["FL"]) {
          LEDholders[12].setOutput(LEDholders[1].state)
          LEDholders[13].setOutput(LEDholders[2].state)
        }
      }
    }
  }
  clockOff() {
    this.state = 0;
    document.getElementById("clockLED").src = "content/IndicatorOff.svg"
    var counter = countup(LEDholders[9].state);
    LEDholders[9].setOutput((counter == "110") ? "000" : countup(LEDholders[9].state));
    LEDholders[10].clearLEDs();
    LEDholders[10].LEDs[(LEDholders[10].LEDs.length - 1) - parseInt(LEDholders[9].state, 2)].state = 1
    LEDholders[10].updateLEDs();
    Alu.calcAB();
    if (!(control.state["HLT"])) {
      control.state = [];
    } else {
      for (var i = 0; i < LEDholders.length; i++) {
        if (!(i == 6)) {
          LEDholders[i].setOutput("00000000")
        }
        LEDholders[10].LEDs[5].state = 1;
        LEDholders[10].updateLEDs();
      }
      document.getElementById("pauseplay").src = "content/Play.svg";
      document.getElementById("singlestep").src = "content/SingleFrame.svg"
      this.continue = 0
      control.state = []
    }
    if (this.continue) {
      this.clocks = setTimeout(this.clockOn.bind(this), this.duration)
    }
  }
}
class OverallController {
  constructor() {
    this.state = []
    this.commands = []
    this.commands["0000"] = [] //NOP
    this.commands["0000"]["000001"] = []
    this.commands["0000"]["000100"] = []
    this.commands["0000"]["000010"] = []
    this.commands["0001"] = [] //LDA
    this.commands["0001"]["000100"] = ["IO", "MI"]
    this.commands["0001"]["000010"] = ["RO", "AI"]
    this.commands["0001"]["000001"] = []
    this.commands["0010"] = [] //ADD
    this.commands["0010"]["000100"] = ["IO", "MI"]
    this.commands["0010"]["000010"] = ["RO", "BI"]
    this.commands["0010"]["000001"] = ["SO", "AI", "FL"]
    this.commands["0011"] = [] //SUB
    this.commands["0011"]["000100"] = ["IO", "MI"]
    this.commands["0011"]["000010"] = ["RO", "BI", "SU"]
    this.commands["0011"]["000001"] = ["SO", "AI", "FL"]
    this.commands["0100"] = [] //LDI
    this.commands["0100"]["000100"] = ["AI", "IO"]
    this.commands["0100"]["000010"] = []
    this.commands["0100"]["000001"] = []
    this.commands["0101"] = [] //DISPLAY
    this.commands["0101"]["000100"] = ["AO", "OI"]
    this.commands["0101"]["000010"] = []
    this.commands["0101"]["000001"] = []
    this.commands["0110"] = [] //JMP
    this.commands["0110"]["000100"] = ["IO", "J"]
    this.commands["0110"]["000010"] = []
    this.commands["0110"]["000001"] = []
    this.commands["0111"] = [] //JMC
    this.commands["0111"]["000100"] = ["IO", "J"] //only if carry is 1
    this.commands["0111"]["000010"] = []
    this.commands["0111"]["000001"] = []
    this.commands["1000"] = [] //JMZ
    this.commands["1000"]["000100"] = ["IO", "J"] //only if sum is zero
    this.commands["1000"]["000010"] = []
    this.commands["1000"]["000001"] = []
    this.commands["1001"] = [] //STA
    this.commands["1001"]["000100"] = ["IO", "MI"]
    this.commands["1001"]["000010"] = ["AO", "RI"]
    this.commands["1001"]["000001"] = []
    this.commands["1111"] = [] //HLT
    this.commands["1111"]["000100"] = ["HLT"]
    this.commands["1111"]["000010"] = []
    this.commands["1111"]["000001"] = []
  }
  setState(instruction, counter) {

    for (var i = 0; i < this.commands[instruction][counter].length; i++) {
      if (instruction == "0111") {
        if (LEDholders[13].state == "1") {
          this.state[this.commands[instruction][counter][i]] = 1
        } else {
          this.state[this.commands[instruction][counter][i]] = 0
        }
      } else if (instruction == "1000") {
        if (LEDholders[12].state == "1") {
          this.state[this.commands[instruction][counter][i]] = 1
        } else {
          this.state[this.commands[instruction][counter][i]] = 0
        }
      } else {
        this.state[this.commands[instruction][counter][i]] = 1
      }

    }
  }
}

function init() {
  display = new SegmentController(8, "7d1", "7d2", "7d3", "7d4");
  LEDholders = [];
  LEDholders[0] = new LEDholder("LEDholder0", 8, "#00FF00", "#008A42");
  LEDholders[1] = new LEDholder("LEDholder1", 1, "#0000FF", "#000080");
  LEDholders[2] = new LEDholder("LEDholder2", 1, "#0000FF", "#000080");
  LEDholders[3] = new LEDholder("LEDholder3", 8, "#00FF00", "#008A42");
  LEDholders[4] = new LEDholder("LEDholder4", 8, "#00FF00", "#008A42");
  LEDholders[5] = new LEDholder("LEDholder5", 4, "#FFb100", "#6b2a00", "alertAddress");
  LEDholders[6] = new LEDholder("LEDholder6", 8, "#FF0000", "#580000", "alertMemory");
  LEDholders[7] = new LEDholder("LEDholder7", 4, "#ff00e6", "#550048");
  LEDholders[8] = new LEDholder("LEDholder8", 8, "#00ffff", "#005454");
  LEDholders[9] = new LEDholder("LEDholder9", 3, "#00ffba", "#004532");
  LEDholders[10] = new LEDholder("LEDholder10", 6, "#00FF00", "#008A42");
  LEDholders[10].LEDs[5].state = 1;
  LEDholders[10].updateLEDs();
  LEDholders[11] = new LEDholder("LEDholder11", 8, "#0000FF", "#000080")
  LEDholders[11].LEDs[0].colorOff = "#6b2a00"
  LEDholders[11].LEDs[1].colorOff = "#6b2a00"
  LEDholders[11].LEDs[2].colorOff = "#6b2a00"
  LEDholders[11].LEDs[3].colorOff = "#6b2a00"
  LEDholders[11].LEDs[0].colorOn = "#FFb100"
  LEDholders[11].LEDs[1].colorOn = "#FFb100"
  LEDholders[11].LEDs[2].colorOn = "#FFb100"
  LEDholders[11].LEDs[3].colorOn = "#FFb100"
  LEDholders[11].updateLEDs();
  LEDholders[12] = new LEDholder("LEDholder12", 1, "#0000FF", "#000080");
  LEDholders[13] = new LEDholder("LEDholder13", 1, "#0000FF", "#000080");
  Ram = new RAM(LEDholders[5], LEDholders[6]);
  Alu = new ALU(8, LEDholders[0], LEDholders[4]);
  clock = new Clock();
  control = new OverallController();
  document.getElementById("Hertz").children[0].innerHTML = (Math.trunc((1 / (clock.duration / 1000)) * 100) / 100);
}

//Dev Functions, sloppy frankenstein code
function submitBinary() {
  event.preventDefault();
  display.setOutput(document.getElementById('binaryinput').value)
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
      clock.duration += 20
    } else {
      if (clock.duration > 0) {
        clock.duration -= 20
      }
    }
    document.getElementById("Hertz").children[0].innerHTML = (Math.trunc((1 / (clock.duration / 1000)) * 100) / 100);
  } else if (a === 2) {
    if (clock.continue) {
      document.getElementById("pauseplay").src = "content/Play.svg";
      document.getElementById("singlestep").src = "content/SingleFrame.svg"
      clock.continue = 0
      if (clock.state === 0) {
        clearTimeout(clock.clocks);
      }
    } else {
      document.getElementById("pauseplay").src = "content/Pause.svg";
      document.getElementById("singlestep").src = "content/SingleFrameOff.svg"
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
  let b = '';
  for (var i = 0; i < a.length - 1; i++) {
    b = b + "0"
  }
  b = b + "1"
  for (var i = a.length - 1; i >= 0; i--) {
    const fullAdd = Alu.fullAdder(a[i], b[i], carry);
    sum = fullAdd[0] + sum;
    carry = fullAdd[1];
  }
  return sum;
}

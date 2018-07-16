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



function init() {
  display = new SegmentController(8);
  display.addSegment("7d1", "7d2", "7d3", "7d4");
  display.updateDisplay();
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









//fd
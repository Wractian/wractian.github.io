class SevenSegment {
  constructor(id) {
    this.id = id;
    this.input = [0, 0, 0, 0, 0, 0, 0, 0]
    this.segTruth = []
    this.segTruth["0000"] = [1, 1, 1, 1, 1, 1, 0, 0]
    this.segTruth["0001"] = [0, 1, 1, 0, 0, 0, 0, 0]
    this.segTruth["0010"] = [1, 1, 0, 1, 1, 0, 1, 0]
    this.segTruth["0011"] = [1, 1, 1, 1, 0, 0, 1, 0]
    this.segTruth["0100"] = [0, 1, 1, 0, 0, 1, 1, 0]
    this.segTruth["0101"] = [1, 0, 1, 1, 0, 1, 1, 0]
    this.segTruth["0110"] = [1, 0, 1, 1, 1, 1, 1, 0]
    this.segTruth["0111"] = [1, 1, 1, 0, 0, 0, 0, 0]
    this.segTruth["1000"] = [1, 1, 1, 1, 1, 1, 1, 0]
    this.segTruth["1001"] = [1, 1, 1, 1, 0, 1, 1, 0]
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
    for (var i = 0; i < this.input.length; i++) {
      if (this.input[i] === 1) {
        this.colorSeg(String.fromCharCode(97 + i), "#FF0000")
      } else {
        this.colorSeg(String.fromCharCode(97 + i), "#b1b1b1")
      }
    }
  }
}
class SegmentController {
  constructor() {
    this.Segments = [];
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
}



function init() {
  display = new SegmentController();
  display.addSegment("7d1", "7d2", "7d3", "7d4");
  display.setSegment([0, 1, 1, 0, 1, 1, 1, 0], 0);
  display.setSegment([1, 1, 1, 0, 1, 1, 1, 0], 1);
  display.setSegment([0, 1, 1, 0, 1, 1, 1, 0], 2);
  display.setSegment([1, 1, 1, 0, 1, 1, 1, 0], 3);

  display.updateDisplay()
}

function submitBinary() {
  var b = document.getElementById('binaryinput').value;
  console.log(b);
}
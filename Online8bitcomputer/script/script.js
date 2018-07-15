class SevenSegment {
  constructor(id) {
    this.id = id;
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
  //Return element
  retEle() {
    return document.getElementById(this.id);
  }
  retSeg(segment) {
    return this.retEle().getElementsByClassName("7d" + segment)[0]
  }
  colorSeg(segment, color) {
    this.retSeg(segment).style.fill = color;
    return 0;
  }
  setOutput(binary) {
    for (var i = 0; i < this.segTruth[binary].length; i++) {
      if (this.segTruth[binary][i] === 1) {
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
}



function init() {
  display = new SegmentController();
  display.addSegment("7d1", "7d2", "7d3", "7d4");
}

function submitBinary() {
  var b = document.getElementById('binaryinput').value;

}
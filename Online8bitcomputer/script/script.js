class sevensegment {
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




function init() {
  x = [];
  x[0] = new sevensegment('7d1');
  x[1] = new sevensegment('7d2');
  x[2] = new sevensegment('7d3');
  x[3] = new sevensegment('7d4');
}
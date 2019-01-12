var font;
var vehicles = [];
let words = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  swapingCirclesInt = setInterval(next, 3000);
  createCanvas(windowWidth, windowHeight);
  background(51);
  // words.push(font.textToPoints('Joey', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))
  // words.push(font.textToPoints('Abby', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))
  // words.push(font.textToPoints('Mikian', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))
  // words.push(font.textToPoints('Jacob', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))
  // words.push(font.textToPoints('Nevaeh', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))
  // words.push(font.textToPoints('Musser', width / 4, 500, 250, {
  //   sampleFactor: 0.1
  // }))

  words.push(font.textToPoints('Code', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))
  words.push(font.textToPoints('{Central}', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))
  words.push(font.textToPoints('Student', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))
  words.push(font.textToPoints('Showcase', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))
  words.push(font.textToPoints('Jan 12', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))
  words.push(font.textToPoints('/Switch/', width / 5, 500, 250, {
    sampleFactor: 0.1
  }))

  for (var i = 0; i < words[0].length; i++) {
    var pt = words[0][i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  for (var i = 0; i < words.length; i++) {
    if (vehicles.length < words[i].length) {
      let count = words[i].length - vehicles.length;
      for (var j = 0; j < count; j++) {
        var vehicle = new Vehicle(random(width), random(500 + 100, height - 25));
        vehicles.push(vehicle);
      }
    }
  }

}

let index = 0;

function draw() {
  colorMode(RGB)
  background(51, 100);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function mousePressed() {
  next();
}

function next() {
  index++;
  for (var i = 0; i < words[index % words.length].length; i++) {
    vehicles[i].target.x = words[index % words.length][i].x
    vehicles[i].target.y = words[index % words.length][i].y
  }

  if (words[index % words.length].length < words[(index - 1) % words.length].length) {
    // console.log(words[index % words.length].length);
    // console.log(words[(index - 1) % words.length].length);
    for (var i = words[index % words.length].length; i < words[(index - 1) % words.length].length; i++) {
      vehicles[i].target.x = random(width)
      vehicles[i].target.y = random(500 + 100, height - 25)
    }
  }

}
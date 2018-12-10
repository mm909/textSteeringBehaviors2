function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 35;
  this.maxforce = 5;
  // this.h = random(50, 70);
  // this.h = random(255);
  this.start = 0.0;
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

let maxh = 0;
let minh = 1;
Vehicle.prototype.show = function() {
  colorMode(HSB)
  noiseDetail(20, 0.65);
  this.start += random(0.005)
  this.h = noise(this.start);
  if (this.h > maxh) maxh = this.h
  if (this.h < minh) minh = this.h
  this.h = map(this.h, minh, maxh, 0, 255)
  stroke(this.h, 100, 100)
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
}

function showMinMax() {
  console.log(maxh);
  console.log(minh);
}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
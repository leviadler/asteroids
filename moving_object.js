(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }
  
  MovingObject.prototype.move = function(maxX, maxY) {
    this.pos[0] = ((this.pos[0] + this.vel[0]) % maxX);
    this.pos[1] = ((this.pos[1] + this.vel[1]) % maxY);
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
  
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var a = Math.abs(this.pos[0] - otherObj.pos[0]);
    var b = Math.abs(this.pos[1] - otherObj.pos[1]);
  
    var pythag = (a * a) + (b * b);
    var distance = Math.sqrt(pythag);
  
    if ((this.radius + otherObj.radius) > distance) {
      return true;
    }
    else {
      return false;
    }
  } 
})(this);
(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Ship = Asteroids.Ship = function(game, pos, vel) {
    this.RADIUS = 10;
    this.COLOR = "black";
    this.game = game;
    
    Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.fireBullet = function(game) {
    if (this.vel[0] !== 0 || this.vel[1] !== 0) {
      var deltaX = (this.vel[0] < 0) ? -4 : (4);
      var deltaY = (this.vel[1] < 0) ? -9 : (9);
      
      var velX = Math.abs(this.vel[0]) * deltaX;
      var velY = Math.abs(this.vel[1]) * deltaY;
      
      var bulletPos = this.pos.slice();
      var bulletVel = [velX, velY];
      
      return new Asteroids.Bullet(game, bulletPos, bulletVel);
    };
  };
  
  Ship.prototype.remove = function () {
    this.pos[0] = Math.floor(this.game.DIM_X / 2);
    this.pos[1] = Math.floor(this.game.DIM_Y / 2);
  }
  
  
})(this);
(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    this.RADIUS = 5;
    this.COLOR = "red";
    this.game = game;
    
    Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    
    this.game.asteroids.forEach( function(ast) {
      if(ast.isCollidedWith(bullet)) {
        bullet.game.removeAsteroid(ast);
        bullet.game.removeBullet(bullet);
      }
    });
  };
  
  Bullet.prototype.move = function () {
    this.pos[0] = (this.pos[0] + this.vel[0]);
    this.pos[1] = (this.pos[1] + this.vel[1]);
    
    this.hitAsteroids();
  };
  
  Bullet.prototype.remove = function () {
    this.game.removeBullet(this);
  };
   
  
})(this);


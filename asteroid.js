(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    this.COLOR = "green";
    this.RADIUS = 30;
    
    Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
    var posX = Math.floor(Math.random() * dimX);
    var posY = Math.floor(Math.random() * dimY);
    var vel = Asteroid.randomVel(dimX, dimY);
    
    return new Asteroid(
      [posX, posY],
      vel
    );
  };
  
  Asteroid.randomVel = function (dimX, dimY) {
    var velX = Math.abs((((Math.random() * 2) - 1) * ((Math.random() + 1) * 1)) % dimX);
    var velY = Math.abs((((Math.random() * 2) - 1) * ((Math.random() + 1) * 1)) % dimY);
    
    return [velX, velY];
  };
})(this);
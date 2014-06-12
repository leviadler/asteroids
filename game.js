(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx.getContext("2d");
    this.asteroids = [];
    this.bullets = [];
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.FPS = 30;

    this.addAsteroids(10);

    var shipX = Math.floor(this.DIM_X / 2);
    var shipY = Math.floor(this.DIM_Y / 2);
    this.ship = new Asteroids.Ship(this, [shipX, shipY], [0, 0]);
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y));
    }
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.asteroids.forEach(function(ast) {
      if (game.ship.isCollidedWith(ast)) {
        alert("Game over!!!!");
        game.stop();
      };
    });
  }

  Game.prototype.stop = function() {
    window.clearInterval(this.intervalId);
  };

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet(this);

    if (bullet) { this.bullets.push(bullet); };
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  }

  Game.prototype.removeBullet = function (bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  Game.prototype.bindKeyHandlers = function() {
    var game = this;

    key('up', function() { game.ship.power([0, -1]); });
    key('down', function() { game.ship.power([0, 1]); });
    key('left', function() { game.ship.power([-1, 0]); });
    key('right', function() { game.ship.power([1, 0]); });
    key('space', function() { game.fireBullet(); });
  };

  Game.prototype.isOutOfBounds = function (obj) {
    if (obj.pos[0] > this.DIM_X || obj.pos[1] > this.DIM_Y
        || obj.pos[0] < 0 || obj.pos[1] < 0 ) {
      obj.remove();
    };
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    var game = this;
    this.asteroids.forEach(function (ast) {
      ast.draw(game.ctx);
    });

    this.bullets.forEach(function (bul) {
      bul.draw(game.ctx);
    });

    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function () {
    var game = this;
    this.asteroids.forEach(function (ast) {
      ast.move(game.DIM_X, game.DIM_Y);
      game.isOutOfBounds(ast);
    });

    this.bullets.forEach(function (bul) {
      bul.move(game.DIM_X, game.DIM_Y);
      game.isOutOfBounds(bul);
    });

    this.ship.move(this.DIM_X, this.DIM_Y);
    this.isOutOfBounds(this.ship);
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
  }

  Game.prototype.start = function () {
    var game = this;
    this.bindKeyHandlers();
    this.intervalId = window.setInterval(game.step.bind(game), game.FPS);
  }

})(this);
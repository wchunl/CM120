// Enemy prefab

var count = 0;
function Enemy(game, posx, posy, frame) {
    count = 0;
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, frame);
    
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.tint = 0xff0000;
    
    // Add Animations
    this.animations.add('right', [0, 1, 2, 3], 10, true);
    this.animations.add('left', [5, 6, 7, 8], 10, true);
    this.animations.play('right');

    // Instance variables

}

// Inherit Phaser.Sprite's prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    this.body.velocity.x = 100;
    // this.x = Phaser.Math.linearInterpolation([this.x, 600], 0.005);
}

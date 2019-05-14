// Enemy prefab

var count = 0;
function Enemy(game, posx, posy) {
    count = 0;
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'twinDark');
    
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    // this.tint = 0xff0000;
    
    // Add Animations
    this.animations.add('moving', ['sprite9','sprite10','sprite11',
                                'sprite12','sprite13','sprite14',
                                'sprite15','sprite16'], 12, true);
    this.animations.add('standing', ['sprite1','sprite2','sprite3','sprite4'], 12, true);
    this.animations.add('jumping', ['sprite38'], 12, true);
    this.animations.add('crouching', ['sprite27','sprite28','sprite29','sprite30','sprite31'], 12, true);
    // Instance variables

}

// Inherit Phaser.Sprite's prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    this.body.velocity.x = 100;
    // this.x = Phaser.Math.linearInterpolation([this.x, 600], 0.005);
}

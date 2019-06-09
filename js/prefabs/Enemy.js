// Enemy prefab


function Enemy(game, posx, posy,nbs) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'twinDark');
    
    this.anchor.setTo(.5,.5);
    this.scale.x = 1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(31,48,11,0);
    this.numButtons = nbs;


    
    // Add Animations
    // Movement Animations
    this.animations.add('moving', [8,9,10,11,12,13,14,15], 12, true);
    this.animations.add('standing', [0,1,2,3], 12, true);
    this.animations.add('jumping', [37], 12, true);
    this.animations.add('crouching', [27,28,29,30], 12, true);
    // Combat Animations
    this.animations.add('stance', [4,5,6,7], 12, true);
    this.animations.add('block', [16,17,18,19], 12, true);
    this.animations.add('swing', [20,21,22,23], 12, false);
    this.animations.add('hurt', [32, 32, 32, 32], 12, false);
    this.animations.add('death', [26, 25, 24, 38], 4, false);
 



}

// Inherit Phaser.Sprite's prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
};




// Minion prefab

function Minion(game, posx, posy, faceLeft) {
    this.faceLeft = faceLeft;
    this.posx = posx;
    this.posy = posy;
    
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, 4000 - posy, 'twinDark');
    

    // Create and display minion
    // var minion = minions.create(pos_x, pos_y, 'twinDark');
    game.physics.enable(this);
    this.body.gravity.y = 300;
    this.tint = 0xff0000;
    
    // Offset minion collision bounds
    // var sizex = 100; var sizey = 200;
    // minion.body.setSize(sizex,sizey, (sizex*-1) - 30, 48-sizey);

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
    this.animations.play('standing');

    // Facing direction
    if (faceLeft) this.scale.x = 1;
    else this.scale.x = -1;

}

// Inherit Phaser.Sprite's prototype
Minion.prototype = Object.create(Phaser.Sprite.prototype);
Minion.prototype.constructor = Minion;

Minion.prototype.update = function () {
    // // Stop player movement
    // this.player.body.acceleration.x = 0;
    // this.player.body.velocity.x = 0;

};
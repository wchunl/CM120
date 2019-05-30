// Child prefab
function Child(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, "twinLight", "sprite1");
    
    // Set the character to face right
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(31,48,11,0); // it depends on the child art

    // Movement Animations (need art)
    this.animations.add('moving', [8,9,10,11,12,13,14,15], 12, true);
    this.animations.add('standing', [0,1,2,3], 12, true);
    this.animations.add('jumping', [37], 12, true);
    this.animations.add('crouching', [27,28,29,30], 12, true);
    // Combat Animations
    this.animations.add('stance', [4,5,6,7], 12, true);
    this.animations.add('block', [16,17,18,19], 12, true);
    this.animations.add('swing', [20,21,22,23], 12, false);
    this.animations.add('hurt', [32, 32, 32, 32], 12, false);

}

// Inherit Phaser.Sprite's prototype
Child.prototype = Object.create(Phaser.Sprite.prototype);
Child.prototype.constructor = Child;

// Child update function
Child.prototype.update = function () {
    // Reset Child velocity
    this.body.velocity.x = 0;
    this.movementManager();
}

// Movement manager
Child.prototype.movementManager = function() {

    // Left/Right movement and crouching/standing
    if (game.input.keyboard.isDown(Phaser.KeyCode.S) && this.body.touching.down) {  // [S] key is down
        this.body.acceleration.x = Phaser.Math.linearInterpolation([this.body.acceleration.x, 0], 0.01);
        this.animations.play('crouching');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.A)) { // [A] key is down
        this.scale.x = 1; // face left
        if (this.body.acceleration.x > -10000) this.body.acceleration.x -= 500; // accelerate
        this.animations.play('moving'); 
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.D)) { // [D] key is down
        this.scale.x = -1; // face right
        if (this.body.acceleration.x < 10000) this.body.acceleration.x += 500; // accelerate
        this.animations.play('moving');
    } else { // Otherwise standing
       this.body.acceleration.x = Phaser.Math.linearInterpolation([this.body.acceleration.x, 0], 0.1);
        // if (this.body.acceleration.x > 0) this.body.acceleration.x -= 1000; // decelerate left
        // else if (this.body.acceleration.x < 0) this.body.acceleration.x += 1000; // decelerate right
        this.animations.play('standing');
    } 
    if (this.body.touching.left || this.body.touching.right) {
        this.body.acceleration.x = 0;
    }    
    // Jumping
    if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.body.touching.down) { 
        this.body.velocity.y = -500;
    }
    // Jumping animation
    if (!this.body.touching.down) {
        this.frame = 37;
    }  
}
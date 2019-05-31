// Child prefab
function Child(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, "child1");
    
    // Set the character to face right
    this.anchor.setTo(.5,.5);
    this.scale.x = 1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(31,48,11,0); // it depends on the child art
    this.jumpAble = true; 

    // Movement Animations (need art)
    this.animations.add('move', [0,6,1,7,12,13,3,9], 12, true);
    this.animations.add('stand', [30,31,32,33,34,35,36,37,38,39], 12, true);
   // this.animations.add('jumping', [37], 12, true);
   // this.animations.add('crouching', [27,28,29,30], 12, true);

}

// Inherit Phaser.Sprite's prototype
Child.prototype = Object.create(Phaser.Sprite.prototype);
Child.prototype.constructor = Child;

// Child update function
Child.prototype.update = function () {
    // Reset Child velocity
    this.body.velocity.x = 0;
    this.body.setSize(31,39,11,10);
    this.movementManager();
}

// Movement manager
Child.prototype.movementManager = function() {

    // Left/Right movement and crouching/standing
    if (game.input.keyboard.isDown(Phaser.KeyCode.S) && this.body.touching.down) {  // [S] key is down
       // this.body.acceleration.x = Phaser.Math.linearInterpolation([this.body.acceleration.x, 0], 0.01);
        this.animations.play('stand');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.A)) { // [A] key is down
        this.scale.x = -1; // face left
        if (this.body.acceleration.x > -10000) this.body.acceleration.x -= 500; // accelerate
        this.animations.play('move'); 
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.D)) { // [D] key is down
        this.scale.x = 1; // face right
        if (this.body.acceleration.x < 10000) this.body.acceleration.x += 500; // accelerate
        this.animations.play('move');
    } else { // Otherwise standing
       this.body.acceleration.x = Phaser.Math.linearInterpolation([this.body.acceleration.x, 0], 0.1);
        // if (this.body.acceleration.x > 0) this.body.acceleration.x -= 1000; // decelerate left
        // else if (this.body.acceleration.x < 0) this.body.acceleration.x += 1000; // decelerate right
        this.animations.play('stand');
    } 
    if (this.body.touching.left || this.body.touching.right) {
        this.body.acceleration.x = 0;
    }    
    // Jumping
    if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.body.touching.down) { 
        // this.body.velocity.y = -500;
        this.body.velocity.y = -650; // debugging
    }
    // Jumping animation
    if (!this.body.touching.down) {
        this.frame = 37;
    }  
}
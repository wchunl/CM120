// Player prefab
function Player(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, "twinLight", "sprite1");
    
    // Set the character to face right
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(31,39,11,10);

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

    // Instance variables
    this.inCombat = false; // currently in combat?
    this.combat; // The current combat object, if any

    // Health
    this.health = 3; // Health variable, 6 = six half hearts (3 full hearts)
    this.h1 = game.add.sprite(10,10, 'health', 0);
    this.h2 = game.add.sprite(50,10, 'health', 0);
    this.h3 = game.add.sprite(90,10, 'health', 0);
    this.h1.fixedToCamera = true;
    this.h2.fixedToCamera = true;
    this.h3.fixedToCamera = true;

}

// Inherit Phaser.Sprite's prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Player update function
Player.prototype.update = function () {
    // Reset player velocity
    this.body.velocity.x = 0;
    this.healthManager();    // Health Manager
    this.combatManager();    // Combat Manager
}

Player.prototype.healthManager = function() {
    // Works assuming lose half a heart to any damage
    switch(this.health) {
        // case 5: this.h3.frame = 2; break; // heart 3 = half heart
        case 2: this.h3.frame = 1; break; // heart 3 = empty heart
        // case 3: this.h2.frame = 2; break; // heart 2 = half heart
        case 1: this.h2.frame = 1; break; // heart 2 = empty heart
        // case 1: this.h1.frame = 2; break; // heart 1 = half heart
        case 0: game.state.start('GameOver', true, false); break; // player is dead
        default: // nothing happens
      }
}

Player.prototype.combatManager = function() {
    
    if (!game.physics.arcade.overlap(this, minions, this.createCombat)) {
        // If not colliding with enemy, the player can move
        this.movementManager();
    }
    
    if (this.inCombat && this.combat.combatOver) {
        console.log('destroying combat');
        this.inCombat = false;
        this.combat.destroy();
    }
}

Player.prototype.createCombat = function(player, enemy) {
    if (!player.inCombat){ // Runs once
        player.combat = new Combat(game, player, enemy, 3);
        game.add.existing(player.combat);
        player.inCombat = true;
    }
}


// Movement manager
Player.prototype.movementManager = function() {

     // Left/Right movement and crouching/standing
    if (game.input.keyboard.isDown(Phaser.KeyCode.S) && this.body.touching.down) {  // [S] key is down
        // if (this.body.acceleration.x > 0) this.body.acceleration.x -= 100; // decelerate left
        // else if (this.body.acceleration.x < 0) this.body.acceleration.x += 100; // decelerate right
        this.body.acceleration.x = Phaser.Math.linearInterpolation([this.body.acceleration.x, 0], 0.01);
        this.animations.play('crouching');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.A)) { // [A] key is down
        this.scale.x = 1; // face left
        if (this.body.acceleration.x > -10000 && currentLevel === 1) this.body.acceleration.x -= 500; // accelerate
        this.animations.play('moving');
        if (this.body.acceleration.x > -15000 && currentLevel > 1) this.body.acceleration.x -= 1000; // adult speed
        this.animations.play('moving');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.D)) { // [D] key is down
        this.scale.x = -1; // face right
        if (this.body.acceleration.x < 10000 && currentLevel === 1) this.body.acceleration.x += 500; // accelerate
        this.animations.play('moving');
        if (this.body.acceleration.x < 15000 && currentLevel > 1) this.body.acceleration.x += 1000; // adult speed
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
    
    // console.log(this.body.acceleration.x);
    
    // Jumping
    if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.body.touching.down && currentLevel === 1) {
        this.body.velocity.y = -500;
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.body.touching.down && currentLevel > 1) {  // adult jump
        this.body.velocity.y = -650;
    }
    
    // Jumping animation
    if (!this.body.touching.down) {
        this.frame = 37;
    }

    
};


    

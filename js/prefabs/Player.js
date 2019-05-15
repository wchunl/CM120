// Player prefab

var count = 0;

function Player(game, posx, posy) {
    count = 0;
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, "twinLight", "sprite1");
    
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;


    // Movement Animations
    this.animations.add('moving', [8,9,10,11,12,13,14,15], 12, true);
    this.animations.add('standing', [0,1,2,3], 12, true);
    this.animations.add('jumping', [37], 12, true);
    this.animations.add('crouching', [27,28,29,30], 12, true);
    // Combat Animations
    this.animations.add('stance', [4,5,6,7], 12, true);
    this.animations.add('block', [16,17,18,19], 12, true);
    this.animations.add('swing', [20,21,22,23], 12, true);
    this.animations.add('hurt', [32], 12, true);

    // Instance variables
    this.combat = false;
    this.combatButtons = new Array(3);
    this.button = null;
    this.enemy = null;
}

// Inherit Phaser.Sprite's prototype
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    // Reset player velocity
    this.body.velocity.x = 0;

    // Collision Manager
    this.collisionManager();
}

Player.prototype.collisionManager = function() {
    if (!game.physics.arcade.overlap(this, minions, this.createCombat)) {
        // If not colliding box player can move
        this.movementManager();
        // Combat set to false;
        this.combat = false;
        count = 0;

        // If enemy is still alive after any combat
        // only run if combat failed
        if (this.enemy != null) {
            // Destroy all combat objects
            this.destroyCombat();
            game.state.start('GameOver', true, false);
        }
    }
}

Player.prototype.destroyCombat = function() {
    for (var i = 0; i < this.combatButtons.length; i++) {
        if(this.combatButtons[i] != null) {
            this.combatButtons[i].destroy()
            this.combatButtons[i] = null;
        }
    }

    this.enemy.destroy();
    this.enemy = null;
}

// Movement Listening
Player.prototype.movementManager = function() {
    // Changes the facing direction
    if (game.input.keyboard.justPressed(Phaser.KeyCode.A))
        this.scale.x = 1;
    if (game.input.keyboard.justPressed(Phaser.KeyCode.D))
        this.scale.x = -1;

    // Left/Right movement and crouching/standing
    if (game.input.keyboard.isDown(Phaser.KeyCode.A)) { 
        if (this.body.acceleration.x > -10000) this.body.acceleration.x -= 500;
        // this.body.velocity.x = -150;
        this.animations.play('moving');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.D)) { 
        if (this.body.acceleration.x < 10000) this.body.acceleration.x += 500;
        // this.body.velocity.x *= this.body.acceleration.x;
        this.animations.play('moving');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.S) && this.body.touching.down) {
        if (this.body.acceleration.x > 0) this.body.acceleration.x -= 100;
        else if (this.body.acceleration.x < 0) this.body.acceleration.x += 100;
        this.animations.play('crouching');
    } else { 
        if (this.body.acceleration.x > 0) this.body.acceleration.x -= 1000;
        else if (this.body.acceleration.x < 0) this.body.acceleration.x += 1000;
        this.animations.play('standing');
    }


    // console.log(this.body.acceleration.x);
    // console.log(this.body.velocitsy.x);


    // Jumping
    if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.body.touching.down) { 
        this.body.velocity.y = -500;
    }

    // Jumping animation
    if (!this.body.touching.down) {
        this.frame = 37;
    }
    
}


Player.prototype.createCombat = function(player, enemy) {
    var numButtons = 3;
    // Run this once at beginning of combat
    if (!player.combat) {
        // Stop player movement
        player.body.acceleration.x = 0;
        for (var i = 0; i < numButtons; i++) {
            var button = new Button(game, 1500, 470);
            game.add.existing(button);
            player.combatButtons[i] = button;
        }
        player.enemy = enemy;
        player.combat = true;
    }
    
    // Quicktime event checking
    if (count < player.combatButtons.length) {
        // Set current active button
        player.combatButtons[count].active = true;
        player.combatButtons[count].moveTowards(player.x - 32, player.y - 100,0.13);
        
        if (player.combatButtons[count].pressed) {
            console.log(count + ' is pressed');
            player.animations.play('swing'); // this doesnt work here, check line 146
            player.combatButtons[count].destroy();
            player.combatButtons[count] = null;
            count++;
        }
    } else if (count == player.combatButtons.length) {
        player.enemy = null;
        enemy.destroy();
    }
    
    // Force player movement
    player.animations.play('stance');
    player.body.velocity.x = 0;
    // player.body.velocity.y = 0;
    // player.body.gravity.y = 0;
    // this.input.disabled = true;

    // Slow motion
    game.time.slowMotion = 1.0;
    // game.paused = true;
    // game.add.text(16,16, 'Debug text', { fontSize: '32px', fill: '#fff' });
}

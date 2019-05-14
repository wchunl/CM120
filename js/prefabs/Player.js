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


    // Add Animations
    this.animations.add('moving', ['sprite9','sprite10','sprite11',
                                'sprite12','sprite13','sprite14',
                                'sprite15','sprite16'], 12, true);
    this.animations.add('standing', ['sprite1','sprite2','sprite3','sprite4'], 12, true);
    this.animations.add('jumping', ['sprite38'], 12, true);
    this.animations.add('crouching', ['sprite27','sprite28','sprite29','sprite30','sprite31'], 12, true);

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
            game.state.start('GameOver');
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
    if (game.input.keyboard.justPressed(Phaser.KeyCode.A))
        this.scale.x = 1;
    if (game.input.keyboard.justPressed(Phaser.KeyCode.D))
        this.scale.x = -1;

    if (!this.body.touching.down)
        this.animations.play('jumping');
    
    
    // Horizontal movement
    if (game.input.keyboard.isDown(Phaser.KeyCode.A)) { 
        this.body.velocity.x = -150;
        this.animations.play('moving');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.D)) { 
        this.body.velocity.x = 150;
        this.animations.play('moving');
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.S) && this.body.touching.down) {
        this.animations.play('crouching');
    } else { 
        this.animations.play('standing');
        // this.frame = 4;
    }

   
}


Player.prototype.createCombat = function(player, enemy) {
    var numButtons = 3;
    // Run this once at beginning of combat
    if (!player.combat) {
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
        player.combatButtons[count].moveTowards(enemy.x - 20, 470,0.13);
        
        if (player.combatButtons[count].pressed) {
            console.log(count + ' is pressed');
            player.combatButtons[count].destroy();
            player.combatButtons[count] = null;
            count++;
        }
    } else if (count == player.combatButtons.length) {
        player.enemy = null;
        enemy.destroy();
    }
    
    // Force player movement
    player.animations.play('right');
    player.body.velocity.x = 100;

    // Slow motion
    game.time.slowMotion = 4.0;
    game.add.text(16,16, 'Debug text', { fontSize: '32px', fill: '#fff' });
}

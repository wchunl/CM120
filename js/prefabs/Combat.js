// Combat prefab
var PLAYER_OFFSET_X = 32; // The x offset of the button relative to the player
var PLAYER_OFFSET_Y = 102; // The y offset of the button relative to the player
var BUTTON_FADE_HEIGHT = 200; // The starting height of the button before fade in
var BUTTON_STEP_SIZE = 0.13; // How fast the button moves and fades in [0 - 1]

function Combat(game, playerObj, minionObj, numButtons) {
    // Variables
    this.player = playerObj;
    this.minion = minionObj;
    this.numButtons = numButtons;
    this.buttons = new Array(numButtons); // Array of all buttons
    this.activeButton; // The current button object the player should see
    this.buttonIdx = 0; // The current index of activeButton in buttons
    this.combatOver = false; // Whether the combat is over or not;
    this.playerAnim; // The current player animation object
    this.minionAnim; // The current minion animation object
    
    // Create an instance of Phaser.Sprite
    // Invisible prefab
    Phaser.Sprite.call(this, game, 0, 0, 'buttons', 'leftOut');
    this.visible = false;
    
    // Generate the buttons
    for (var i = 0; i < numButtons; i++) {
        var button = new Button(game, this.player.x - PLAYER_OFFSET_X,
                                      this.player.y - BUTTON_FADE_HEIGHT);
        // button.alpha = 0; // Make button transparent for now
        game.add.existing(button); // Add button to the game
        this.buttons[i] = button; // Add buttons into array
    }

    // Set active button to first button
    this.activeButton = this.buttons[0];
    this.activeButton.active = true;
    
    // Set player and minion combat animation
    this.playerAnim = this.player.animations.play('stance');
    this.minionAnim = this.minion.animations.play('stance');
}

// Inherit Phaser.Sprite's prototype
Combat.prototype = Object.create(Phaser.Sprite.prototype);
Combat.prototype.constructor = Combat;

Combat.prototype.update = function () {
    if (this.playerAnim.isFinished) this.playerAnim = this.player.animations.play('stance');
    if (this.minionAnim.isFinished) this.minionAnim = this.minion.animations.play('stance');
    // Stop player movement
    this.player.body.acceleration.x = 0;
    this.player.body.velocity.x = 0;

    // Fade and move in the button, make it visible
    this.activeButton.moveTowards(this.player.x - PLAYER_OFFSET_X, 
                                  this.player.y - PLAYER_OFFSET_Y, BUTTON_STEP_SIZE);

    if (this.activeButton.pressed) { // If active button is pressed
        this.playerAnim = this.player.animations.play('swing');
        this.minionAnim = this.minion.animations.play('hurt');
        // this.activeButton.timer.destroy(); this.activeButton.timerBar.destroy();
        this.activeButton.destroy(); // Destroy the active button
        this.nextButton();
    } else if (this.activeButton.wrongPressed) { // If wrong button is pressed
        this.playerAnim = this.player.animations.play('hurt');
        this.minionAnim = this.minion.animations.play('swing');
        // this.activeButton.timer.destroy(); this.activeButton.timerBar.destroy();
        this.activeButton.destroy(); // Destroy the active button
        this.player.health -= 1; // Decrease player health by 1
        console.log(this.player.health);
        this.nextButton();
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) { // [D] key is down
       this.player.animations.play('swing');
    }
};

Combat.prototype.nextButton = function () {
    if (this.buttonIdx < this.numButtons - 1) { // If there are more buttons, set next active buttons
        this.buttonIdx++; // Increment index
        this.activeButton = this.buttons[this.buttonIdx]; // Set new active button
        this.activeButton.visible = true; // Make it visible
        this.activeButton.active = true; // Set it to active
    } else { // If no more buttons left, then combat is over
        // Create a new sprite at the same location to play the death animation
        var deathSprite = new Minion(game, this.minion.x, this.minion.y-5, this.minion.faceLeft);
        this.minion.destroy(); // Destroy the actual minion
        deathSprite.animations.play('death'); // Play the death animation
        game.add.existing(deathSprite); // Add it to the game
        deathSprite.body.gravity = 1; // Set its gravity to 0
        this.combatOver = true; // Combat is over

        // Play death sound
        game.add.audio('death').play();

        // Making sure the last button wont be checked again
        this.activeButton.pressed = false;
        this.activeButton.wrongPressed = false;
    }
};
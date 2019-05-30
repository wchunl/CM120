// Button prefab
timerEnded = function(btn) {
    btn.wrongPressed = true
    game.add.audio('hurt').play();
};

function Button(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'buttons', 'leftOut');

    // Scale change
    this.scale.setTo(0.15,0.15);
    this.alpha = 0;

    // Instance Variables
    this.pressed = false; // Whether the correct key is pressed
    this.wrongPressed = false; // Whether the wrong key is pressed
    this.active = false; // True if this is the active key the player sees 

    // Timer
    this.timer = timer = game.time.create();
    this.timer.loop(5000, timerEnded, this, this);
    this.timerBar = game.add.image(this.x + 35, this.y+60, 'timerbar');
    this.timerBar.anchor.x = 0.5;
    this.timerBar.anchor.y = 0.5;
    this.timerBar.visible = false;
    // this.timerBar.height = 2;

    // Choose a random arrow key
    this.keys = [Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT];
    this.key = this.keys[Math.round(Math.random() * 3)];
    
    // Add Animations
    this.animations.add('left', ['leftOut','leftIn'], 5, true);
    this.animations.add('right', ['rightOut','rightIn'], 5, true);
    this.animations.add('up', ['upOut','upIn'], 5, true);
    this.animations.add('down', ['downOut','downIn'], 5, true);

    // Play Animations
    if (this.key == Phaser.KeyCode.LEFT) this.animations.play('left');
    if (this.key == Phaser.KeyCode.RIGHT) this.animations.play('right');
    if (this.key == Phaser.KeyCode.UP) this.animations.play('up');
    if (this.key == Phaser.KeyCode.DOWN) this.animations.play('down');
}

// Inherit Phaser.Sprite's prototype
Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

// Check if right/wrong key is pressed
Button.prototype.update = function () {
        
    if (this.active) {
        if(!this.timer.running){
            this.timer.start();
            this.timerBar.visible = true;
        }
        this.timerBar.width = (this.timer.duration/10).toFixed(0);
        // console.log((this.timer.duration/20).toFixed(0));

        if (game.input.keyboard.justPressed(this.key)) {// If correct key is pressed
            this.pressed = true; 
            var slashSound = game.add.audio('slash2');
            slashSound.volume = 10; slashSound.play();
            this.timerBar.visible = false;
        } else {
            for (var i = 0; i < this.keys.length; i++) {
                if (this.keys[i] != this.key && game.input.keyboard.justPressed(this.keys[i])) {
                    this.wrongPressed = true; // If wrong key is pressed
                    game.add.audio('hurt').play();
                    this.timerBar.visible = false;
                }
            }
        }
    }
};

Button.prototype.moveTowards = function(posx, posy, stepSize) {
    this.alpha = Phaser.Math.linearInterpolation([this.alpha, 1], stepSize * 1.5);
    this.x = Phaser.Math.linearInterpolation([this.x, posx], stepSize);
    this.y = Phaser.Math.linearInterpolation([this.y, posy], stepSize);
};
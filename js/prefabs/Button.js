var TIMER_TIME = 1000; // The duration of the timer, lower = more difficult

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
    this.startTime;
    this.timerBar = game.add.image(this.x + 38, this.y+60, 'timerbar');
    this.timerBar.anchor.x = 0.5; this.timerBar.anchor.y = 0.5;
    this.timerBar.visible = false;
    this.timerStarted = false;

    this.seed = Math.random() * 1000;

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
    
    // console.log("seed " + this.seed + " button has timer duration: " + this.ctimer.timer.duration);
    if (this.active && !this.timerStarted) {
        this.timerStarted = true;
        this.timerBar.visible = true;
        this.startTime = game.time.now;
        // console.log(game.time.now);
    }
        
    if (this.active) {
        var duration = TIMER_TIME - (game.time.now - this.startTime);
        this.timerBar.width = (duration/10).toFixed(0) * 2;

        if (duration < 0) {
            this.timerBar.destroy();
            this.wrongPressed = true
            game.add.audio('hurt').play();
        }
        
        if (game.input.keyboard.justPressed(this.key)) {// If correct key is pressed
            this.timerBar.destroy();
            this.pressed = true;
            var slashSound = game.add.audio('slash2');
            slashSound.volume = 10; slashSound.play();
            console.log("destroying");
        } else {
            for (var i = 0; i < this.keys.length; i++) {
                if (this.keys[i] != this.key && game.input.keyboard.justPressed(this.keys[i])) {
                    this.timerBar.destroy();
                    this.wrongPressed = true; // If wrong key is pressed
                    game.add.audio('hurt').play();
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
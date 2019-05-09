// Button prefab

function Button(game, posx, posy, amt) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'buttons', 'leftOut');

    // Scale change
    this.scale.setTo(0.15,0.15)

    // Instance Variables
    this.startX = posx;
    this.pressed = false;
    this.active = false;

    // Random Quicktime key
    var keys = [Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT];
    this.key = keys[Math.round(Math.random() * 3)];
    
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
    // this.animations.add('default' , [0,1], 5, true);

}

// Inherit Phaser.Sprite's prototype
Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function () {
    if (this.active && game.input.keyboard.justPressed(this.key)) {
        this.pressed = true;
        // this.destroy();
        // this.kill();
        console.log('pressed!');
    }
}

Button.prototype.moveTowards = function(posx, posy, stepSize) {
    this.x = Phaser.Math.linearInterpolation([this.x, posx], stepSize)
    this.y = Phaser.Math.linearInterpolation([this.y, posy], stepSize)
}
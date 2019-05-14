// GameOver State object
var GameOver = function(game) {};
GameOver.prototype = {
    init: function(score) {
        this.score = score;
    },
    preload: function() {
        console.log('In GameOver');
        // preload
    },
    create: function() {
        // Display Game Over text
        game.add.text(16,16, 'Game Over!', { fontSize: '32px', fill: '#fff' });
        // game.add.text(16,56, 'Final Score: ' + this.score, { fontSize: '32px', fill: '#fff' });
        game.add.text(16,96, 'Press [Space] to Replay', { fontSize: '32px', fill: '#fff' });
    },
    update: function() {
        // Switch states if spacebar is pressed
        var spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        if(spacebar.isDown) {
            game.state.start('Play');
        }
    }
}
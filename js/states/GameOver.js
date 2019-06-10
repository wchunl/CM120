// GameOver State object
var GameOver = function(game) {};
GameOver.prototype = {
    init: function(score) {
        this.score = score;
    },
    preload: function() {
        console.log('In GameOver');
        this.end = null;
        game.load.audio('death', ['death.mp3']);
        game.load.audio('endMusic', ['Game Over Music.mp3']);
        // preload
    },
    create: function() {
        // Display Game Over text
   //     game.add.text(16,16, 'Game Over!', { fontSize: '32px', fill: '#fff' });
    // game.add.text(16,56, 'Final Score: ' + this.score, { fontSize: '32px', fill: '#fff' });
        setTimeout(function(){ game.add.text(330,340, 'Press [Space] to Replay', { font: 'MedievalSharp', fontSize: '32px', fill: '#fff' });}, 4000);
        
        this.audio = game.add.audio('nar3', 1, false);
        this.audio.play();

        this.audio = game.add.audio('endMusic', 1, false);
        this.audio.play();
    },
    update: function() {
        //stop playing all the audio
        game.sound.stopAll();
        // Switch states if spacebar is pressed
        var spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        if(spacebar.isDown) {
            game.state.start('MainMenu');
        }


        //ADD "end"
        this.end = game.add.text(370, 260, "The end", {fill: '#6F4E37'});
        this.end.alpha = 0;
        var tween = game.add.tween(this.end).to( {alpha: 1}, 1000, "Linear", true);
        tween.yoyo(true, 2000);
        this.end.font = 'MedievalSharp';
        this.end.fontSize = 60;
    }
};
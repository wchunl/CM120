// MainMenu State object
var track;

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        // Load Sprites
        game.load.images(['gameBackground','bounds','mm_play','mm_debug'],
        ['gameBackground.png','platform.png','mm_play.png','mm_debug.png']);

        game.load.spritesheet('health', 'health.png', 36, 32, 4);

        // Load Character Atlas
        game.load.atlas('twinLight','twinLight.png','twinLight.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('twinDark','twinDark.png','twinDark.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        // Load Other Atlas
        game.load.atlas('buttons', 'buttons.png', 'buttons.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        // game.load.atlas('birds', 'birds.png', 'birds.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        game.load.path = 'assets/audio/';
        // Load audio
        game.load.audio('MainMenuTheme', ['MainMenuTheme.mp3']);
        
        console.log('Assets loaded');
    },
    create: function() {

        // Enable Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        track = game.add.audio('MainMenuTheme');
        track.play('', 0, 1, false);

        // Display Main Menu Text
        game.add.text(16,16, 'Main Menu', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,56, 'Catch the enemy!', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,96, 'Use [W][A][S][D] Keys to Move', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,136, 'Use [↑][←][↓][→] Keys to fight in combat', { fontSize: '32px', fill: '#fff' });
        
        game.add.button(16,186,'mm_play', playPressed);
        game.add.button(16,246,'mm_debug', debugPressed);
    },
    update: function() {

    }
};

function playPressed() {
    track.pause();
    game.state.start('Play', false, false, false);
}
function debugPressed() {
    track.pause();
    game.state.start('Play', false, false, true)
}
// MainMenu State object
var track;

// Snippet from https://phaser.io/examples/v2/text/google-webfonts
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['MedievalSharp']
    }
};

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Load Sprites
        game.load.images(['gameBackground','bound','platform1','platform2','platform3','mm_play','mm_debug','screenBlack'],
        ['gameBackground.png','bound.png','platform1.png','platform2.png','platform3.png','mm_play.png','mm_debug.png','screenBlack.jpg']);

        game.load.spritesheet('health', 'health.png', 36, 32, 4);

        // Load Character Atlas
        game.load.atlas('twinLight','twinLight.png','twinLight.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('twinDark','twinDark.png','twinDark.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('child1','child1.png','child1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('child2','child2.png','child2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        // Load Other Atlas
        game.load.atlas('buttons', 'buttons.png', 'buttons.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        // game.load.atlas('birds', 'birds.png', 'birds.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        game.load.path = 'assets/audio/';
        // BGM
        game.load.audio('MainMenuTheme' , 'MainMenuTheme.mp3');
        game.load.audio('lvl1_bgm'      , 'part1music.mp3');
        game.load.audio('lvl2_bgm'      , 'part2music.mp3');
        // Narrations
        game.load.audio('nar1', 'nar1.mp3');
        game.load.audio('nar2', 'nar2.mp3');
        game.load.audio('nar3', 'nar3.mp3');
        game.load.audio('nar4', 'nar4.mp3');
        // SoundFX
        game.load.audio('slash1', 'knifeSlash1.mp3');
        game.load.audio('slash2', 'knifeSlash2.mp3');
        game.load.audio('hurt'  , 'hurt.mp3');
        game.load.audio('death' , 'death.mp3');
        game.load.audio('stab'  , 'stab.mp3');
        
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
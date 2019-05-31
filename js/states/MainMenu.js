// MainMenu State object
var track;
var video;
var btn1, btn2, btn3, title, srcBack;

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
        
        game.load.tilemap('test','../maptest.json',null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tileset', '../dirt-tiles.png', 32,32);

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Load Sprites
        game.load.images(['gameBackground','bound','platform1','platform2','platform3','mm_play','mm_debug','mm_sources','screenBlack','timerbar'],
        ['gameBackground.png','bound.png','platform1.png','platform2.png','platform3.png','mm_play.png','mm_debug.png','mm_sources.png','screenBlack.jpg','timerbar.png']);

        game.load.video('menuBGM', 'menuVideo.mp4');

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
        video = game.add.video('menuBGM');
        video.volume = 0.3;
        video.play(true);
        video.addToWorld(-200,0,0,0, 0.95, 1);
        

        // game.add.tileSprite(0,0, 1000, 600, 'mainMenuBG');
        
        // Enable Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        track = game.add.audio('MainMenuTheme');
        track.play('', 0, 1, false);

        // Display Main Menu Text
        title =game.add.text(0,0, 'Twinternal', { fontSize: '64px', fill: '#6F4E37' });
        title.centerX = game.camera.centerX; title.centerY = game.camera.centerY - 200;
        title.alpha = 0;
        title.font = "MedievalSharp";
        game.add.tween(title).to( {alpha: 1}, 3000, "Linear", true);
        
        // game.add.text(16,16, 'Main Menu', { fontSize: '32px', fill: '#fff' });
        // game.add.text(16,56, 'Catch the enemy!', { fontSize: '32px', fill: '#fff' });
        // game.add.text(16,96, 'Use [W][A][S][D] Keys to Move', { fontSize: '32px', fill: '#fff' });
        // game.add.text(16,136, 'Use [↑][←][↓][→] Keys to fight in combat', { fontSize: '32px', fill: '#fff' });
        
        btn1 = game.add.button(-150,416,'mm_play', playPressed); btn1.alpha = 0;
        game.add.tween(btn1).to( {alpha: 1}, 1000, "Linear", true);
        btn2 = game.add.button(-150,476,'mm_debug', debugPressed); btn2.alpha = 0;
        game.add.tween(btn2).to( {alpha: 1}, 1000, "Linear", true);
        btn3 = game.add.button(-150,536,'mm_sources', sourcesPressed); btn3.alpha = 0;
        game.add.tween(btn3).to( {alpha: 1}, 1000, "Linear", true);
        
    },
    update: function() {
        
    }
};

function playPressed() {
    console.log("test");
    video.stop();
    track.pause();
    game.state.start('Play', false, false, false);
}
function debugPressed() {
    video.stop();
    track.pause();
    game.state.start('Play', false, false, true)
}
function sourcesPressed() {
    game.add.tween(title).to( {alpha: 0}, 1000, "Linear", true);
    game.add.tween(btn1).to( {x: -250}, 1000, Phaser.Easing.easeIn, true);
    game.add.tween(btn2).to( {x: -250}, 1000, "Linear", true);
    game.add.tween(btn3).to( {x: -250}, 1000, "Linear", true);
    
    
    var source = game.add.text(20, 10, "Sources", {fontSize: '32px', fill: '#FFF'})
    source.centerX = game.world.width/2;
    source.alpha = 0; source.font = 'MedievalSharp';
    game.add.tween(source).to( {alpha: 1}, 1000, "Linear", true);
    addSource("menu video: https://www.youtube.com/watch?v=4vIQON2fDWM", 1);
    addSource("menu buttons: https://cooltext.com/Edit-Logo?LogoId=3258678199", 2);
    addSource("source 3", 3);
    addSource("source 4", 4);
    addSource("source 5", 5);
}

function addSource(text, line_nr) {
    var source = game.add.text(20, (line_nr * 20) + 40, text, {fontSize: '16px', fill: '#FFF'})
    source.alpha = 0; source.font = 'MedievalSharp';
    game.add.tween(source).to( {alpha: 1}, 1000, "Linear", true);
    
}
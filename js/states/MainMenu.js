// MainMenu State object

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        // Load Sprites
        game.load.images(['sky','bounds','cloud','diamond'],
        ['sky.png','platform.png','cloud.png','diamond.png']);

        game.load.spritesheet('dude','dude.png', 32, 48);
        game.load.spritesheet('baddie','baddie.png', 32, 32);
        game.load.spritesheet('button','button.png', 512, 512);

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

        this.track = game.add.audio('MainMenuTheme');
        this.track.play('', 0, 1, false);
        // Display Main Menu Text
        game.add.text(16,16, 'Main Menu', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,56, 'Dodge the clouds! They speed up every 10 seconds.', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,96, 'Use [W] and [S] Keys to Move Up and Down', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,136, 'Press [Space] to Start', { fontSize: '32px', fill: '#fff' });
    },
    update: function() {
        // Switch states if spacebar is pressed
        var spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        if(spacebar.isDown) {
        	this.track.pause();
            game.state.start('Play');
        }
    }
};
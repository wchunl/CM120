// MainMenu State object

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        // Load Sprites
        game.load.images(['sky','bounds'],
        ['sky.png','platform.png']);

        game.load.spritesheet('health', 'health.png', 36, 32, 3, 0, 2);

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
        game.add.sprite(300,300, 'health', 2);

        // Enable Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.track = game.add.audio('MainMenuTheme');
        this.track.play('', 0, 1, false);

        // Display Main Menu Text
        game.add.text(16,16, 'Main Menu', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,56, 'Catch the enemy!', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,96, 'Use [W][A][S][D] Keys to Move', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,136, 'Use [↑][←][↓][→] Keys to fight in combat', { fontSize: '32px', fill: '#fff' });
        game.add.text(16,176, 'Press [Enter] to Start', { fontSize: '32px', fill: '#fff' });

        // Menu selectors
        this.playText = game.add.text(16, 240, '[Play]', { fontSize: '32px', fill: '#fff' });
        this.debugText = game.add.text(16, 280, 'Debug Play', { fontSize: '32px', fill: '#fff' });

        // Selector vars
        this.selection = 1;
        this.numOptions = 2;
    },
    update: function() {

        // If S or down is pressed and it is currently not the last option,
        // move the current selection down one
        if ((game.input.keyboard.justPressed(Phaser.Keyboard.S)
         || game.input.keyboard.justPressed(Phaser.Keyboard.DOWN))
         && this.selection < this.numOptions)
                this.selection++;

        // If W or up is pressed and it is currently not the first option,
        // move the current selection up one
        if ((game.input.keyboard.justPressed(Phaser.Keyboard.W)
         || game.input.keyboard.justPressed(Phaser.Keyboard.UP))
         && this.selection > 1)
                this.selection--;

        // Display selection text based on whether or not they are selected currently
        if (this.selection == 1) this.playText.text = '[Play]'; else this.playText.text = ' Play '
        if (this.selection == 2) this.debugText.text = '[Debug]'; else this.debugText.text = ' Debug '


        // Switch states if enter is pressed
        if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
            // Pause menu music
            this.track.pause();

            // If 2 is selected, run in debug mode showing collisions
            if (this.selection == 2) game.state.start('Play', false, false, true);
            // Else run normally
            else game.state.start('Play', false, false, false);
        }
    }
};
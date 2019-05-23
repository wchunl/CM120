// Play State object
var level = 1;
var tween;
var Play = function(game) {
    // Variables that need forward declaration
    this.debug;
};
Play.prototype = {
    init: function(debug) {
        this.debug = debug;
    },
    preload: function() {
        console.log('In Play');
        game.world.setBounds(0,0,3000,3000);
    },
    create: function() {
        // Create and display background sky
        this.sky = game.add.tileSprite(0,0, 6000, 4000, 'gameBackground');
        // Create and display platform
        platforms = game.add.group();
        platforms.enableBody = true;
        createLevel();
        
        // Create and display the player
        this.player = new Player(game, 0, 600 - 96);
        game.add.existing(this.player);
        //Create the twin brother
        this.enemy = new Enemy(game, 200, 600 -96);
        game.add.existing(this.enemy);
        
        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;
        minions.add(new Minion(game, 531, 100, false));
        minions.add(new Minion(game, 168, 490, true));
        
        
        game.camera.follow(this.player, 'FOLLOW_LOCKON', 0.1, 0.1);
        // Create and display enemy
        // this.enemy = new Enemy(game, 100, 400, 'dude');
        // this.enemy.alpha = 0;
        // game.add.existing(this.enemy);
        
        

    }, 
    update: function() {
        // End of level check
        if (this.player.x < 60 && this.player.y < 160) {
            game.state.start('GameOver');
        }

        // Collision check between platforms and characters
        game.physics.arcade.collide(platforms, [this.player, minions, this.enemy]);
        
        // Debug mode
        if (this.debug) {
            // Write mouse pointer current position when pressed
            if (game.input.activePointer.justPressed())
                console.log('Mouse position: ' + game.input.mousePointer.x + ',' + game.input.mousePointer.y);
            
        }
    },
    render: function() {
        // Show collisions if debug is on
        if (this.debug) {
            game.debug.body(this.player);
            game.debug.body(this.enemy);
            //i put this here just for getting exact position of the player
            game.debug.spriteInfo(this.player, 32, 32);
            game.debug.spriteInfo(this.enemy, 700, 32);
            minions.forEach( game.debug.body, game.debug);
        }
    }
};

// Helper functions
function createPlatform (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, game.height - pos_y, 'bounds');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

function createLevel() {
    console.log('Creating Level...');

    const n = 32;
    createPlatform(0, 2*n, 4, 2);
    createPlatform(0,14*n, 0.5, 10);

    createPlatform(10*n,3*n, 0.1, 1);
    createPlatform(13*n,5*n, 0.1, 3);
    createPlatform(16*n,7*n, 0.1, 3);
    createPlatform(19*n,9*n, 0.1, 5);
    createPlatform(22*n,9*n, 0.1, 7);

    createPlatform(26*n,14*n, 0.3, 3);

    createPlatform(26*n,8*n, 0.3, 3);
    createPlatform(26*n,14*n, 0.3, 3);

    createPlatform(31*n,5*n, 0.1, 1);
    createPlatform(31*n,11*n, 0.1, 1);

    createPlatform(20*n,15*n, 0.4, 1);

    createPlatform(16*n,14*n, 0.1, 1);
    createPlatform(11*n,15*n, 0.1, 1);
    createPlatform(5*n,14*n, 0.2, 1);
    
    // Added these to make tutorial level easier
    // that last jump was kinda diffcult
    createPlatform(17*n,14*n, 0.1, 1);
    createPlatform(15*n,14*n, 0.1, 1);
    createPlatform(12*n,15*n, 0.1, 1);
    createPlatform(12*n,15*n, 0.1, 1);
    createPlatform(10*n,15*n, 0.1, 1);
    createPlatform(9*n,15*n, 0.1, 1);
    createPlatform(8*n,15*n, 0.1, 1);
    console.log('Level Created!');
}
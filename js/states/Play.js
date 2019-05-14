// Play State object
var level = 1;

var Play = function(game) {
    // Variables that need forward declaration
    this.player, this.sky, this.enemy;
    this.debug = false;
};
Play.prototype = {
    init: function(debug) {
        this.debug = debug;
    },
    preload: function() {
        console.log('In Play');
    },
    create: function() {
        // Add background sky
        this.sky = game.add.tileSprite(0,0, 1000,600, 'sky');

        
        // Create and display the player
        this.player = new Player(game, 32, game.world.height - 96);
        game.add.existing(this.player);
        
        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;
        createMinion(350, 150, true);
        createMinion(700, 150, true);
        
        
        // Create and display enemy
        this.enemy = new Enemy(game, 100, 400, 'dude');
        game.add.existing(this.enemy);

        
        // Create and display platform
        platforms = game.add.group();
        platforms.enableBody = true;
        createLevel();

    },
    update: function() {
        // Reset time
        game.time.slowMotion = 1.0;

        // Collision check between platforms and characters
        game.physics.arcade.collide(platforms, [this.player, minions, this.enemy]);

        
        // Player Jumps if touching ground
        if (game.input.keyboard.isDown(Phaser.KeyCode.W) && this.player.body.touching.down) { 
            this.player.body.velocity.y = -500;
        }
        

        // Debug mode
        if (this.debug){
            // Write mouse pointer current position when pressed
            if (game.input.activePointer.justPressed())
                console.log('Mouse position: ' + game.input.mousePointer.x + ',' + game.input.mousePointer.y);
            
        }
    },
    render: function() {
        // Show collisions if debug is on
        if (this.debug) {
            game.debug.body(this.player);
            minions.forEach( game.debug.body, game.debug);
        }
    }
};

// Helper functions


function createMinion(pos_x, pos_y, faceLeft) {
    // Create and display minion
    var minion = minions.create(pos_x, pos_y, 'twinDark');
    minion.body.gravity.y = 300;
    minion.tint = 0xff0000;
    // Offset minion collision bounds
    // var sizex = 100; var sizey = 200;
    // minion.body.setSize(sizex,sizey, (sizex*-1) - 30, 48-sizey);

    // Minion animations
    minion.animations.add('standing', [0, 1, 2, 3], 10, true);
    if (faceLeft) minion.animations.play('standing');
    else minion.animations.play('right');
}

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

    console.log('Level Created!');
}
// Play State object
var level = 1;
var tween;
var Play = function(game) {
    // Variables that need forward declaration
    this.placeholder = false;
    this.enemy;
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

        this.sky.setScrol

        
        // Create and display the player
        this.player = new Player(game, 32, game.world.height - 96);
        game.add.existing(this.player);
        
        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;
        createMinion(100, 100, false);
        createMinion(890, 300, true);
        
        
        // Create and display enemy
        this.enemy = new Enemy(game, 100, 400, 'dude');
        this.enemy.alpha = 0;
        game.add.existing(this.enemy);

        
        // Create and display platform
        platforms = game.add.group();
        platforms.enableBody = true;
        createLevel();

        // Learning about tweens, should be rewritten
        var txt1 = game.add.text(25, 550, "Walk up to an enemy to fight them!", {fontSize: '32px', fill:'fff'});
        txt1.alpha = 0;
        tween = game.add.tween(txt1).to( { alpha: 1 }, 2000);
        tween.start();
    }, 
    update: function() {

        // Placeholder tween stuff
        tween.onComplete.add(tweenComplete, this);
        if (this.player.combat && !this.placeholder) {
            var txt1 = game.add.text(25, 550, "Press the indicated arrow key to fight!", {fontSize: '32px', fill:'fff'});
            txt1.alpha = 0;
            tween = game.add.tween(txt1).to( { alpha: 1 }, 2000);
            tween.start();
            txt1.alpha = 0;
            this.placeholder = true;
        } else if (!this.player.combat) {
            this.placeholder = false;
        }

        if (this.player.x < 60 && this.player.y < 160) {
            game.state.start('GameOver');
        }

        // Reset time
        game.time.slowMotion = 1.0;

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
            minions.forEach( game.debug.body, game.debug);
        }
    }
};


// Events

// Learning about tweens, should be rewritten
function tweenComplete(txt, tween) {
    console.log(txt);
    var ntween = game.add.tween(txt).to( { alpha: 0 }, 2000);
    ntween.start();
    tween.stop();
}

// Helper functions

/* 
    createMinion() - Creates and displays a red minion
        pox_x       : the x position it should spawn at
        pos_y       : the y position it should spawn at
        faceLeft    : boolean to determine if facing left or not
*/
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
    minion.animations.play('standing');

    // Facing direction
    if (faceLeft) minion.scale.x = 1;
    else minion.scale.x = -1;
}

/* 
    createPlatform() - Creates and displays a red minion
        pox_x       : the x position it should spawn at
        pos_y       : the y position it should spawn at
        scale_x     : the width of the platform
        scale_y     : the height of the platform
*/
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
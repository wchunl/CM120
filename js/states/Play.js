// Play State object
var level = 1;

var Play = function(game) {
    // this.score, this.numStars, this.player;
    this.player, this.sky, this.enemy;
};
Play.prototype = {
    preload: function() {
        console.log('In Play');
    },
    create: function() {
        // Add background sky
        this.sky = game.add.tileSprite(0,0, 1000,600, 'sky');

        
        // Create and display the player
        this.player = new Player(game, 32, game.world.height - 96, 'dude');
        game.add.existing(this.player);
        
        // Baddie Quicktime Module
        baddies = game.add.group();
        baddies.enableBody = true;
        for(var i = 1; i <= 2; i++) {
            // Create and display baddie
            var baddie = baddies.create(350 * i, 150, 'baddie');
            baddie.body.gravity.y = 300;
            // Offset baddie collision bounds
            var sizex = 100; var sizey = 100;
            baddie.body.setSize(sizex,sizey, (sizex*-1) - 30, 32-sizey);
            // Baddie animations
            baddie.animations.add('left', [0, 1], 10, true);
            baddie.animations.play('left');
        }
        
        
        // Create and display autopath enemy
        this.enemy = new Enemy(game, 100, 400, 'dude');
        game.add.existing(this.enemy);

        
        // Create and display platform bounds
        platforms = game.add.group();
        platforms.enableBody = true;
        
        // Ground
        createLevel();

    },
    update: function() {
        if (game.input.activePointer.justPressed()) {
        console.log('Mouse position: ' + game.input.mousePointer.x + ',' + game.input.mousePointer.y);
        }

        game.time.slowMotion = 1.0;
        game.physics.arcade.collide(platforms, [this.player, baddies, this.enemy]);

        

    },
    render: function() {
        // game.debug.body(this.player);
        // game.debug.body(this.baddie);
    }
};

// function createBaddie (posx, posy, left) {
//     // Display baddie at given position
//     var baddie = baddies.create(posx, posy, 'baddie');
    
//     // Enable physics
//     game.physics.arcade.enable(baddie);

//     if (left) baddie.animations.play('left');
//     else baddie.animations.play('right');
// }

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
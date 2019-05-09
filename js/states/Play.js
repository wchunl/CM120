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
        this.player = new Player(game, 32, game.world.height/2, 'dude');
        game.add.existing(this.player);
        
        // Baddie Quicktime Module
        baddies = game.add.group();
        baddies.enableBody = true;
        for(var i = 1; i <= 2; i++) {
            // Create and display baddie
            var baddie = baddies.create(400 * i, 350, 'baddie');
            baddie.body.gravity.y = 300;
            // Offset baddie collision bounds
            var sizex = 100; var sizey = 100;
            baddie.body.setSize(sizex,sizey, (sizex*-1) - 30, 32-sizey)
            // Baddie animations
            baddie.animations.add('left', [0, 1], 10, true);
            baddie.animations.play('left');
        }
        
        
        // Create and display autopath enemy
        this.enemy = new Enemy(game, 100, 400, 'dude')
        game.add.existing(this.enemy);

        
        // Create and display platform bounds
        platforms = game.add.group();
        platforms.enableBody = true;
        
        // Ground
        createPlatform(0, 440, 2.5, 0.5);

        createPlatform(250,350, 0.5, 0.5);




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
}

function createPlatform (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, pos_y, 'bounds');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

// function createBaddie (posx, posy, left) {
//     // Display baddie at given position
//     var baddie = baddies.create(posx, posy, 'baddie');
    
//     // Enable physics
//     game.physics.arcade.enable(baddie);

//     if (left) baddie.animations.play('left');
//     else baddie.animations.play('right');
// }

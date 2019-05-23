// Play State object
var tween;
let level1 = false;
let level2 = false;
let level3 = false;

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
        game.world.setBounds(0,0,6000,4000);
    },
    create: function() {
        // Create and display background sky
        this.sky = game.add.tileSprite(0,0, 6000, 4000, 'gameBackground');
        // Create and display platform
        platforms = game.add.group();
        platforms.enableBody = true;

        // start level 1
        createLevel(1);
        level1 = true;

        // Create and display the player
        this.player = new Player(game, 0, 4000 - 96);
        game.add.existing(this.player);
        //Create the twin brother
        this.enemy = new Enemy(game, 200, 4000 - 96);
        game.add.existing(this.enemy);
        
        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;
        
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

        // end level 1 & start level 2
        if (level1 === true && this.player.x < 32 * 6 && this.player.y < 4000 - 32 * 14) {
            console.log('Level 1 Completed!');

            createLevel(2);
            level1 = false;
            level2 = true;
        }

        // end level 2 & start level 3
        if (level2 === true && this.player.x === 6000 && this.player.y === 4000) {  //change condition later
            console.log('Level 2 Completed!');

            createLevel(2);
            level2 = false;
            level3 = true;
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
function createBound (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, 4000 - pos_y, 'bound');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

function createPlatform1 (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, 4000 - pos_y, 'platform1');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

function createPlatform2 (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, 4000 - pos_y, 'platform2');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

function createPlatform3 (pos_x, pos_y, scale_x, scale_y) {
    var platform = platforms.create(pos_x, 4000 - pos_y, 'platform2');
    platform.body.immovable = true;
    platform.scale.setTo(scale_x, scale_y);
}

function createLevel(level) {
    const n = 32;
    const left = true;
    const right = false;

    if (level === 1) {
        console.log('Creating Level 1...');

        // bounds
        createBound(0, 4000, 1, 105);  // left
        createBound(0, 2*n, 200, 10);    // bottom
        createBound(32*n,30*n, 20, 30);    // right
        createBound(7*n, 30*n, 25, 10);    // top

        // 1#
        createPlatform1(10*n,3*n, 1, 1);
        createPlatform1(13*n,5*n, 1, 3);
        createPlatform1(16*n,7*n, 1, 3);
        createPlatform1(19*n,9*n, 1, 5);
        createPlatform1(22*n,9*n, 1, 7);

        // 2#
        createPlatform1(26*n,8*n, 3, 3);
        createPlatform1(26*n,14*n, 3, 3);
        createPlatform1(31*n,5*n, 1, 1);
        createPlatform1(31*n,11*n, 1, 1);
        createPlatform1(31*n,17*n, 1, 1);

        // 3#
        createPlatform1(20*n,15*n, 4, 1);
        createPlatform1(15*n,14*n, 3, 1);
        createPlatform1(10*n,15*n, 3, 1);
        createPlatform1(5*n,14*n, 2, 1);
        createPlatform1(0,14*n, 5, 10);

        console.log('Level 1 Created!');
    }

    if (level === 2) {
        console.log('Creating Level 2...');

        // bounds
        //createBound();

        //minions.add(new Minion(game, 531, 3500, right));

        // 0#
        createBound(7*n, 20*n, 1, 7);
        createBound(0, 20*n, 1, 6);

        // 1#
        createPlatform2();

        console.log('Level 2 Created!');
    }

    if (level === 3) {
        console.log('Creating Level 3...');

        // bounds
        //createBound();

        // 1#
        createPlatform3();

        console.log('Level 3 Created!');
    }
}
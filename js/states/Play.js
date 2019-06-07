// Play State object
var tween;
var currentLevel = 0;
// var tutorial2 = false;

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
        this.title = null;
        this.end = false;
        this.tutorial = "tut1";
        this.pointer = "tut1";
        this.playerPtr = null;
        this.soundQueue = 0;
        // this.tutimg;
        this.bgm;
        this.nar;
    },
    create: function() {
        // The UI reserved for the highest level, draws over every other sprite
        topUI = game.add.group();

        // Create and display background sky
        this.sky = game.add.tileSprite(0,0, 6000, 4000, 'gameBackground');
        // Create and display platform
        platforms = game.add.group();
        platforms.enableBody = true;

        // elevator
        this.elevator = platforms.create (32, 4000 - 14*32, 'platform2');
        this.elevator.body.immovable = true;
        this.elevator.scale.setTo(6, 1);
        this.elevator.body.allowGravity = false;
        this.elevator.body.velocity.y = 0;

        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;

        // Create and display tilemap
        this.map = game.add.tilemap('test');
        this.map.addTilesetImage('test', 'tileset')
        this.mapLayer = this.map.createLayer('Tile Layer 1');
        this.mapLayer.resizeWorld();
        this.map.setCollisionByExclusion([], true);

        currentLevel = 1;

        // Create and display minions
        minions = game.add.group();
        minions.enableBody = true;

        // Create child
        this.child = new Child(game, 150, 4000 - 96);
        game.add.existing(this.child);

        // Create the twin brother
        this.enemyy = new Enemyy(game, 200, 4000 - 96);
        game.add.existing(this.enemyy);

        // Lock camera on child
        game.camera.x = 0; game.camera.y = 4000;
        game.camera.follow(this.child, 'FOLLOW_LOCKON', 0.1, 0.1);

        game.add.image(0, 2200, "screenBlack");
        game.add.image(0, 1800, "screenBlack");

        tutorialOne();
    },
    update: function() {
        soundManager(this); // BGM and narration manager
        tweenManager(this); // Tutorial texts manager

        // End of level check
        if (this.child.x < 60 && this.child.y < 160) {
            game.state.start('GameOver');
        }



        // Collision check between platforms, tilemaps and characters
        game.physics.arcade.collide([this.child, minions, this.player], [this.mapLayer, platforms]);
        game.physics.arcade.collide(this.enemyy, this.mapLayer);


        // end level 1 & start level 2
        if (currentLevel === 1 && this.child.x < 32 * 4 && this.child.y < 4000 - 32 * 14) {
            console.log('Level 1 Completed!');
            this.child.jumpAble = false;
            // createLevel(2);
            this.elevator.body.velocity.y = -200;
            currentLevel = 2;

            var n = 32;
            minions.add(new Minion(game, 450, 1200, true)); // ledge 1
            minions.add(new Minion(game, 620, 1000, true)); // ledge 2
            minions.add(new Minion(game, 780, 890, true)); // ledge 3

            var platform = platforms.create(0, 3300, 'platform1');
            platform.body.immovable = true;
            platform.scale.setTo(1, 10);
            var platform2 = platforms.create(224, 3300, 'platform1');
            platform2.body.immovable = true;
            platform2.scale.setTo(1, 9);


        }

        // elevator smooth stop
        if (this.child.y < 2200) {
            this.elevator.body.velocity.y = -200;
        }
        if(this.elevator.y < 1900 && this.elevator.y > 1898){
           //change character
           this.player = new Player(game, this.child.x, this.child.y - 10);
           this.child.destroy();
           game.add.existing(this.player);
           game.camera.follow(this.player,0.1, 0.1);
           game.add.image(0, 1800, "screenBlack");
           tutorialTwo();

        }

        if (this.elevator.y <= 4256 - 32*80) {
            this.elevator.body.velocity.y = -128;
            if (this.elevator.y <= 4128 - 32*80) {
                this.elevator.body.velocity.y = -64;
                if (this.elevator.y <= 4064 - 32*80) {
                    this.elevator.body.velocity.y = -32;
                    if (this.elevator.y <= 4000 - 32*80) {
                        this.elevator.body.velocity.y = 0;
                    }
                }
            }
        }

        if (this.soundQueue == 1 && this.child.y < 2200 && this.nar.isPlaying) {
            console.log("waiting for sound to stop first");
            this.elevator.body.velocity.y = 0;
        }

    },
    render: function() {
        // Show collisions if debug is on
        if (this.debug) {
            if (this.player != undefined) game.debug.body(this.player);
            if (this.player != undefined) game.debug.spriteInfo(this.player, 700, 32);
            if (this.enemyy != undefined) game.debug.body(this.enemyy);
            // if (this.child != undefined) game.debug.spriteInfo(this.child, 500, 32);
            if (this.enemyy != undefined) game.debug.spriteInfo(this.enemyy, 32, 32);
            // game.debug.spriteInfo(this.child, 700, 32);
            minions.forEach( game.debug.body, game.debug);
        }
    }
};

function tutorialOne() {
    var tutimg = game.add.image(340, 0, "tut1");
    tutimg.alpha = 0;
    tutimg.fixedToCamera = true;
    tutimg.scale.setTo(0.75,0.75);
    var tuttween = game.add.tween(tutimg).to( {alpha: 1}, 1000, "Linear", true, 1000);
    tuttween.yoyo(true, 10000);
}

function tutorialTwo() {
    var tutimg = game.add.image(340, 0, "tut2");
    tutimg.alpha = 0;
    tutimg.fixedToCamera = true;
    tutimg.scale.setTo(0.75,0.75);
    var tuttween = game.add.tween(tutimg).to( {alpha: 1}, 1000, "Linear", true, 1000);
    tuttween.yoyo(true, 10000);
}


// Helper functions
function tweenManager(main) {
    // Display title on elevator
    if (main.child.y < 3000) {
        if (main.title == null) {
            main.title = game.add.text(main.child.x + 250, main.child.y-10, "Twinternal", {fill: '#6F4E37'});
            main.title.alpha = 0;
            var tween = game.add.tween(main.title).to( {alpha: 1}, 1000, "Linear", true);
            tween.yoyo(true, 2000);
            // tween.onComplete.add(doSomething, this);function doSomething (){console.log("hello world");}
        }
        main.title.font = 'MedievalSharp';
        main.title.fontSize = 60;
        main.title.y = main.child.y-10;
    }

    // Elevator end
    if (main.child.y < 1800) {
        main.child.jumpAble = true;
    }

    //test for end of game
    if (main.child.x >200 && main.end ==false){
        game.camera.fade('#000000');
        main.bgm.stop();
        main.nar.stop();
        main.end = true;
        setTimeout(function(){ game.state.start('GameOver'); }, 2000);
    }
}

function soundManager(main) {

    if (main.soundQueue == 0) {
        main.soundQueue = 1;
        main.bgm = game.add.audio("lvl1_bgm", 1, false);
        main.nar = game.add.audio("nar1", 1, false);
        main.bgm.play();
        main.nar.play();
    }

    // console.log(main.currentLevel);

    if (main.soundQueue == 1 && !main.bgm.isPlaying
        && !main.nar.isPlaying && currentLevel == 2
        && main.child.y < 2200) {
            main.soundQueue = 2;
            main.bgm = game.add.audio("lvl2_bgm", 0.25, true);
            main.nar = game.add.audio("nar2", 3, false);
            main.bgm.play();
            main.nar.play();
    }
}

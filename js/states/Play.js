// Play State object
var tween;
let currentLevel;

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
        this.tutorial = "tut1";
        this.pointer = "tut1";
        this.soundQueue = 0;
        this.bgm;
        this.nar;
    },
    create: function() {
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
        
        // start level 1
        createLevel(1);
        currentLevel = 1;
        
        // Create and display the player
      //  if (this.debug) 
        this.child = new Child(game, 60, 3528); // test only
       // else this.player = new Player(game, 0, 4000 - 96);
        game.add.existing(this.child);

       //  this.player = new Player(game, 9, 4000-96); // test only
       // // else this.player = new Player(game, 0, 4000 - 96);
       //  game.add.existing(this.player);
        //Create the twin brother 
        this.enemyy = new Enemyy(game, 200, 4000 - 96);
        game.add.existing(this.enemyy);
        
       //this.child = new Child(game,20,4000-96);


        game.camera.x = 0; game.camera.y = 4000;
        game.camera.follow(this.child, 'FOLLOW_LOCKON', 0.1, 0.1);
        // Create and display enemy
        // this.enemy = new Enemy(game, 100, 400, 'dude');
        // this.enemy.alpha = 0;
        // game.add.existing(this.enemy);
        
        game.add.image(0, 2200, "screenBlack");
        game.add.image(0, 1800, "screenBlack");
    }, 
    update: function() {
        soundManager(this); // BGM and narration manager
        tweenManager(this); // Tutorial texts manager

        // End of level check
        if (this.child.x < 60 && this.child.y < 160) {
            game.state.start('GameOver');
        }

        // Collision check between platforms and characters
        game.physics.arcade.collide(platforms, [this.player, minions, this.enemyy]);
        game.physics.arcade.collide(platforms, [this.child, minions, this.enemyy]);
        
        // Debug mode
        if (this.debug) {
            // Write mouse pointer current position when pressed
            if (game.input.activePointer.justPressed())
                console.log('Mouse position: ' + game.input.mousePointer.x + ',' + game.input.mousePointer.y);
            
        }

        // end level 1 & start level 2
        if (currentLevel === 1 && this.child.x < 32 * 4 && this.child.y < 4000 - 32 * 14) {
            console.log('Level 1 Completed!');
           // this.player.moveable = false;
            createLevel(2);
            this.elevator.body.velocity.y = -200;
            currentLevel = 2;
        }
        

        // this.elevator.body.velocity.y = Phaser.Math.linearInterpolation([this.elevator.body.velocity.y, 0] , 0.001);
        // if (this.elevator.y < 4000) {
        //     console.log("running this??");
        //     this.elevator.body.velocity.y = -200;
        // }
        // elevator smooth stop
        if (this.child.y < 2200) {
            this.elevator.body.velocity.y = -200;
        }
        //console.log(this.elevator.y);
        //change character
        if(this.elevator.y < 1900 && this.elevator.y > 1898){
           this.child.destroy();
           this.player = new Player(game, 90, 900); // test only
           game.add.existing(this.player);
           game.camera.follow(this.player,0.1, 0.1);
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
            console.log("still on");
            this.elevator.body.velocity.y = 0;
        } 

        // end level 2 & start level 3
        // if (currentLevel === 2 && this.player.x === 6000 && this.player.y === 4000) {  //change condition later
        //     console.log('Level 2 Completed!');
        //     createLevel(3);
        //     currentLevel = 3;
        // }
    },
    render: function() {
        // Show collisions if debug is on
        if (this.debug) {
         //   game.debug.body(this.player);
            game.debug.body(this.enemyy);
            game.debug.body(this.child);
            //i put this here just for getting exact position of the player
           // game.debug.spriteInfo(this.player, 32, 32);
             // game.debug.spriteInfo(this.child,100, 32);
            game.debug.spriteInfo(this.enemyy, 700, 32);
            minions.forEach( game.debug.body, game.debug);
        }
    }
};

// Helper functions
function tweenManager(main) {
    // var pointer = null;
    // Display tutorial text for movement
    if (main.tutorial == "tut1") {
        main.tutorial = game.add.text(main.child.x, main.child.y, "Use [W][A][S][D] keys to move around!", {fontSize: '16px', fill: '#fff'});
        main.tutorial.alpha = 0;
        var tween = game.add.tween(main.tutorial).to( {alpha: 1}, 1000, "Linear", true, 1000);
        tween.yoyo(true, 5000);
        tween.onComplete.add(finished, this);function finished(){
            main.tutorial = game.add.text(main.child.x, main.child.y, "Try to catch your twin brother Calvin!", {fontSize: '16px', fill: '#fff'});
            main.tutorial.alpha = 0;
            var tween2 = game.add.tween(main.tutorial).to( {alpha: 1}, 1000, "Linear", true);
            tween2.yoyo(true, 5000);
            tween2.onComplete.add(finished, this);function finished(){main.tutorial = "tut2";}

            // Pointer
            if (main.pointer == "tut1") {
                main.pointer = game.add.text(main.enemyy.x, main.enemyy.y, "↓", {fontSize: '64px', fill: '#0f0'});
                main.pointer.alpha = 0;
                var tweenptr = game.add.tween(main.pointer).to( {alpha: 1}, 100, "Linear", true, 0, 15);
                tweenptr.yoyo(true, 100);
            }
        }
    }
    
    main.tutorial.centerX = Phaser.Math.linearInterpolation([main.tutorial.centerX, main.child.x], 0.2);
    main.tutorial.centerY = Phaser.Math.linearInterpolation([main.tutorial.centerY, main.child.y - 50], 0.5);
    if (main.pointer != "tut1") {
        main.pointer.centerX = main.enemyy.x;
        main.pointer.centerY = main.enemyy.y - 70;
    }
    // main.tutorial.centerY = main.child.y - 50;
    if (main.tutorial.x < 0) main.tutorial.x = 0;
    // main.tutorial.y = main.child.y + 40;

    // Display title on elevator
    if (main.child.y < 3000) {
        if (main.title == null) {
            main.title = game.add.text(main.child.x + 200, main.child.y-10, "Twinternal", {fill: '#fff'});
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
    if (main.child.y < 1800) {                      //here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        main.child.moveable = true;
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
    
    if (main.soundQueue == 1 && !main.bgm.isPlaying && !main.nar.isPlaying) {
        main.soundQueue = 2;
        main.bgm = game.add.audio("lvl2_bgm", 0.5, true);
        main.nar = game.add.audio("nar2", 4, false);
        main.bgm.play(); 
        main.nar.play();
    }

}



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
        createBound(7*n, 80*n, 25, 60);    // top

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
       // createPlatform1(31*n,17*n, 1, 1);

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
        createBound(7*n, 20*n, 1, 7);   // right
        createBound(0, 20*n, 1, 6); // left

        // elevator masking
        createBound(0,14*n, 7, 1);
        createPlatform2(7*n, 80*n, 25, 1);

        // 1#
        createPlatform2(12*n, 84*n, 25, 1);
        createPlatform2(15*n, 83*n, 22, 3);
        minions.add(new Minion(game, 14*n, 86*n, left));

        // 2#
        createPlatform2(17*n, 89*n, 25, 1);
        createPlatform2(21*n, 88*n, 21, 4);
        minions.add(new Minion(game, 19*n, 91*n, left));

        // 3#
        createPlatform2(22*n, 95*n, 83, 1);
        createPlatform2(26*n, 94*n, 20, 5);
        minions.add(new Minion(game, 24*n, 97*n, left));

        // 4#
        minions.add(new Minion(game, 90*n, 97*n, left));
        minions.add(new Minion(game, 104*n, 97*n, left)); // temporary sub. for twin brother
        // create twin brother at (x,y) = (74*n, 97*n)

        // bounds
        createBound(90*n, 94*n, 15, 95);    // left
        createBound(115*n, 120*n, 15, 115);  // right

        console.log('Level 2 Created!');
    }

    if (level === 3) {
        console.log('Creating Level 3...');

        // bounds
        createBound(3840, 0, 10, 150);   // right

        // 1#
        createPlatform3();

        console.log('Level 3 Created!');
    }
}

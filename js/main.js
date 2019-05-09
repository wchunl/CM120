/*
    Technical Tilt: I learned in class that collision checks
    between objects can be very expensive the more objects
    there are on the screen. In my game, I used a simple
    variation of the broad sweep method mentioned in lecture
    that checks only collisions between the nearest obstacle
    to the player instead of all the obstacles at the same time.
    I reduced collision checks from O(n) checks to O(1) checks
    per frame in my game, where n is the number of clouds.
    - Found in states/Play.js line 81-88

    Aesthetic Tilt: I messed around with emitters and learned
    how to use them via the Phaser API documentation online
    and created a particle explosion of diamonds on the player
    everytime a new level is reached.
    - Found in states/Play.js line 58-60
*/

// Main.js

// Define game
var game = new Phaser.Game(1000, 600, Phaser.AUTO);

// Add states to StateManager
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);

// Start MainMenu state
game.state.start('MainMenu', true, false, game);
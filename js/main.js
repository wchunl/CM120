/*
    Git repo - https://github.com/wchunl/CM120
    Team Name - The Kimtastics
    Team Members - 
        Atirath Kosireddy
        Wai Chun Leung 
        Jason Mamesah
        Shineng Tang
*/

// Main.js

// Define game
var game = new Phaser.Game(6000, 4000, Phaser.AUTO);

// Add states to StateManager
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);

// Start MainMenu state
game.state.start('MainMenu', true, false, game);
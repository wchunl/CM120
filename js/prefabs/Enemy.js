// Enemy prefab


function Enemy(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'twinDark');
    
    this.anchor.setTo(.5,.5);
    this.scale.x *= -1;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(31,48,11,0);
    this.turned = false;
    this.air = false;
    this.end = false;


    // this.tint = 0xff0000;
    
    // Add Animations
    // Movement Animations
    this.animations.add('moving', [8,9,10,11,12,13,14,15], 12, true);
    this.animations.add('standing', [0,1,2,3], 12, true);
    this.animations.add('jumping', [37], 12, true);
    this.animations.add('crouching', [27,28,29,30], 12, true);
    // Combat Animations
    this.animations.add('stance', [4,5,6,7], 12, true);
    this.animations.add('block', [16,17,18,19], 12, true);
    this.animations.add('swing', [20,21,22,23], 12, false);
    this.animations.add('hurt', [32, 32, 32, 32], 12, false);
    this.animations.add('death', [26, 25, 24, 38], 4, false);
 

    //initiate velocity
    this.body.velocity.x = 110;
    
  


}

// Inherit Phaser.Sprite's prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
//    if(this.scale.x = 1)
   //  console.log(this.x);
    if(this.air == true){
        this.body.velocity.y = 0;
    }
    if(this.body.touching.down&&this.end==false){
        this.animations.play('moving');
    }
    if(this.end){
        this.animations.stop(null, true);
        this.animations.play('standing');
    }
    if(Math.floor(this.x) == 13 && this.y < 224){
        this.scale.x = -1;
        this.end = true;  
     }
    this.path();
};
Enemy.prototype.path = function(){
     if (Math.floor(this.x) == 300 && this.y>224 && this.air == false&& this.body.touching.down){
        this.body.velocity.x = 40;
        this.jump(); 
     }else if (Math.floor(this.x) == 360 && this.y>224&& this.air == false && this.body.touching.down){
        this.body.velocity.x = 90;
        this.jump(); 
     }else if (Math.floor(this.x) == 440 && this.air == false && this.body.touching.down){
        this.body.velocity.x = 100;
        this.jump(); 
     }else if (Math.floor(this.x) == 540 && this.y>224 && this.air == false&& this.body.touching.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 628 && this.air == false && this.body.touching.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 738 && this.y>224 && this.air == false && this.body.touching.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 938&& this.air == false && this.body.touching.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 987&& this.air == false ){
        this.jump();
        this.body.velocity.x = -110;
        this.scale.x = 1;
     }else if (Math.floor(this.x) == 840&& this.air == false && this.body.touching.down ){
        this.jump();
     }else if (Math.floor(this.x) == 651&& this.air == false && this.body.touching.down ){
        this.jump();
     }else if (Math.floor(this.x) == 486&& this.air == false && this.body.touching.down ){
        this.jump();
     }



    // if(Math.floor(this.x) == 300 && this.air == false)
};
Enemy.prototype.jump = function(){
    this.body.velocity.y = -500;
    this.animations.play('jumping');
};


// Enemyy prefab


function Enemyy(game, posx, posy) {
    // Create an instance of Phaser.Sprite
    Phaser.Sprite.call(this, game, posx, posy, 'child2');
    
    this.anchor.setTo(.5,.5);
    this.scale.x *= 2;
    this.scale.y *= 2;
    
    // Physical Properties
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.body.setSize(18,22,3,8);
    this.turned = false;
    this.air = false;
    this.end = false;


    // this.tint = 0xff0000;
    
    // Add Animations
    // Movement Animations
    this.animations.add('moving', [3,4,5], 12, true);
  //  this.animations.add('standing', [4], 12, true);

    //initiate velocity
    this.body.velocity.x = 110;
    
  


}

// Inherit Phaser.Sprite's prototype
Enemyy.prototype = Object.create(Phaser.Sprite.prototype);
Enemyy.prototype.constructor = Enemyy;

Enemyy.prototype.update = function () {
//    if(this.scale.x = 1)
   //   console.log(this.x);
    if(this.air == true){
        this.body.velocity.y = 0;
    }
    if(this.body.blocked.down&&this.end==false){
        this.animations.play('moving');
      //   console.log("walking");
    }
    if(Math.floor(this.x) == 19){
        this.scale.x = 2;
        this.end = true;  
     }
    if(this.end){
        this.animations.stop(null, true);
    //   this.animations.play('standing');
    }
    this.path();
};
Enemyy.prototype.path = function(){
     if (Math.floor(this.x) == 280 && this.y>3880 && this.air == false&& this.body.blocked.down){
        this.body.velocity.x = 60;
        this.jump(); 
      //   console.log("first jump");
     }else if (Math.floor(this.x) == 360 && this.y>3800&& this.air == false && this.body.blocked.down){
        this.body.velocity.x = 90;
        this.jump(); 
     }else if (Math.floor(this.x) == 438 && this.air == false && this.body.blocked.down){
        this.body.velocity.x = 102;
        this.jump(); 
     }else if (Math.floor(this.x) == 533 && this.y>224 && this.air == false&& this.body.blocked.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 628 && this.air == false && this.body.blocked.down){
        this.jump(); 
     }else if (Math.floor(this.x) == 723 && this.y>3683 && this.air == false&& this.body.blocked.down){
       this.jump();
        console.log("!!!!!!!")
     }else if (Math.floor(this.x) == 932&& this.air == false && this.body.blocked.down){
        this.body.velocity.y = -530;
     }else if (Math.floor(this.x) == 1002&& this.air == false ){
        this.jump();
        this.body.velocity.x = -110;
        this.scale.x = -2;
     }else if (Math.floor(this.x) == 837&& this.y<3715&&this.air == false && this.body.blocked.down ){
        this.jump();
     }else if (Math.floor(this.x) == 651&& this.air == false && this.body.blocked.down ){
        this.jump();
     }else if (Math.floor(this.x) == 507&& this.air == false && this.body.blocked.down ){
        this.jump();
     }else if (Math.floor(this.x) == 331&& this.air == false && this.body.blocked.down ){
        this.jump();
     }



    // if(Math.floor(this.x) == 300 && this.air == false)
};
Enemyy.prototype.jump = function(){
    this.body.velocity.y = -500;
    this.animations.stop();
  //  this.animations.play('jumping');
};


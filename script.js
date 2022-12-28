//Creates variables used to create the canvas size and cell size used for ingame squares
let cellSize;
let colDet;

//-------------------------------------------------------

//Counters for in-game variables to be shown
let coinCounter = 0;
let levelCounter = 0;
let lives = 3;
let deathCounter = 0;
let score = 0;
let timer = 400;

let scoreStr = "";
let coinStr = "";

let scoreLength;
let coinLength;

//-------------------------------------------------------

//Used for loading in images/fonts/sounds and sets the game mode to the start screen when first called
let loading = true;
let mode = "start";

//-------------------------------------------------------

//Variables for images
let brickImg;
let questionBlockImg;
let floorImg;
let blockImg;
let blueBlockImg;
let pipeImgs = [];
let flagPoleImg;
let flagImg;
let smallPlayerImg;
let bigPlayerImg;
let deathImg;
let enemyImg;
let mushroomImg;
let bossBrickImg;
let fireBallImg;
let fireBlockImg;
let bossFloorImg;
let axeImg;
let bossImg;

//-------------------------------------------------------

//Arrays for objects
let player;
let platforms1 = [];
let platforms2 = [];
let floors = [];
let bricks = [];
let items = [];
let enemies = [];
let tempX = [];
let blocks = [];
let coins = [];
let pipes = [];
let fireballs = [];
let bossFloors = [];
let boss;
let axe;
let scores = [];

//Variable used for the font used in game
let font;

//-------------------------------------------------------

//Creating variables for  horizontal movement
let playerSpeed = 0;
let maxSpeed = 3 / 50 * cellSize;
let jumpSpeed = 0;

//-------------------------------------------------------

//Other variables used for animations and set timers
let breaking = false;
let temp = [];

let wallSide;

let tpAnimation = false;
let underground = false;
let underTemp = false;

let outOfPipe = false;

let endFlag = false;
let endWalk = false;

let givenFlagScore = false;

let tempPlace1;
let tempPlace2;

let jumped = false;

//-------------------------------------------------------

function preload() { //Loads some fonts, images and sounds that are required at the start but not al since some other can be loaded afterwards, allowing 
  font = loadFont("images/font.ttf");

  //-------------------------------------------------------

  brickImg = loadImage("images/bricks.png");
  underBrickImg = loadImage("images/underBrick.png");
  questionBlockImg = loadImage("images/questionBlocks.png");
  floorImg = loadImage("images/floor.png");
  underFloorImg = loadImage("images/underFloor.png");
  platformImg = loadImage("images/platform.png")
  blockImg = loadImage("images/block.png");
  blueBlockImg = loadImage("images/blueBlock.png");
  coinImg = loadImage("images/coins.png");
  pipeImgs.push(loadImage("images/pipe.png"));
  pipeImgs.push(loadImage("images/pipe2.png"));
  flagPoleImg = loadImage("images/flagpole.png");
  flagImg = loadImage("images/flag.jpg");
  smallPlayerImg = loadImage("images/smallMario.png");
  bigPlayerImg = loadImage("images/bigMario.png");
  deathImg = loadImage("images/deathImg.png");
  enemyImg = loadImage("images/enemy.png");
  uEnemyImg = loadImage("images/enemyD.png");
  mushroomImg = loadImage("images/mushrooms.png");

  //-------------------------------------------------------

  bgMusic = loadSound("sounds/bgMusic.mp3");
  breakBlock = loadSound("sounds/breakBlock.wav");
  coinCol = loadSound("sounds/coin.wav");
  deathSound = loadSound("sounds/death.wav");
  eatShroom = loadSound("sounds/eatShroom.wav");
  jumpSound = loadSound("sounds/jump.wav");

}

//-------------------------------------------------------

function setup() {
  //Starts loading the rest of the files after the game loads up
  fireBallImg = loadImage("images/fireBalls.png");
  fireBlockImg = loadImage("images/brokenBlock.png");
  bossBrickImg = loadImage("images/bossBrick.png");
  bossFloorImg = loadImage("images/bossFloor.png");
  axeImg = loadImage("images/finishAxe.png");
  bossImg = loadImage("images/boss.png");
  princessImg = loadImage("images/princess.png");
  killEnemy = loadSound("sounds/killEnemy.wav");
  spawnMushroom = loadSound("sounds/mushroomSpawn.wav");
  enterPipe = loadSound("sounds/pipe.wav");
  endLevelSound = loadSound("sounds/endLevel.wav");
  flagDown = loadSound("sounds/flag.wav");
  killEnemy = loadSound("sounds/killEnemy.wav");
  spawnMushroom = loadSound("sounds/mushroomSpawn.wav");
  enterPipe = loadSound("sounds/pipe.wav");
  loading = false;
  angleMode(DEGREES);

  //Calculating Canvas Height
  let canvasHeight = ceil(windowHeight / 16) * 14;

  //Calculating Cell Size
  cellSize = canvasHeight / 14;

  //Calulation for future collision detection
  colDet = cellSize / 4;

  //Using cellSize to calulate width
  let canvasWidth = cellSize * 16;

  //Creates the canvas with the correct width and height
  let cnv = createCanvas(canvasWidth, canvasHeight);

  //Calcultes the position to move the canvas to
  let cnvX = (windowWidth - width) / 2;
  let cnvY = (windowHeight - height) / 2;

  //Moves the Canvas
  cnv.position(cnvX, cnvY);

  //Adds the library to the game so that it can be used for collision detection of rotating objects
  addScreenPositionFunction();

  //-------------------------------------------------------

  //Creating Objects
  player = new Player();

  for(let i = 0; i < 200; i++){
    player.maxSpeed += player.gravity;
    player.maxSpeed *= 0.9;
  }

  //Sets the frame rate to 60 to try keep a constant pace of my game
  frameRate(60);
}

//-------------------------------------------------------

function draw() {
  switch (mode) {
    case "start":
      //Draws the start menu
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);
      textFont(font)
      textSize(cellSize / 2)
      if (frameCount % 60 < 30) { //Makes it so this bit of code inside only runs half to time, making the text inside flash
        text("CLICK TO START", width / 2, height / 2);
      }
      break;

    case "game": //Game is played when this is true
      //-------------------------------------------------------

      if (frameCount % 24 == 0) {//Creates the countdown for when the timer should decrement
        if (!(endFlag) && !(endWalk)) { //Ensures the timer doesn't decrease when it shouldn't
          timer--;//Decrements the timer

          if (timer <= 0) {//Kills player once timer reaches 0
            this.mini = true;
            this.h = cellSize * .9
            deathCounter = 0;
            mode = "deathScreen";
            deathSound.setVolume(0.3);
            deathSound.play()
            lives--;
          }
        }
      }


      //Draws Backround
      noStroke();
      if (underground || levelCounter == 3) { //Bg for underground parts
        background(0);
      } else {
        background(146, 144, 255)//Bg for over ground parts
      }

      //-------------------------------------------------------

      //Draws the information at the top of the screen each frame
      topText();

      //-------------------------------------------------------

      //Sets gravity to normal at the start of every frame
      player.gravity = 0.016 * cellSize;

      for (b of bricks) { //Loops through bricks array
        if (player.yVelocity > 0) {//Checks is player is moving downward
          if (b.nextTo(player)) {//Checks if brick is next to the player
            if (player.y != player.floor) {//Checks if player is off the ground
              player.gravity = 0.004 * cellSize;//Changes gravity, making the player slide down an object
              if (player.x == b.x + b.w) {//Checks what side of object player is on
                wallSide = "right";
              } else {
                wallSide = "left";
              }
            }
          }
        }
      }

      for (b of blocks) { //Loops through blocks array
        if (player.yVelocity > 0) { //Checks is player is moving downward
          if (b.nextTo(player)) { //Checks if block is next to the player
            if (player.y != player.floor) { //Checks if player is off the ground
              player.gravity = 0.004 * cellSize; //Changes gravity, making the player slide down an object
              if (player.x == b.x + b.w) { //Checks what side of object player is on
                wallSide = "right";
              } else {
                wallSide = "left";
              }
            }
          }
        }
      }

      for (p of pipes) { //Loops through blocks array
        if (player.yVelocity > 0) { //Checks is player is moving downward
          if (p.nextTo(player)) { //Checks if pipe is next to the player
            if (player.y != player.floor) { //Checks if player is off the ground
              player.gravity = 0.004 * cellSize; //Changes gravity, making the player slide down an object
              if (player.x == p.x + p.w) { //Checks what side of object player is on
                wallSide = "right";
              } else {
                wallSide = "left";
              }
            }
          }
        }
      }

      //-------------------------------------------------------


      //Calculating player speed
      if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Overground player movement
        if (keyIsDown(65) && keyIsDown(68)) {
          playerSpeed = 0; //If 'A' and 'D' are being held down, the speed is set to 0
        } else {
          if (keyIsDown(65)) { // 'A' key is being held
            playerSpeed = 3 / 50 * cellSize; //Moves player right
          } else if (keyIsDown(68)) {// 'D' key is being held
            playerSpeed = -3 / 50 * cellSize; //Moves player left
          } else {
            playerSpeed = 0; //If neither 'A' or 'D' is being held, the speed is set to 0
          }
        }

        if (!(outOfPipe || endFlag || endWalk || player.deathAnimation)) { //Checks to see if player isn't in an animation
          if (keyIsDown(83)) { //Check if player is crouching
            player.crouching = true;
            player.h = cellSize * 0.9;
            if (player.y == player.floor) { //Lets player still move through the air whilst crouching
              playerSpeed = 0;
            }
          } else { //Sets player into a non-crouching position, since 'S' is no longer being held
            player.crouching = false;
            if (player.mini) { //Changes height based on if player is "mini" or not
              player.h = cellSize * 0.9;
            } else {
              player.h = cellSize * 1.8;
            }
          }
        }
        //Check for sprinting
        if (keyIsDown(16)) {
          playerSpeed *= 9 / 5 //Incrase speed if player is sprinting
        }


        if (levelCounter == 3) { //Must only do on 3rd level since axe doesn't exist until then
          if (axe.finished) { //Checks if player has touched the axe
            playerSpeed = -3 / 50 * cellSize; //Forcibly moves the player to the right
            player.speed = 0;
          }
        }

        if (endWalk) { //Checks if player is walking off of the screen after going on a flag
          playerSpeed = 0; //ensures camera doesn't move whilst player is walking to next level
        }


        if (levelCounter != 3) { //Doesn't happen on level 3 bc it doesn't have floors along the bottom
          if (floors[0].x > 0) { //Checks if left-most floor is off the screen at all
            playerSpeed = -(floors[0].x); //Changes player speed so that floor won't go off of the screen to the left
          } else if (floors[0].x == 0) { //If left-most floors is directly on the esge of canvas
            if (playerSpeed > 0) {//If player tries to move to the left
              playerSpeed = 0;//Stops player moving to the left, so that the floor won't go off screen
            }
          }
        } else { //Only if on third level
          if (axe.finished) { //Checks if player has touched the final axe, finishing the game
            if (bricks[683].x < width) { //Cheks if right-most brick on final level has reached the right of the canvas 
              playerSpeed = width - bricks[683].x; //Changes speed to make brick in line with right side of canvas
            } else if (bricks[683].x == width) {
              playerSpeed = 0 //Makes speed 0 so that it can no longer move, ending the game
              //Draws text to indicate the game has ended
              textAlign(CENTER, CENTER)
              textSize(cellSize / 2)
              text("THANK YOU MARIO!", width / 2, height / 4);
              text("YOU SAVED THE PRINCESS!", width / 2, height / 2)
              noLoop(); //Finishes the game, stopping the draw from looping
            }
          }
        }

        //Allows the player to walljump by adding the jump speed to the player speed
        playerSpeed += jumpSpeed;
      } else {
        playerSpeed = 0; //If player is in underground movement zone, set playerSpeed to 0 so that camera doesn't move
      }

      if (outOfPipe || endFlag || player.deathAnimation || tpAnimation) { //Ensures player can't move if in an animation
        playerSpeed = 0;
        player.speed = 0;
      }



      //Drawing and moving the player vertically
      player.move();

      //-------------------------------------------------------

      //Horizontal collision detection for bricks

      for (b of bricks) { //Loops through bricks array
        if (b.invis != true) { //Checks to see if brick is an invisible brick or not
          if (b.aboutToHit(player)) { //Checks to see if player is about to hit brick from the side
            if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Checks what movement type to be used
              if (playerSpeed < 0) { //Checks direction player is moving
                playerSpeed = player.x + player.w - b.x; //Moves player to be directly next to brick
              } else if (playerSpeed > 0) {
                playerSpeed = player.x - (b.x + b.w); //Moves player to be directly next to brick
              }
            } else { //For other movement system
              if (player.speed > 0) { //Checks direction player is moving
                player.x = b.x - player.w; //Moves player to be directly next to brick
              } else if (player.speed < 0) {
                player.x = b.x + b.w; //Moves player to be directly next to brick
              }
            }
          }

          for (i of items) { //Loops through items array
            if (b.aboutToHit(i)) { //Checks if item is about to hit a brick from the side
              i.speed = -i.speed //Changes item speed to make it move in opposite direction
            }
          }

          for (e of enemies) { //Loops through enemies array
            if (b.aboutToHit(e)) { //Checks if enemy is about to hit brick from the side
              e.speed = -e.speed; //Changes enemy speed to make it move in opposite direction
            }
          }
        } else if (b.broken) { //If brick is invisible but has been broken
          //---
          //Same code as above ^^^
          if (b.aboutToHit(player)) {
            if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) {
              if (playerSpeed < 0) {
                playerSpeed = player.x + player.w - b.x;
              } else if (playerSpeed > 0) {
                playerSpeed = player.x - (b.x + b.w);
              }
            } else {
              if (player.speed > 0) {
                player.x = b.x - player.w;
              } else if (player.speed < 0) {
                player.x = b.x + b.w;
              }
            }
          }

          for (i of items) {
            if (b.aboutToHit(i)) {
              i.speed = -i.speed
            }
          }

          for (e of enemies) {
            if (b.aboutToHit(e)) {
              e.speed = -e.speed
            }
          }
        }
        //---
      }

      //-----------------------

      //Horizontal collision detection for blocks

      for (b of blocks) { //Loops through blocks array
        if (b.aboutToHit(player)) { //Checks to see if player is about to hit block from the side
          if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Checks what movement type to be used
            if (playerSpeed < 0) { //Checks direction player is moving
              playerSpeed = player.x + player.w - b.x; //Moves player to be directly next to block
            } else if (playerSpeed > 0) {
              playerSpeed = player.x - (b.x + b.w); //Moves player to be directly next to block
            }
          } else { //For other movement system
            if (player.speed > 0) { //Checks direction player is moving
              player.x = b.x - player.w; //Moves player to be directly next to block
            } else if (player.speed < 0) {
              player.x = b.x + b.w; //Moves player to be directly next to block
            }
          }
        }

        for (i of items) { //loops through items array
          if (b.aboutToHit(i)) { //Checks if item is about to hit block
            i.speed = -i.speed; //Changes item speed to make it move in opposite direction
          }
        }

        for (e of enemies) { //Loops through enemies array
          if (b.aboutToHit(e)) { //Checks if enemy is about to hit block from the side
            e.speed = -e.speed; //Changes enemy speed to make it move in opposite direction
          }
        }
      }

      //-----------------------

      //Horizontal collision detection for pipes

      for (p of pipes) { //Loops thorugh pipes array
        if (p.aboutToHit(player)) { //Checks to see if player is about to hit pipe from the side
          if (p.type == "vertical") { //Checks what type of pipe it is testing collision for
            if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Checks what movement type to be used
              if (playerSpeed < 0) { //Checks direction player is moving
                playerSpeed = player.x + player.w - p.x; //Moves player to be directly next to pipe
              } else if (playerSpeed > 0) {
                playerSpeed = player.x - (p.x + p.w); //Moves player to be directly next to pipe
              }
            } else {
              if (player.speed > 0) { //Checks direction player is moving
                player.x = p.x - player.w; //Moves player to be directly next to pipe
              } else if (player.speed < 0) {
                player.x = p.x + p.w; //Moves player to be directly next to pipe
              }
            }
          } else { //If pipe is horizontal
            if ((underground && levelCounter != 2) || (levelCounter == 2 && !underground)) {
              player.x = p.x + cellSize * 2 + cellSize / 8 - player.w - 2; //Moves player to be directly next to pipe
              //Other bits aren't needed due to nature of horizontal pipes
            }
          }
        }

        for (i of items) { //Loops through items array
          if (p.aboutToHit(i)) { //Checks if item is about to hit a pipe from the side
            i.speed = -i.speed; //Changes item speed to make it move in opposite direction
          }
        }

        for (e of enemies) { //Loops through enemies array
          if (p.aboutToHit(e)) { //Checks if enemy is about to hit pipe from the side
            e.speed = -e.speed; //Changes enemy speed to make it move in opposite direction
          }
        }
      }

      //-----------------------

      //Horizontal collision detection for floors

      for (f of floors) { //Loops through floors array
        if (f.aboutToHit(player)) { //Checks to see if player is about to hit floor from the side
          if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Checks what movement type to be used
            if (playerSpeed < 0) { //Checks direction player is moving
              playerSpeed = player.x + player.w - f.x; //Moves player to be directly next to floor
            } else if (playerSpeed > 0) {
              playerSpeed = player.x - (f.x + f.w); //Moves player to be directly next to floor
            }
          } else { //For other movement system
            if (player.speed > 0) { //Checks direction player is moving
              player.x = f.x - player.w; //Moves player to be directly next to floor
            } else if (player.speed < 0) {
              player.x = f.x + f.w; //Moves player to be directly next to floor
            }
          }
        }

        for (i of items) { //Loops thorugh items array
          if (f.aboutToHit(i)) { //Checks if item is about to hit a floor from the side
            i.speed = -i.speed; //Changes item speed to make it move in opposite direction
          }
        }

        for (e of enemies) { //Loops through enemies array
          if (f.aboutToHit(e)) { //Checks if enemy is about to hit a floor from the side
            e.speed = -e.speed; //Changes enemy speed to make it move in opposite direction
          }
        }
      }

      //-----------------------

      //Horizontal collision detection for fireball blocks

      for (f of fireballs) { //Loops thorugh fireballs array
        if (f.aboutToHit(player)) { //Checks to see if player is about to hit fireball block from the side
          if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) { //Checks what movement type to be used
            if (playerSpeed < 0) { //Checks direction player is moving
              playerSpeed = player.x + player.w - f.x; //Moves player to be directly next to fireball block
            } else if (playerSpeed > 0) {
              playerSpeed = player.x - (f.x + f.w); //Moves player to be directly next to fireball block
            }
          } else { //For other movement system
            if (player.speed > 0) { //Checks direction player is moving
              player.x = f.x - player.w; //Moves player to be directly next to fireball block
            } else if (player.speed < 0) {
              player.x = f.x + f.w; //Moves player to be directly next to fireball block
            }
          }
        }

        for (i of items) { //Loops through items array
          if (f.aboutToHit(i)) { //Checks if item is about to hit a fireball block from the side
            i.speed = -i.speed; //Changes item speed to make it move in opposite direction
          }
        }

        for (e of enemies) {
          if (f.aboutToHit(e)) { //Checks if enemy is about to hit a fireball block from the side
            e.speed = -e.speed; //Changes enemy speed to make it move in opposite direction
          }
        }
      }

      //-----------------------

      //Collision detection between 2 enemies, making them bounce off of each other
      for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
          //Nested for loop to loop through the array twice for each case
          if (i != j) { //Ensures it isnt trying to collide an enemy with itself
            if (enemies[i].aboutToHit(enemies[j])) { //Checks if 1 enemy is about to hit another
              enemies[i].speed = -enemies[i].speed; //Changes enemy speed to make it move in opposite direction
              enemies[j].speed = -enemies[j].speed; //Changes enemy speed to make it move in opposite direction
            }
          }
        }

        for (j of items) { //Loops through items array | cant use 'i' as a variable since already in use for intial for loop
          if (enemies[i].aboutToHit(j)) { //Checks if enemy is about to hit an item
            j.speed = -j.speed; //Changes item speed to make it move in opposite direction
            enemies[i].speed = -enemies[i].speed; //Changes enemy speed to make it move in opposite direction
          }
        }
      }

      //-------------------------------------------------------

      //Drawing objects and verical collision detection
      //Moving Objects Horizontally around player


      //Put here so player is drawn on top of flag, rest is at bottom
      flag.show(); //Draws flag

      if (!player.deathAnimation) {
        player.showDetection(); //Checks if player should be drawn, and then draws it if it can
      }

      player.floor = height + player.h; //sets player's floor value each frame so it resets and recalulates it

      if (flag.x < width && flag.x > 0) { //Checks if flag is on screen
        player.ceil = -player.h; //Allows player to jump into flag normally
      } else {
        player.ceil = player.h //Means player can't go ono top of map
      }

      //-------------------------------------------------------
      for (p of pipes) {//Loops through pipes array
        if (p.below(player)) { //Checks if pipe is below the player
          if (p.type == "vertical") { //Checks type of pipe to ensure correct floor value is given
            player.floor = p.y - p.fullHeight; //Allows player to stand on top of pipe
          } else { //pipe type == horizontal
            player.floor = p.y - cellSize * 2; //Allows player to stand on top of pipe
          }
          if (p.tp) { //Checks if pipe the player is standing on can be used to teleport
            if (p.type == "vertical") { //Ensure u cant crouch on top of a horizontal pipe and teleport
              if (player.crouching) { //Checks if player is crouching
                //Starts teleportation animation and moves player to middle of pipe
                playerSpeed = 1.5 * cellSize - p.x;
                player.floor = height + cellSize * 2;
                tpAnimation = true;
              }
            }
          }
        }

        if (p.type == "horizontal") {//Checks if any pipe is horizontal, since theyre all telportable
          if (p.goingInHorizontalPipe(player)) { //Checks if player is about to enter a horizontal pipe
            if (keyIsDown(68)) { //Checks if player is holding 'D' key
              player.horizontalEntry = true; //Starts teleportation animation
              tpAnimation = true;
            }
          }
        }

        if (tpAnimation) { //If player is in middle of teleporting animation
          if (p.inside(player)) { //Checks if player has gone far enough inside pipe
            //Teleports the player to desired location
            enterPipe.setVolume(0.3);
            enterPipe.play();
            player.speed = 0;
            player.x = cellSize * 2 + cellSize / 8;
            if (!underground) {
              playerSpeed = p.tpDistance * cellSize;
              player.y = 0;
              tpAnimation = false;
              player.horizontalEntry = false;
              underTemp = true;
            } else {
              player.y = height - cellSize * 2
              playerSpeed = p.tpDistance * cellSize;
              tpAnimation = false;
              player.horizontalEntry = false;
              underground = false;
              outOfPipe = true;
            }
          }
        }

        for (i of items) {
          if (p.below(i)) {
            i.floor = p.y - p.h; //Ensures items can be on top of vertical pipes, horizontal not needed
          }
        }

        for (e of enemies) {
          if (p.below(e)) {
            e.floor = p.y - p.h; //Ensures enemies can be on top of vertical pipes, horizontal not needed
          }
        }

        if (outOfPipe) { //Checks if player is exiting a pipe
          player.y -= 1 / 150 * cellSize; //Pushes player out of pipe
          if (p.below(player)) { //If player has risen up enough
            //End animation and move player to ensure it's at the right position
            outOfPipe = false;
            player.y = p.y - p.h * cellSize
            player.speed = 0;
          }
        }

      }

      for (p of pipes) {
        if (p.x > -cellSize * 4 && p.x < width + cellSize) { //Checks if pipe is on screen
          p.show(); //Draws pipe
        }
        p.move(); //Moves pipes every frame
      }

      //-------------------------------------------------------

      for (i of items) {
        if (i.x > -cellSize && i.x < width + cellSize) { //Checks if item is on screen
          i.show(); //Draws item
        }

        i.move(); //Moves item every frame
        i.floor = height + i.h; //Sets item floor value
      }

      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].y >= height + items[i].h) { //Checks if item is off map
          items.splice(i, 1); //Removes item from items array
          break;
        }

        if (items[i].colliding(player)) { //Checks if player has collected item
          switch (items[i].type) { //Runs code based on what item has been picked up
            case "coin":
              //Player collects coin
              coinCounter++;
              items.splice(i, 1);
              score += 200;
              scores.push(new Score(200, false));
              coinCol.setVolume(0.05);
              coinCol.play();
              break;
            case "mushroom":
              //PLayer collects mushroom
              player.h = cellSize * 1.8;
              player.mini = false;
              player.frame = 17;
              score += 1000;
              scores.push(new Score(1000, false));
              items.splice(i, 1);
              eatShroom.setVolume(0.3);
              eatShroom.play();
              break;
            case "1UP":
              //Player collects 1UP
              lives++;
              score += 1000;
              scores.push(new Score(1000, false));
              items.splice(i, 1);
              eatShroom.setVolume(0.3);
              eatShroom.play();
            default:
              break;
          }
        }

      }

      //-------------------------------------------------------

      if (levelCounter == 3) { //Check if on third level, since axe is not made until then
        //Move and show axe every frame
        axe.move();
        axe.show();

        if (axe.colliding(player)) { //Checks if player is colliding with the axe
          //Starts animations to finish game
          axe.finished = true;
          player.x = axe.x + axe.w;
          bgMusic.pause();
          endLevelSound.setVolume(0.5);
          endLevelSound.play()
        }

        if (!axe.finished) { //If player hasn't collided with axe
          if (axe.x < cellSize) { //Playe rhas gone past axe and axe has gone off of screen
            axe.finished = true;
            player.x = axe.x + axe.w;
            bgMusic.pause();
            endLevelSound.setVolume(0.3);
            endLevelSound.play()
          }
        }
      }

      //-------------------------------------------------------

      for (b of bricks) {
        //Move bricks every frame
        b.move();

        if (b.x > -cellSize && b.x < width + cellSize) { //Checks if brick is on screen
          b.show(); //If brick is on screen, it is drawn
        }

        if (b.invis != true) { //If brick is not invis
          if (b.below(player)) {
            player.floor = b.y - b.h; //Allows player to stand on bricks
          }

          for (i of items) {
            if (b.below(i)) {
              i.floor = b.y - b.h; //Allows items to be on top of bricks
            }
          }

          for (e of enemies) {
            if (b.below(e)) {
              e.floor = b.y - b.h; //Allows enemies to stand on bricks
            }
          }
        } else if (b.broken) { //If brick is invis but is also broken
          if (b.below(player)) {
            player.floor = b.y - b.h; //Allows player to stand on bricks
          }

          for (i of items) {
            if (b.below(i)) {
              i.floor = b.y - b.h; //Allows items to be on top of bricks
            }
          }

          for (e of enemies) {
            if (b.below(e)) {
              e.floor = b.y - b.h; //Allows enemies to stand on bricks
            }
          }
        }

        if (b.above(player)) { //Checks if player is directly below brick
          player.ceil = b.y + b.gap; //Changed players max y value so it can't go above the brick

          if (player.top == player.ceil) { //If top of player is touching its max value whilst b.above(player) is true, the player is direwctly touching the brick from below
            player.yVelocity = 0;//Stops player floating below a brick and immediately sends them down
          }

        }
      }

      //Adds location of blocks that have been touched into a temp array
      for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].above(player)) {
          if (player.yVelocity <= 0) {
            if (player.top == player.ceil) {
              temp.push(i);
              breaking = true;

              player.y++ //Fixes some weird issue with player staying on block for 2 frames
            }
          }
          if (player.top == player.ceil) {
            if (player.yVelocity < 0) {
              player.yVelocity = 0;//Sets player velocity back to 0 again, just in case :)
            }
          }

        }
      }

      //Breaks the blocks if necessary
      if (breaking) { //Checks if a block needs to be broken
        if (temp.length == 1) { //Only under 1 block
          if (bricks[temp[0]].qBlock) { //If block is a question block
            if (!(bricks[temp[0]].broken)) {
              //Block is unbroken qBlock
              bricks[temp[0]].destroy(); //Destroys Q block if it wasn't alreasy
            }
          } else { //Block is normal brick
            bricks[temp[0]].destroy();
          }
        } else {
          if (dist(bricks[temp[0]].x, bricks[temp[0]].y, player.x, player.top) <= dist(bricks[temp[1]].x, bricks[temp[1]].y, player.x, player.top)) {
            //Left one closer
            if (bricks[temp[0]].qBlock) {
              if (!(bricks[temp[0]].broken)) {
                //Left is qBlock and not broken
                bricks[temp[0]].destroy();
              } else { //Left is broken qBlock
                bricks[temp[1]].destroy();
              }
            } else { // Left is normal brick
              bricks[temp[0]].destroy();
            }
          } else { //Right one closer
            if (bricks[temp[1]].qBlock) {
              if (!(bricks[temp[1]].broken)) {
                //Right is qBlock and not broken
                bricks[temp[1]].destroy();
              } else { //Right is broken qBlock
                bricks[temp[0]].destroy();
              }
            } else { //Right is normal brick
              bricks[temp[1]].destroy();
            }
          }
        }
        temp.splice(0, temp.length); //Empties temporary array for next frame
        breaking = false;
      }

      //Deletes all normal bricks after their destruction animation is done
      for (let i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i].broken && !(bricks[i].qBlock)) {
          bricks.splice(i, 1);
          score += 50;
          scores.push(new Score(50, false));
          breakBlock.setVolume(0.3);
          breakBlock.play();
        }
      }


      //-------------------------------------------------------

      for (f of floors) {
        f.move(); //moves floors every frame

        if (f.x > -cellSize && f.x < width + cellSize) {
          f.show(); //Draws floors if on screen
        }

        if (f.below(player)) {
          player.floor = f.y - f.h;//Allows player to stand on floors
        }

        for (i of items) {
          if (f.below(i)) {
            i.floor = f.y - f.h; //Allows items to be on top of floors
          }
        }

        for (e of enemies) {
          if (f.below(e)) {
            e.floor = f.y - f.h; //Allows normal enemies to stand on floors
          }
        }

        if (levelCounter == 3) { //Checks if level counter is 3 since boss object isn;t created until then
          if (f.below(boss)) {
            boss.floor = f.y - f.h; //Allows boss to stand on floors, floor class used for final bridge on boss level but w/ different texture
          }
        }
      }



      for (let i = floors.length - 1; i >= 0; i--) {
        if (levelCounter == 3) {
          if (axe.finished) {
            floors.splice(0, floors.length) //If player hits axe, it removes all floors from the floor array, destroying bridge and making boss fall to death
          }
        }
      }

      //-------------------------------------------------------

      for (f of fireballs) {
        //Shows and moves fireballs every frame
        f.move();
        f.show();

        if (f.below(player)) {
          player.floor = f.y - cellSize; //Allows player to stand on a fireball block
        }

        if (f.above(player)) {
          player.ceil = f.y; //Stops player from going through a fireball block from below

          if (player.top == player.ceil) {
            player.yVelocity = 0; //Forces player to start going down immediately after hitting the block
          }

        }

        if (f.colliding(player)) { //If fireballs hit the player
          if (!(player.hit)) { //Check if recently hit
            if (!(player.mini)) { //Check to see if mario is big
              //Damages the player
              player.hit = true;
              player.h = cellSize * 0.9
              player.mini = true;
            } else {
              //Kills the player
              if (!player.deathAnimation) {
                player.deathAnimation = true;
                player.yVelocity = 0;
                player.yVelocity += player.lift / 3
              }
            }
          }
        }
      }

      //-------------------------------------------------------

      for (p of platforms1) {
        //Moves the first set of platforms every frame
        p.move();
        p.down();

        if (p.x > -cellSize * 4 && p.x < width + cellSize) {
          p.show(); //Draws the first set of platforms if on screen
        }

        if (p.below(player)) {
          player.floor = p.y; //Allows player to stand on platform
        }

        for (i of items) {
          if (p.below(i)) {
            i.floor = p.y; //Allows item to be on top of platform
          }
        }

        for (e of enemies) {
          if (p.below(e)) {
            e.floor = p.y; //Allows enemy to stand on platform
          }
        }
      }

      for (p of platforms2) {
        //Moves the second set of platforms every frame
        p.move();
        p.up();

        if (p.x > -cellSize * 4 && p.x < width + cellSize) {
          p.show(); //Draws the second set of platforms if on screen
        }

        if (p.below(player)) {
          player.floor = p.y; //Allows player to stand on platform
        }

        for (i of items) {
          if (p.below(i)) {
            i.floor = p.y; //Allows item to be on top of platform
          }
        }

        for (e of enemies) {
          if (p.below(e)) {
            e.floor = p.y; //Allows enemy to stand on platform
          }
        }
      }

      for (let i = platforms1.length - 1; i >= 0; i--) {
        if (platforms1[i].y > height) {
          //Deletes platform and recreates a new one once it goes off screen
          //Could've just chnaged the y-value in hindsight
          tempPlace1 = platforms1[i].x;
          platforms1.splice(i, 1);
          platforms1.push(new Platform(tempPlace1, cellSize));
        }
      }

      for (let i = platforms2.length - 1; i >= 0; i--) {
        if (platforms2[i].y < 0) {
          //Deletes platform and recreates a new one once it goes off screen
          //Could've just chnaged the y-value in hindsight
          tempPlace2 = platforms2[i].x;
          platforms2.splice(i, 1);
          platforms2.push(new Platform(tempPlace2, height - cellSize));
        }
      }

      //-------------------------------------------------------

      for (b of blocks) {
        if (b.x > -cellSize && b.x < width + cellSize) {
          b.show(); //Draws block if they're on screen
        }
        b.move(); //Moves blocks every frame

        if (b.below(player)) {
          player.floor = b.y - b.h; //Allows player to stand on blocks
        }

        for (i of items) {
          if (b.below(i)) {
            i.floor = b.y - b.h; //Allows item to be on top of blocks
          }
        }

        for (e of enemies) {
          if (b.below(e)) {
            e.floor = b.y - b.h; //Allows enemies to stand on top of blocks
          }
        }

        if (b.above(player)) {
          player.ceil = b.y; //Stops player from going through blocks from below

          if (player.top == player.ceil) {
            player.yVelocity = 0; //Forces player downwards once it hits a block
          }

        }
      }

      //-------------------------------------------------------

      for (let i = tempX.length - 1; i >= 0; i--) { //Loops through temporary array created for adding new enemies once they get on screen
        tempX[i] += playerSpeed; //Moves the x values of all enemies waiting to be added in
        if (tempX[i] <= width) { //IF enemy should be on screen
          switch (levelCounter) {
            case 1:
              //Calcultes what y-value the enemies should spawn at
              if (tempX.length > 9 && tempX.length < 12) {
                enemies.push(new Enemy(tempX[i], height - cellSize * 10));
              } else {
                enemies.push(new Enemy(tempX[i], height - cellSize * 2));
              }
              break;

            case 2:
              //Calcultes what y-value the enemies should spawn at
              enemies.push(new Enemy(tempX[i], height - cellSize * 2));
              break;

            default:
              break;
          }

          tempX.splice(i, 1); //Once enemy is pushed in enemies array, it is then spiced from the temp array since it is no longer needed
        }
      }

      for (e of enemies) {
        if (e.x > -cellSize && e.x < width + cellSize) {
          e.show(); //If enemy is on screen it should be drawn
        }
        if (!player.deathAnimation) {
          e.move(); //Enemies should move as long as player isn't in death animation
        }
        e.floor = height + cellSize; //Sets enemies floor each frame so it gets reset back


        if (e.hits(player)) {
          if (!(player.hit)) { //Check if recently hit
            //Damages player
            if (!(player.mini)) { //Check to see if mario is big
              player.hit = true;
              player.h = cellSize * 0.9
              player.mini = true;
            } else {
              //Kills player
              if (!player.deathAnimation) {
                player.deathAnimation = true;
                player.yVelocity = 0;
                player.yVelocity += player.lift / 3
              }
            }
          }
        }
      }

      if (levelCounter == 3) {
        //Draws and moves boss every frame
        boss.show();
        boss.move();


        boss.floor = height + boss.h; //Sets boss' floor each frame so it gets reset back


        if (boss.hits(player)) {
          if (!player.hit) {
            if (!(player.mini)) { //Check to see if mario is big
              //Damages player
              player.hit = true;
              player.h = cellSize * 0.9
              player.mini = true;
            } else {
              //Kills player
              if (!player.deathAnimation) {
                player.deathAnimation = true;
                player.yVelocity = 0;
                player.yVelocity += player.lift / 3;
              }
            }
          }
        }
      }

      //If player jumps on top of enemy then enemy is killed and player hops in air
      for (let i = enemies.length - 1; i >= 0; i--) {
        if (!(player.hit)) {
          if (enemies[i].below(player)) {
            if (!(player.deathAnimation)) {
              killEnemy.setVolume(0.3);
              killEnemy.play();
              enemies[i].deathAnimation = true;
              player.yVelocity += (player.lift / 2);
              break;
            }
          }
        }

        if (enemies[i].y >= height + cellSize) { //If enemy falls of map, remove them from array as they're dead
          enemies.splice(i, 1);
          break;
        }

        //Removes enemy from array after their death animation is over
        if (enemies[i].dead) {
          enemies.splice(i, 1);
          score += 100;
          scores.push(new Score(100, false));
        }
      }

      //-------------------------------------------------------

      //Moves flag every frame -> Drawn up above so it is behind everything
      flag.move();

      if (flag.inside(player) && !(givenFlagScore)) { //Checks if player is colliding with flag
      flagDown.setVolume(0.3);
        flagDown.play();
        endFlag = true;
        givenFlagScore = true;
        if (collideRectCircle(player.x, player.y - player.h, player.w, player.h, flag.x + cellSize / 2, flag.y - cellSize * 33 / 4, cellSize / 2)) {
          lives++; //Gives extra life if player is collising with circle at top
        } else {
          score += flagScore(player.y); //Calculates score given from hitting flag
          scores.push(new Score(flagScore(player.y))); //Shows score given on screen
        }
      }

      if (endFlag) { //If player on on the finish flag
        //Converts timer into score
        timer--
        if (timer >= 0) {
          score += 50;
        } else {
          timer = 0;
        }

        //Once timer is finished and player is at bottom of flag, it starts the animation to go into the next level
        if (player.y == player.floor && timer == 0) {
          endLevelSound.setVolume(0.3);
          endLevelSound.play();
          endWalk = true;
          endFlag = false;
          player.x = flag.x + cellSize * 11 / 20;
        }

        if (player.y != player.floor) {//If player hasn't reached the bottom yet, the flag goes down but stops as soon as player stops
          flag.flagY += 1 / 15 * cellSize;
        }
        player.y += 1 / 15 * cellSize; //Brings the player down the flag pole
      }

      if (endWalk) { //If player is walking to next level (animation)
        playerSpeed = 0;
        player.x += 4 / 50 * cellSize //Moves player to the right
        player.speed = 0.001

        if (player.x >= width) { //If player goes off screen to the right
          //Loads up next level
          endWalk = false;
          levelCounter++;
          givenFlagScore = false;
          endLevel();
        }
      }

      //-------------------------------------------------------

      //Only changes once everything has been moved
      //Does this otherwise objects wont move because its "underground"
      if (underTemp) {
        underground = !underground;
        underTemp = false;
      }
      //-------------------------------------------------------

      for (let i = scores.length - 1; i >= 0; i--) {
        scores[i].show(); //Shows recent scores that player got

        scores[i].y -= cellSize / 10 //Makes the score float up into the air

        if (scores[i].count > 20) {
          scores.splice(i, 1); //Splices the score after 20 frames, so it isn't on screen for too long
        }
      }

      //-------------------------------------------------------

      if (player.deathAnimation) {
        player.showDetection(); //Redraw player on top of everything if it is in death animation
      }

      break;

    case "deathScreen":
      //Draws death screen
      background(0);
      fill(255);
      deathCounter++;

      textAlign(CENTER, CENTER);

      if (lives > 0) {
        if (deathCounter > 100) {
          //reloads level after 100 frames ≈ 1.67s
          endLevel();
          mode = "game";
        } else {
          textSize(cellSize / 2);
          text("Level: " + levelCounter, width / 2, height / 4);
          textSize(cellSize * 2 / 3);
          text("Lives: " + lives, width / 2, height / 2);
        }
      } else {
        //Shows only when player runs out of lives
        textSize(cellSize * 3 / 4);
        text("GAME OVER", width / 2, height / 2)

        //resets game back to start
        if (deathCounter > 200) {
          levelCounter = 0;
          endLevel();
          coinCounter = 0;
          lives = 3;
          player.underground = false;
          mode = "start";
          score = 0;
        }
      }
      break;

    default:
      break;
  }

}

//-------------------------------------------------------

function keyPressed() {
  //Makes key inputted lower case so program can always detect it
  inputKey = key.toLowerCase();

  //Detects key inputted and runs program in relation to what key is pressed
  switch (inputKey) {
    //This is ugly but i couldnt figure another way of  doing it
    case " ": //Jump
        if (!endWalk) {
          if (player.y == player.floor || player.y == player.floor + cellSize / 20 || player.y == player.floor - cellSize / 20) {
            if (!tpAnimation) {
              player.jump();
              jumpSound.setVolume(0.3);
              jumpSound.play();
            }
          } else { //Wall jump detection and execution
            if (!(player.wallJump)) {
              if (player.gravity == 0.004 * cellSize) {
                player.wallJump = true;
                player.wallJumpFrames = 0;
                player.yVelocity += player.lift * 3 / 5;
                jumpSound.setVolume(0.3);
                jumpSound.play();
                if (wallSide == "right") {
                  if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) {
                    jumpSpeed = -9 / 50 * cellSize;
                  } else {
                    player.jumpSpeed = 9 / 50 * cellSize;
                  }
                } else {
                  if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) {
                    jumpSpeed = 9 / 50 * cellSize;
                  } else {
                    player.jumpSpeed = -9 / 50 * cellSize;
                  }
                }
              }
            }
          }
        }
      break;

    case "w": //Jump
        if (!endWalk) {
          if (player.y == player.floor || player.y == player.floor + cellSize / 20 || player.y == player.floor - cellSize / 20) {
            if (!tpAnimation) {
              player.jump();
              jumpSound.setVolume(0.3);
              jumpSound.play();
            }
          } else { //Wall jump detection and execution
            if (!(player.wallJump)) {
              if (player.gravity == 0.004 * cellSize) {
                player.wallJump = true;
                player.wallJumpFrames = 0;
                player.yVelocity += player.lift * 3 / 5;
                jumpSound.setVolume(0.3);
                jumpSound.play();
                if (wallSide == "right") {
                  if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) {
                    jumpSpeed = -9 / 50 * cellSize;
                  } else {
                    player.jumpSpeed = 9 / 50 * cellSize;
                  }
                } else {
                  if ((!underground && levelCounter != 2) || (underground && levelCounter == 2)) {
                    jumpSpeed = 9 / 50 * cellSize;
                  } else {
                    player.jumpSpeed = -9 / 50 * cellSize;
                  }
                }
              }
            }
          }
        }
      break;

    case "e":
      if (!(loading)) {
        if (mode == "start") {
          mode = "game";
          levelCounter = 3;
          createLevel(levelCounter);
          bgMusic.setVolume(0.1)
          bgMusic.loop();
        }
      }
      break;

    case "c":
      break;

    default:
      break;
  }

}

//-------------------------------------------------------

//Starts game when mouse is pressed on the screen and files have finished loading, otherwise it creates an error
function mousePressed() {
  if (!(loading)) {
    if (mode == "start") {
      mode = "game"; //Sets the draw function to the "game" mode
      levelCounter = 1;
      createLevel(levelCounter); //Loads in the first level
      //PLays background music
      bgMusic.setVolume(0.1)
      bgMusic.loop();
    }
  }
}

//-------------------------------------------------------

//Empties all arrays and resets every variable that needs to be reset, then loads in the level needed determined by levelCounter
function endLevel() {
  player.x = cellSize * 2 + cellSize / 8;
  player.ceil = 0
  playerSpeed = 0;
  player.speed = 0;
  player.hit = false
  platforms1.splice(0, platforms1.length);
  platforms2.splice(0, platforms2.length);
  floors.splice(0, floors.length);
  bricks.splice(0, bricks.length);
  items.splice(0, items.length);
  enemies.splice(0, enemies.length);
  tempX.splice(0, tempX.length);
  blocks.splice(0, blocks.length);
  coins.splice(0, coins.length);
  pipes.splice(0, pipes.length);
  fireballs.splice(0, fireballs.length)
  timer = 400;
  underground = false;
  createLevel(levelCounter);
}

//-------------------------------------------------------

//Cycles through each level based on parameter entered
function createLevel(level) {
  switch (level) {
    case 0:

      break;
    case 1:
      createLevel1();
      break;
    case 2:
      createLevel2();
      break;
    case 3:
      createLevel3();
      break;
  }
}

//-------------------------------------------------------

//Calculates score gained from player landing on flag, based on y value of player
function flagScore(y) {


  y -= cellSize * 3;

  if (y > 35 / 5 * cellSize) {
    return 100;
  } else if (y > 29 / 5 * cellSize) {
    return 400;
  } else if (y > 24 / 5 * cellSize) {
    return 800;
  } else if (y > 18 / 5 * cellSize) {
    return 2000;
  } else {
    return 5000;
  }
}

//-------------------------------------------------------

//Draws all the text at the top of the screen
function topText() {
  //Resets strings to be recalulated
  scoreStr = "";
  coinStr = "";
  textSize(cellSize * 2 / 5);
  textAlign(LEFT, TOP);
  fill(255);

  //Score
  scoreLength = score.toString().length;

  for (let i = scoreLength; i < 6; i++) {
    scoreStr += "0";
  }

  scoreStr += score.toString();

  text("SCORE:" + scoreStr, cellSize / 4, cellSize / 4)

  //---------

  //Coins

  image(coinImg, cellSize * 16 / 3, cellSize / 8, cellSize * 3 / 4, cellSize * 3 / 4, 0, 0, 16, 16);

  coinLength = coinCounter.toString().length;

  for (let i = coinLength; i < 2; i++) {
    coinStr += "0";
  }

  coinStr += coinCounter.toString();

  text("x" + coinStr, cellSize * 150 / 24, cellSize / 4);

  //---------

  //Level Counter

  text("Level:" + levelCounter, cellSize * 8, cellSize / 4);

  //---------

  //Timer

  text("Timer:" + timer, cellSize * 23 / 2, cellSize / 4);
}

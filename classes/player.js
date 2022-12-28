class Player {
  constructor() { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = cellSize * 2 + cellSize / 8;
    this.y = height - cellSize * 2;
    this.w = cellSize * 3 / 4;
    this.h = cellSize * 0.9;
    this.mini = true;
    this.top = Math.round(this.y - this.h);
    this.speed = 0;
    this.yVelocity = 0;
    this.lift = -cellSize;
    this.gravity = 0.016 * cellSize;
    this.floor = height;
    this.ceil = 0;
    this.hit = false;
    this.hitCount = 0;
    this.wallJump = false;
    this.wallJumpFrames = 0;
    this.crouching = true;
    this.jumpSpeed = 0;
    this.deathAnimation = false;
    this.deathCount = 0;
    this.frame = 14;
    this.frameCountCount = 0;
    this.direction = "right";
    this.horizontalEntry = false;
    this.maxSpeed = 0;
  }

  showDetection() {
    if (this.hit) { //Player has been recently hit
      this.hitCount++; //Increments the counter to know how long after player was recently hit

      if (frameCount % 30 < 15) { //Only draws half of the time, on ond off every 15 frames
        fill(0, 255, 255);
        this.show();
      }

      if (this.hitCount >= 90) {
        //Ends after 90 frames, making the player no longer "recently hit"
        this.hit = false;
        this.hitCount = 0;
      }
    } else {
      this.show(); //Shows player if hasn't been recently hit
    }
  }

  show() {
    if (playerSpeed < 0 || player.speed > 0) { //Checks what direction player is moving in
      this.direction = "right";
    } else if (playerSpeed > 0 || player.speed < 0) { //Checks what direction player is moving in
      this.direction = "left";
    }
    //If neither direction is true, it is done off of what direction it was moving at
    if (!this.mini) { //Big player
      if (!this.crouching) { //Checks if player isn't crouching
        if (this.y == this.floor) { //Checks if player is standing on an object
          if (playerSpeed == 0 && this.speed == 0) { //Checks if player isn't moving
            if (this.direction == "right") {
              image(bigPlayerImg, this.x, this.y - this.h, this.w, this.h, 0, 0, 15, 31); //Draws big idle player sprite facing right
            } else {
              push();
              scale(-1, 1);
              image(bigPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, 0, 0, 15, 31); //Draws big idle player sprite facing left
              pop();
            }
          } else { //Player is moving
            //Increments counter to calculate what sprite to display from sprite sheet
            if (playerSpeed == 12 / 125 * cellSize || playerSpeed == -12 / 125 * cellSize) {
              this.frameCountCount += 1;

              if (this.frameCountCount % 1 != 0) {
                this.frameCountCount -= 0.5
              }
            } else {
              this.frameCountCount += 0.5;
            }

            if (this.frameCountCount % 2 == 0) {
              this.frame += 17;
            }
            if (this.frame > 60) {
              this.frame = 17;
            }

            if (this.direction == "right") {
              image(bigPlayerImg, this.x, this.y - this.h, this.w, this.h, this.frame, 0, 16, 31); //Draws big player walking to the right
            } else {
              push();
              scale(-1, 1);
              image(bigPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, this.frame, 0, 16, 31); //Draws big player walking to the left
              pop();
            }
          }
        } else { //Player is in air -> jumping
          if (this.direction == "right") {
            image(bigPlayerImg, this.x, this.y - this.h, this.w, this.h, 68, 0, 14, 31) //Draws big player jumping whilst facing right
          } else {
            push();
            scale(-1, 1);
            image(bigPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, 68, 0, 14, 31); //Draws big player jumping whilst facing left
            pop();
          }
        }
      } else { //Player is crouching
        if (this.direction == "right") {
          image(bigPlayerImg, this.x, this.y - this.h, this.w, this.h, 85, 10, 13, 21) //Player crouching + facing right
        } else {
          push();
          scale(-1, 1);
          image(bigPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, 85, 10, 13, 21); //Player crouching + facing left
          pop();
        }
      }
    } else { //Small Player
      if (!this.deathAnimation) {
        if (this.y == this.floor) { //Checks if player is standing on an object
          if (playerSpeed == 0 && this.speed == 0) { //Checks if player isn't moving
            if (this.direction == "right") {
              image(smallPlayerImg, this.x, this.y - this.h, this.w, this.h, 0, 0, 14, 16) //Draws small idle player sprite facing right
            } else {
              push();
              scale(-1, 1);
              image(smallPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, 0, 0, 14, 16) //Draws small idle player sprite facing left
              pop();
            }
          } else { //Player is moving
            //Increments counter to calculate what sprite to display from sprite sheet
            if (playerSpeed == 12 / 125 * cellSize || playerSpeed == -12 / 125 * cellSize) {
              this.frameCountCount += 1;

              if (this.frameCountCount % 1 != 0) {
                this.frameCountCount = Math.floor(this.frameCountCount);
              }
            } else {
              this.frameCountCount += 0.5;
            }

            if (this.frameCountCount % 4 == 0) {
              this.frame += 16;
            }
            if (this.frame > 60) {
              this.frame = 14;
            }

            if (player.speed > 0 || playerSpeed < 0) {
              image(smallPlayerImg, this.x, this.y - this.h, this.w, this.h, this.frame, 0, 15, 16); //Draws small player walking to the right
            } else {
              push();
              scale(-1, 1);
              image(smallPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, this.frame, 0, 15, 16); //Draws small player walking to the left
              pop();
            }
          }
        } else { //Player is in air -> jumping
          if (this.direction == "right") {
            image(smallPlayerImg, this.x, this.y - this.h, this.w, this.h, 63, 0, 16, 16) //Draws small player jumping whilst facing right
          } else {
            push();
            scale(-1, 1);
            image(smallPlayerImg, -this.x - this.w, this.y - this.h, this.w, this.h, 63, 0, 16, 16); //Draws small player jumping whilst facing left
            pop();
          }
        }
      } else {
        image(deathImg, this.x, this.y - this.h, this.w, this.h, 0, 0, 12, 14);
      }
    }
  }

  move() {
    //Gravity affecting player
    this.yVelocity += this.gravity;
    this.yVelocity *= 0.9;

    if (endFlag || outOfPipe) {
      this.yVelocity = 0; //If in certain animations the player shouldn't be moving vertically in this way
    }

    this.yVelocity = constrain(this.yVelocity, this.maxSpeed + this.lift, this.maxSpeed);//Constrains the y velocity between two values so that ypu can't jump twice at a time using the 2 input methods

    this.y += this.yVelocity; //Changes player y value by its vertical speed

    //Wall Jumping
    if (this.wallJump) {
      //Increments a counter every frame to know how long since wall jump started
      this.wallJumpFrames++;
      if (this.wallJumpFrames >= 10) {
        //Stops player moving after wall jump
        jumpSpeed = 0;
        this.jumpSpeed = 0;

        if (this.wallJumpFrames >= 120) {
          //Ends wall jump after 2 secs, allowing player to wall jump again
          this.wallJump = false;
        }
      }
    }

    //Calculates the y value of the top of the player
    this.top = Math.ceil(this.y - this.h);

    if (!this.deathAnimation) {
      //Constrains y value between 2 values so player dont go above/below certain points
      this.y = constrain(this.y, Math.round(this.ceil + this.h), this.floor);
      this.top = constrain(this.top, this.ceil, this.floor - this.h)
    } else {  //Death Animation
      if (this.y >= height + this.h) {
        this.deathAnimation = false; //Ends death animation -> player is dead
      }
    }

  if(!this.deathAnimation){
    if (this.y >= height + this.h) {
      //Player falls off of map -> player is dead
      //Kills player and shows death screen
      this.mini = true;
      this.h = cellSize * .9
      deathCounter = 0;
      mode = "deathScreen";
      lives--;
      deathSound.setVolume(0.3);
      deathSound.play()
    }
  }

    if ((underground && levelCounter != 2) || (levelCounter == 2 && !underground)) {
      //Underground movement for player
      if (!(outOfPipe || endFlag || endWalk || player.deathAnimation)) {
        if (keyIsDown(65) && keyIsDown(68)) {
          this.speed = 0; //If 'A' and 'D' are being held down, the speed is set to 0
        } else {
          if (keyIsDown(65)) { // 'A' key is being held
            this.speed = -3 / 50 * cellSize; //Moves player left
          } else if (keyIsDown(68)) { // 'D' key is being held
            this.speed = 3 / 50 * cellSize; //Moves player right
          } else { //Neither 'A' or 'D' is being held
            this.speed = 0; //Player isn't moving
          }
        }

        if (!(outOfPipe || endFlag || endWalk || player.deathAnimation)) { //Checks to see if player isn't in an animation
          if (keyIsDown(83)) { //Check if player is crouching
            this.crouching = true;
            this.h = cellSize * 0.9;
            if (this.y == this.floor) { //Lets player still move through the air whilst crouching
              this.speed = 0;
            }
          } else { //Sets player into a non-crouching position, since 'S' is no longer being held
            this.crouching = false;
            if (this.mini) { //Changes height based on if player is "mini" or not
              this.h = cellSize * 0.9;
            } else {
              this.h = cellSize * 1.8;
            }
          }
        }

        //Check for sprinting
        if (keyIsDown(16)) {
          this.speed *= 9 / 5; //Incrase speed if player is sprinting
        }
      }
    }

    if (this.horizontalEntry) {
      this.speed = 1 / 50 * cellSize; //Moves player inside horizontal pipe
    }

    player.speed += player.jumpSpeed; //Allows the player to walljump by adding the jump speed to the player speed

    this.x += this.speed; //Moves player by speed in horizontal direction
  }

  jump() {
    this.yVelocity += this.lift;
    //Increases the y speed by a set value, making the player jump
  }
}

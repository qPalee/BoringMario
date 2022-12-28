class Enemy {
  constructor(x, y) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.floor = height;
    this.yVelocity = 0;
    this.gravity = 0.016 * cellSize;
    this.speed = -4 / 100 * cellSize
    this.frame = 0;
    this.deathAnimation = false;
    this.deathCount = 0;
    this.dead = false;
  }

  show() {
    //Draws enemy every frame
    if (!this.deathAnimation) { //Eenemy isn't in death animation
      if (frameCount % 20 == 0) {
        this.frame++; //Cycles through enemy spritesheet, making a walking animation
      }

      if (this.frame >= 2) {
        this.frame = 0; //Resets the frame counter back to first frame in spritesheet
      }

      //Draws enemy walking, same image can be used for both ways since image is symmetrical
      if (!underground) { //Overground Image
        image(enemyImg, this.x, this.y - this.h, this.w, this.h, this.frame * 17, 0, 17, 16);
      } else { //Underground Image
        image(uEnemyImg, this.x, this.y - this.h, this.w, this.h, this.frame * 17, 0, 17, 16);
      }

    } else { //Enemy in death animation
      this.deathCount++

      if (this.deathCount >= 20) {
        this.dead = true; //Kills enemy after 20 frames of death animation
      }

      if (!underground) {
        image(enemyImg, this.x, this.y - this.h, this.w, this.h, 35, 0, 16, 16); //Overground Image
        //Squished image to make it look like player squished enemy
      } else {
        image(uEnemyImg, this.x, this.y - this.h, this.w, this.h, 35, 0, 16, 16); //Underground Image
      }
    }
  }

  move() {
    //Moves enemy with player
    this.x += playerSpeed;

    //Applies gravity to enemy
    this.yVelocity += this.gravity;
    this.yVelocity *= 0.9;

    //Changes enemy y value by its vertical speed
    this.y += this.yVelocity;

    //Constrains y value between 2 values so enemy dont go above/below certain points
    this.y = constrain(this.y, 0, this.floor);

    //Moves enemy horizontally
    if (!this.deathAnimation) {
      this.x += this.speed;
    }
  }

  hits(player) { //Checks if enemy hit player, damaging the player
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, player.x, player.y - player.h, player.w, player.h)
  }

  below(player) { //Checks if enemy is below player, killing enemy
    return collideRectRect(this.x, this.y - this.h - colDet, this.w, colDet, player.x, player.y - colDet - 1, player.w, colDet);
  }

  aboutToHit(object) { //Checks if enemy is about to hit another enemy
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
  }
}

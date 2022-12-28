class Fireball {
  constructor(x, y, fire) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize / 2;
    this.h = cellSize * 3
    this.fire = fire;
    this.angle = 0;
    this.frame = 0;
    this.tempX = 0
    this.tempY = 0
    this.poly = [];
  }

  show() {
    //Incremetns angle of rotation (in degrees)
    this.angle++;

    if (frameCount % 8 == 0) {
      this.frame += 9; //Cycles through spritesheet

      if (this.frame >= 36) {
        this.frame = 0; //Resets spritesheet
      }
    }

    image(fireBlockImg, this.x, this.y - cellSize, cellSize, cellSize); //Draws block taht fireballs will be rotated around

    if (this.fire) {

      push();
      translate(this.x + cellSize / 2, this.y - cellSize / 2); //Translates (0, 0) to middle of block
      rotate(this.angle); //Rotates canvas by angle

      //Calculates the sreen position of each corner of fireballs used for collision detection with player
      this.poly[0] = screenPosition(-cellSize / 4, -cellSize / 4);
      this.poly[1] = screenPosition(cellSize / 4, -cellSize / 4);
      this.poly[2] = screenPosition(cellSize / 4, cellSize * 11 / 4);
      this.poly[3] = screenPosition(-cellSize / 4, cellSize * 11 / 4);

      //Draws 6 fireballs next to each other
      for (let i = 0; i < 6; i++) {
        image(fireBallImg, -cellSize / 4, -cellSize / 4 + i * cellSize / 2, cellSize / 2, cellSize / 2, this.frame, 0, 8, 8)
      }

      pop();
    }
  }

  move() {
    this.x += playerSpeed; //Moves the brick every frame based on player speed
  }

  colliding(object) {
    //Checks if player if colliding with fireballs, which will damage/kill player
    if (this.fire) {
      return collideRectPoly(object.x, object.y - object.h, object.w, object.h, this.poly)
    } else {
      return false;
    }
  }

  below(object) { //Checks if fireball block is below an object (usually player)
    return collideRectRect(this.x + 1, this.y - cellSize - colDet, cellSize - 2, colDet, object.x, object.y - colDet - 1, object.w, colDet);
  }

  aboutToHit(object) { //Checks if fireball block is about to hit an object from the side
    return collideRectRect(this.x, this.y - cellSize, cellSize, cellSize, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
  }

  above(player) {
    //Checks if fireball block is above the player
    return collideRectRect(this.x + 1, this.y, cellSize - 2, colDet, player.x + 1, player.y - player.h - colDet + 1, player.w - 2, colDet);
  }
}

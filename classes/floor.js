class Floor {
  constructor(x, y) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.down = false;
  }

  show() {
    //Draws block based on where player is
    if (levelCounter == 3) {
      image(bossFloorImg, this.x, this.y - this.h, this.w, this.h) //Boss level -> bridge for boss
    } else {
      if (!underground) {
        image(floorImg, this.x, this.y - this.h, this.w, this.h); //Overground
      } else {
        image(underFloorImg, this.x, this.y - this.h, this.w, this.h); //Underground
      }
    }
  }

  move() {
    //Moves the floor object every frame based on player speed
    this.x += playerSpeed;
  }

  below(player) {
    //Checks if floor is below an object (ususally player)
    return collideRectRect(this.x, this.y - this.h - colDet, this.w, colDet, player.x, player.y - colDet, player.w, colDet);
  }

  aboutToHit(object) {
    //Checks if an object is about to hit floor from the side
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
  }
}

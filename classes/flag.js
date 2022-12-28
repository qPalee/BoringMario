class Flag {
  constructor(x, y) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = 7;
    this.flagY = this.y - cellSize * (this.h + 1);
  }

  show() { //Draws flag every frame
    fill(0, 255, 0);
    noStroke();
    //Draws flagpole
    rect(this.x + 9 / 20 * cellSize, this.y - cellSize * (this.h + 1), 1 / 10 * cellSize, cellSize * (this.h));

    //Draws circle at top of flagpole
    image(flagPoleImg, this.x, this.y - cellSize * (this.h + 2), cellSize, cellSize)

    if (this.flagY >= height - cellSize * 4) {
      //Ensures flag doesn't go below a certain point
      this.flagY = height - cellSize * 4;
    }

    //Draws flag that goes on flagpole
    image(flagImg, this.x + 11 / 20 * cellSize, this.flagY, cellSize, cellSize);
  }

  move() {
    this.x += playerSpeed; //Moves the flag + flag pole every frame based on player speed
  }

  inside(object) { //Checks if player is inside flag pole
    return collideRectRect(this.x + 9 / 20 * cellSize, this.y - cellSize * (this.h + 1), 1 / 10 * cellSize, cellSize * this.h, object.x, object.y - object.h, object.w, object.h);
  }
}

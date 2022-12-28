class Coin {
  constructor(x, y) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.circleX = this.x + this.w / 2;
    this.circleY = this.y - this.h / 2;
    this.diameter = cellSize;
    this.type = "coin";
    this.frame = 0;
  }

  show() {
    if (frameCount % 12 == 0) {
      this.frame++; //Cycles thorugh coin spritesheet, animating coin
    }

    if (this.frame >= 3) {
      this.frame = 0; //Resets back to first sprite after reaching end of spritesheet
    }

    image(coinImg, this.x, this.y - this.h, this.w, this.h, this.frame * 16, 0, 16, 16); //Draws coin every frame
  }

  move() {
    //Moves coin and collision detection for coin
    this.x += playerSpeed;
    this.circleX += playerSpeed;
  }

  colliding(object) {
    //Checks if coin is collidomg with player for collection
    return collideRectCircle(object.x, object.y - object.h, object.w, object.h, this.circleX, this.circleY, this.diameter);
  }
}
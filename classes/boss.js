class Boss {
  constructor(x, y) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize * 2;
    this.h = cellSize * 2;
    this.floor = height;
    this.yVelocity = 0;
    this.gravity = 0.012 * cellSize;
    this.princessY = height - cellSize * 2
  }

  show() {
    //Draws boss every frame
    image(bossImg, this.x, this.y - this.h, this.w, this.h);

    //Draws princess at end of game every frame
    image(princessImg, this.x + 18 * cellSize, this.princessY - cellSize * 2, cellSize, cellSize * 2)
  }

  move() {
    if (frameCount % 300 == 0) {
      //Makes boss jump every 300 frames
      this.yVelocity -= cellSize;
    }

    //Moves enemy with player
    this.x += playerSpeed;

    //Applies gravity to enemy
    this.yVelocity += this.gravity;
    this.yVelocity *= 0.9;

    //Changes enemy y value by its vertical speed
    this.y += this.yVelocity;

    //Constrains y value between 2 values so enemy dont go above/below certain points
    this.y = constrain(this.y, 0, this.floor);
  }

  hits(player) { //Checks if enemy hit player, damaging the player
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, player.x, player.y - player.h, player.w, player.h)
  }
}
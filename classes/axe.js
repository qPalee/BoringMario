class Axe {
  constructor(x, y) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.angle = 0;
    this.finished = false;
  }

  show() { 
    if (this.finished) { //If player has touched axe
      if (this.angle < 90) {
        this.angle++ //Increments angle of rotation for axe
      }
    }

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(axeImg, 0, -this.h, cellSize, cellSize); //Draws axe every frame at rotation
    pop();
  }

  move(){
    this.x += playerSpeed //Moves the axe every frame based on player speed
  }

  colliding(player){ //Ckeck if axe is colliding with player, which will end the game if true
    return collideRectRect(this.x + 1, this.y - this.h, this.w - 2, this.h, player.x, player.y - player.h, player.w, player.h)
  }
}
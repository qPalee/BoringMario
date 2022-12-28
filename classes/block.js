class Block {
  constructor(x, y) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
  }

  show() {
    //Draws block based on where player is
    if (!underground) {
      image(blockImg, this.x, this.y - this.h, this.w, this.h); //Overground block
    } else {
      image(blueBlockImg, this.x, this.y - this.h, this.w, this.h);//Underground block
    }
  }

  move() {
    this.x += playerSpeed; //Moves the block every frame based on player speed
  }

  below(object) {
    //Checks if block is below an object (ususally player)
    return collideRectRect(this.x + 1, this.y - this.h - colDet, this.w - 2, colDet, object.x, object.y - colDet - 1, object.w, colDet);
  }

  above(player) {
    //Checks if block is above player
    return collideRectRect(this.x + 1, this.y - this.gap, this.w - 2, colDet, player.x + 1, player.y - player.h - colDet + 1, player.w - 2, colDet);
  }

  aboutToHit(object) {
    //Checks if an object is about to hit block from the side
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, object.x - playerSpeed, object.y - object.h + 1, object.w, object.h - 2);
  }

  nextTo(object) {
    //Checlks if player is directly next to a block
    return ((object.x == this.x + this.w || player.x + player.w == this.x) && (player.y > this.y - this.h && player.y < this.y))
  }
}

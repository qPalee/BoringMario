class Pipe {
  constructor(x, y, h, type, tp, tpDistance, exitHeight) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize * 2;
    this.h = h;
    this.fullHeight = this.h * (cellSize - 1);
    this.type = type;
    this.tp = tp;
    this.tpDistance = tpDistance;
    this.exitHeight = exitHeight;
  }

  show() { //Draws pipe based off of type of pipe
    if (this.type == "vertical") { //Vertical pipe
      for (let i = 1; i < this.h; i++) { //Shaft of pipe
        image(pipeImgs[0], this.x, this.y - i * cellSize + i, this.w, cellSize, 0, 16, 32, 16);
      }

      image(pipeImgs[0], this.x, this.y - (this.h * cellSize) + this.h, this.w, cellSize, 0, 0, 32, 16); //Tip of pipe
    } else {//Horizontal pipe

      for (let i = 0; i < this.h + 3; i++) { //Shaft going to top of screen
        image(pipeImgs[0], this.x + cellSize * 2, this.y - (i) * cellSize - 10 + i, this.w, cellSize, 0, 16, 32, 16);
      }

      image(pipeImgs[1], this.x, this.y - cellSize * 2, cellSize * 3, cellSize * 2) //Chunky bit the player walks into
    }
  }

  move() {
    this.x += playerSpeed; //Moves the brick every frame based on player speed
  }

  below(object) { //Checks if pipe is below an object (ususally player)
    if (this.type == "vertical") { //Vertical pipe
      return collideRectRect(this.x + 1, this.y - this.fullHeight - colDet, this.w - 2, colDet, object.x, object.y - colDet - 1, object.w, colDet);
    } else { //Horizontal pipe
      return collideRectRect(this.x + 1, this.y - cellSize * 2 - colDet, cellSize * 2, colDet, object.x, object.y - colDet - 1, object.w, colDet);
    }

  }

  aboutToHit(object) { //Checks if an object is about to hit block from the side
    if (this.type == "vertical") { //Vertical pipe
      return collideRectRect(this.x, this.y - this.fullHeight, this.w, this.fullHeight, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
    } else { //Horizontal pipe
      return collideRectRect(this.x + cellSize * 2 + cellSize / 8 - 1, this.y - (this.h + 2) * cellSize, cellSize, this.h * cellSize, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
    }
  }

  nextTo(object) { //Checlks if player is directly next to a block, for wall jumping
    if (this.type == "vertical") { //Vertical pipe
      return ((object.x == this.x + this.w || player.x + player.w == this.x) && (player.y > this.y - this.fullHeight && player.y < this.y))
    } else { //Horizontal pipe
      return object.x == this.x + cellSize * 2 + cellSize / 8 - object.w - 2;
    }

  }

  goingInHorizontalPipe(object) { //Checks if player is about to enter a Horizontal pipe
    return collideRectRect(this.x - 5, this.y - 5, 10, 5, object.x, object.y - object.h, object.w, object.h);
  }

  inside(object) { //Checks if player has gone far enough inside pipe to teleport them
    if (this.type == "vertical") {
      return collideRectRect(this.x + cellSize / 2, this.y - cellSize, cellSize, cellSize, object.x, object.y - object.h, object.w, object.h)
    } else {
      return collideRectRect(this.x + cellSize, this.y - cellSize * 2, cellSize, cellSize * 2, object.x, object.y - object.h, object.w, object.h)
    }
  }
}

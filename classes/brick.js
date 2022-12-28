class Brick {
  constructor(x, y, qBlock, item, invis) { //Runs code inside when object is created
    //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.qBlock = qBlock;
    this.frame = 0;
    this.breakingAnimation = false;
    this.breakCount = 0;
    this.bounceCount = 0;
    this.frameX = 16;
    this.broken = false;
    this.item = item;
    this.showItem = false;
    this.bounceAnimation = false
    this.itemY = this.y;
    this.gap = 0;
    this.invis = invis;
  }

  show() {
    if (this.qBlock) {
      //Cycles through spritesheet for question blocks, animating them
      if (frameCount % 12 == 0 && this.frame < 3) {
        this.frame++;
      }

      if (this.frame == 3) {
        this.frame = 0; //Resest back to first image after it reaches end of spritesheet
      }
    }

    if (this.breakingAnimation) {
      //Brick is being broken
      this.breakCount++;

      //Makes brick bounce in air
      this.bounceAnimation = true;

      if (!(this.qBlock)) {
        this.frameX = 32;
      }

      //Ends aniamtion, then destroys brick
      if (this.breakCount >= 20) {
        this.breakingAnimation = false;
        this.broken = true;
      }
    }

    if (this.bounceAnimation) {
      //COunter to know when to change direction of movement or end aniamtion
      this.bounceCount++;

      //Bounces brick in air
      if (this.bounceCount < 10) {
        this.y -= cellSize / 33;
        this.gap += cellSize / 33
      } else if (this.bounceCount < 19) {
        this.y += cellSize / 33;
        this.gap -= cellSize / 33
      }

      //Ends animation
      if (this.bounceCount >= 20) {
        this.bounceAnimation = false;
        this.bounceCount = 0;
        this.gap = 0;
      }
    }

    if (this.showItem) {
      //Draws item when coming out of brick

      //Moves item out of brick manually
      this.itemY -= cellSize / 33;

      if (this.itemY <= this.y - cellSize) {
        //Creates item in the world since it is out of brick
        this.showItem = false;

        if (this.item == "mushroom") {
          items.push(new Mushroom(this.x, this.itemY));
        }

        if (this.item == "1UP") {
          items.push(new UP1(this.x, this.itemY));
        }
      }

      noStroke();
      //Draws item based on what item it is
      switch (this.item) {
        case "coin":
          image(coinImg, this.x, this.itemY - this.h, this.w, this.h, 0, 0, 16, 16);
          break;

        case "mushroom":
          image(mushroomImg, this.x, this.itemY - this.h, this.w, this.h, 0, 0, 16, 16);
          break;

        case "1UP":
          image(mushroomImg, this.x, this.itemY - this.h, this.w, this.h, 17, 0, 16, 16);
          break;

        default:
          break;
      }
    }

    if (this.qBlock) {
      if (this.invis != true) { //Brick is not invisible
        //Draws question block
        image(questionBlockImg, this.x, this.y - this.h, this.w, this.h, this.frame * 16, 0, 16, 16);
        strokeWeight(1);
        stroke(0)
        line(this.x, this.y, this.x + this.w, this.y)
      } else {
        if (this.broken) {
          //Draws broken question block, only if it was an invis block
          image(questionBlockImg, this.x, this.y - this.h, this.w, this.h, this.frame * 16, 0, 16, 16);
          strokeWeight(1);
          stroke(0)
          line(this.x, this.y, this.x + this.w, this.y)
        }
      }
    } else { //Normal brick
      //Cycles through each type of brick and draws the correct image
      if (levelCounter == 3) {
        image(bossBrickImg, this.x, this.y - this.h, this.w, this.h)
      } else {
        if (!underground) {
          image(brickImg, this.x, this.y - this.h, this.w, this.h, this.frameX, 0, 16, 16);
          strokeWeight(1);
          stroke(0)
          line(this.x, this.y, this.x + this.w, this.y)
        } else {
          image(underBrickImg, this.x, this.y - this.h, this.w, this.h);
        }
      }
    }

  }

  move() {
    this.x += playerSpeed; //Moves the brick every frame based on player speed
  }

  below(object) {
    //Checks if brick is below an object (ususally player)
    return collideRectRect(this.x + 1, this.y - this.h - colDet, this.w - 2, colDet, object.x, object.y - colDet - 1, object.w, colDet);
  }

  above(player) {
    //Checks if brick is above player
    return collideRectRect(this.x + 1, this.y - this.gap, this.w - 2, colDet, player.x + 1, player.y - player.h - colDet + 1, player.w - 2, colDet);
  }

  aboutToHit(object) {
    //Checks if an object is about to hit brick from the side
    return collideRectRect(this.x, this.y - this.h + this.gap, this.w, this.h, object.x - playerSpeed + object.speed, object.y - object.h + 1, object.w, object.h - 2);
  }

  nextTo(object) {
    //Checlks if player is directly next to a brick
    return ((object.x == this.x + this.w || player.x + player.w == this.x) && (player.y > this.y - this.h && player.y < this.y))
  }

  destroy() {
    //Destoys brick based on what type of brick it is
    if (this.qBlock) {
      this.broken = true;
      this.breakingAnimation = true;
      this.frame = 4;
      this.outputItem();
    } else {
      if (!(player.mini)) {
        this.breakingAnimation = true; //Destoys brick
      } else {
        this.bounceAnimation = true; //Bounces brick
      }
    }
  }

  outputItem() {
    //When q block is initially broken, it will have to tell itself to draw its specific item
    switch (this.item) {
      case "coin":
        coinCounter++;
        score += 200
        scores.push(new Score(200, false));
        this.showItem = true;
        coinCol.setVolume(0.2)
        coinCol.play();
        break;
      case "mushroom":
        this.showItem = true;
        spawnMushroom.setVolume(0.3);
        spawnMushroom.play();
        break;
      case "1UP":
        this.showItem = true;
        spawnMushroom.setVolume(0.3);
        spawnMushroom.play();
        break;
      default:
        break;
    }
  }
}

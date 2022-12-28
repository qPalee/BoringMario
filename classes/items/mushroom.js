class Mushroom {
  constructor(x, y) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize;
    this.h = cellSize;
    this.floor = height;
    this.yVelocity = 0;
    this.gravity = 0.016 * cellSize;
    this.speed = 5 / 100 * cellSize;
    this.type = "mushroom";
  }

  show() { //Draws mushroom every frame
    image(mushroomImg, this.x, this.y - this.h, this.w, this.h, 0, 0, 16, 16);
  }

   move() {
    //Moves mushroom with player
    this.x += playerSpeed;

    //Applies gravity to mushroom
    this.yVelocity += this.gravity;
    this.yVelocity *= 0.9;

    //Changes mushrooms y value by its vertical speed
    this.y += this.yVelocity;

//Constrains y value between 2 values so player dont go above/below certain points
    this.y = constrain(this.y, 0, this.floor);

    //Moves mushroom horizontally
    this.x += this.speed;
  }

  colliding(object) { //Checks if 1UP is colliding with player for collection
    return collideRectRect(this.x, this.y - this.h, this.w, this.h, object.x, object.y - object.h, object.w, object.h);
  }

}
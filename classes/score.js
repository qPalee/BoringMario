class Score {
  constructor(s, up1) { //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = player.x + player.w + cellSize / 6;
    this.y = player.y - player.h - cellSize / 6;
    this.score = s;
    this.count = 0;
    this.up1 = up1;
  }

  show() {
    //Shows text on screen with amount of score gained/ 1UP
    //Goes after certain time
    if (this.up1) {
textSize(cellSize * 2 / 5);
      fill(255);
      text("1UP", this.x, this.y)
    } else {
      this.count++
      textSize(cellSize * 2 / 5);
      fill(255);
      text(this.score, this.x, this.y)
    }
  }
}

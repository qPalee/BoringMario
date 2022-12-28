class Platform{
  constructor(x,y){ //Runs code inside when object is created
  //Creates all variables for use in class
    this.x = x;
    this.y = y;
    this.w = cellSize*4;
    this.h = cellSize*7/16;
  }

  show(){
    //Draws platform every frame
    image(platformImg, this.x, this.y, this.w, this.h);
  }

  move(){
    this.x += playerSpeed; //Moves the platform every frame based on player speed
  }

  down(){
    this.y += cellSize/20; //Moves platform up every frame
  }

  up(){
    this.y -= cellSize/20; //Moves platform down every frame
  }

  below(player){
    //Checks if platform is below player, allowing player to stand on platform
    return collideRectRect(this.x, this.y - colDet, this.w, colDet, player.x, player.y - colDet, player.w, colDet)
  }
}

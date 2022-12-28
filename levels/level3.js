function createLevel3() { //Creates function that is called to load in third level
//Sets some variables requires for third level
  player.y = height - cellSize * 8;

  for(let y = 0; y < 13; y++){
    bricks.push(new Brick(-1*cellSize, height - y*cellSize))
    bricks.push(new Brick(-2*cellSize, height - y*cellSize))
  }

  //Floors
  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 5; y++) {
      bricks.push(new Brick(x * cellSize, height - y * cellSize))
    }
  }


  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 5 - y; x++) {
      bricks.push(new Brick((x) * cellSize, height - (5 + y) * cellSize))
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 11; x++) {
    for (let y = 0; y < 5; y++) {
      bricks.push(new Brick((x + 15) * cellSize, height - y * cellSize))
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 5; y++) {
      bricks.push(new Brick((x + 29) * cellSize, height - y * cellSize))
    }
  }

  bricks.push(new Brick(30 * cellSize, height - cellSize * 7, true, "mushroom"));

  //-------------------------------------------------------

  for (let x = 0; x < 37; x++) {
    for (let y = 0; y < 6; y++) {
      bricks.push(new Brick((x + 35) * cellSize, height - y * cellSize))
    }
  }

  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 5; y++) {
      bricks.push(new Brick((72 + x) * cellSize, height - y * cellSize));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 24; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((104 + x) * cellSize, height - y * cellSize));
    }
  }

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick((116 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick((123 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 6; y++) {
      bricks.push(new Brick((141 + x) * cellSize, height - y * cellSize))
    }
  }

  for (let x = 0; x < 18; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((144 + x) * cellSize, height - y * cellSize))
    }
  }

  //-------------------------------------------------------
  //Boss Floors
  for (let i = 0; i < 13; i++) {
    floors.push(new Floor((128 + i) * cellSize, height - cellSize * 4))
  }


  //-------------------------------------------------------

  //Ceiling

  for (let x = 0; x < 24; x++) {
    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick(x * cellSize, height - (y + 10) * cellSize));
    }
  }

  bricks.push(new Brick(23 * cellSize, height - 9 * cellSize));

  //-------------------------------------------------------

  for (let x = 0; x < 13; x++) {
    bricks.push(new Brick((24 + x) * cellSize, height - 12 * cellSize));
  }

  //-------------------------------------------------------

  for (let x = 0; x < 35; x++) {
    for (let y = 0; y < 4; y++) {
      bricks.push(new Brick((37 + x) * cellSize, height - (y + 9) * cellSize));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 90; x++) {
    bricks.push(new Brick((72 + x) * cellSize, height - cellSize * 12))
  }

  bricks.push(new Brick(80 * cellSize, height - cellSize * 11))

  bricks.push(new Brick(88 * cellSize, height - cellSize * 11))

  //-------------------------------------------------------

  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((97 + x) * cellSize, height - cellSize * (y + 10)))
    }
  }

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((123 + x) * cellSize, height - cellSize * (y + 10)))
    }
  }

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick((142 + x) * cellSize, height - cellSize * (y + 9)))
    }
  }

  //-------------------------------------------------------
  //Fireballs

    fireballs.push(new Fireball(23 * cellSize, height - 8 * cellSize, false))
  
    fireballs.push(new Fireball(30 * cellSize, height - 4 * cellSize, true))
  
    fireballs.push(new Fireball(37 * cellSize, height - 8 * cellSize, false))
  
    fireballs.push(new Fireball(49 * cellSize, height - 8 * cellSize, true))
  
    fireballs.push(new Fireball(60 * cellSize, height - 8 * cellSize, true))
  
    fireballs.push(new Fireball(67 * cellSize, height - 8 * cellSize, true))
  
    fireballs.push(new Fireball(76 * cellSize, height - 5 * cellSize, true))
  
    fireballs.push(new Fireball(80 * cellSize, height - 10 * cellSize, false))
  
    fireballs.push(new Fireball(84 * cellSize, height - 5 * cellSize, true))
  
    fireballs.push(new Fireball(88 * cellSize, height - 10 * cellSize, true))
  
    fireballs.push(new Fireball(92 * cellSize, height - 5 * cellSize, false))
  

  //-------------------------------------------------------
  //Hidden Coin Blocks

  bricks.push(new Brick(106 * cellSize, height - cellSize * 5, true, "coin", true));

  bricks.push(new Brick(107 * cellSize, height - cellSize * 9, true, "coin", true));

  bricks.push(new Brick(109 * cellSize, height - cellSize * 5, true, "coin", true));

  bricks.push(new Brick(110 * cellSize, height - cellSize * 9, true, "coin", true));

  bricks.push(new Brick(112 * cellSize, height - cellSize * 5, true, "coin", true));

  bricks.push(new Brick(113 * cellSize, height - cellSize * 9, true, "coin", true));

  //-------------------------------------------------------

  boss = new Boss(135 * cellSize, height - cellSize * 5)

  axe = new Axe(141 * cellSize, height - cellSize * 6)



  //-------------------------------------------------------
  //Need Flag to exist for game to function, due to my shit coding
  blocks.push(new Block(-100 * cellSize, height - 2 * cellSize));
  flag = new Flag(-100 * cellSize, height - 2 * cellSize); //finish flag
}

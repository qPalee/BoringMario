function createLevel1() { //Creates function that is called to load in first level
//Sets some variables requires for first level
  player.y = height - cellSize*2
  underground = false;
  //-------------------------------------------------------
  tempX = [23 * cellSize, 80 * cellSize, 82 * cellSize, 97 * cellSize, 98.5 * cellSize, 107 * cellSize, 114 * cellSize, 115.5 * cellSize, 124 * cellSize, 125.5 * cellSize, 128 * cellSize, 129.5 * cellSize];

  for (let i = 0; i < 69; i++) {
    floors.push(new Floor(i * cellSize, height));
    floors.push(new Floor(i * cellSize, height - cellSize));
  }

  //-------------------------------------------------------

  bricks.push(new Brick(17 * cellSize, height - cellSize * 5, true, "coin"));

  for (let i = 0; i < 5; i++) {
    if (i % 2 == 0) {
      bricks.push(new Brick(21 * cellSize + i * cellSize, height - cellSize * 5, false));
    } else {
      if (i == 1) {
        bricks.push(new Brick(21 * cellSize + i * cellSize, height - cellSize * 5, true, "mushroom"));
      } else {
        bricks.push(new Brick(21 * cellSize + i * cellSize, height - cellSize * 5, true, "coin"));
      }
    }
  }

  bricks.push(new Brick(23 * cellSize, height - cellSize * 9, true, "coin"));

  //-------------------------------------------------------

  pipes.push(new Pipe(29 * cellSize, height - cellSize * 2, 2, "vertical", false));
  pipes.push(new Pipe(39 * cellSize, height - cellSize * 2, 3, "vertical", false));
  enemies.push(new Enemy(41 * cellSize, height - cellSize * 2));
  pipes.push(new Pipe(47 * cellSize, height - cellSize * 2, 4, "vertical", false));
  enemies.push(new Enemy(50 * cellSize, height - cellSize * 2));
  enemies.push(new Enemy(51.5 * cellSize, height - cellSize * 2));
  pipes.push(new Pipe(58 * cellSize, height - cellSize * 2, 4, "vertical", true, -153.5, 0)); //ADD VALUE LATER

  //Invisible brick
  bricks.push(new Brick(65 * cellSize, height - cellSize * 6, true, "1UP", true));

  //-------------------------------------------------------

  for (let i = 0; i < 15; i++) {
    floors.push(new Floor(71 * cellSize + i * cellSize, height));
    floors.push(new Floor(71 * cellSize + i * cellSize, height - cellSize));
  }

  //-------------------------------------------------------

  bricks.push(new Brick(77 * cellSize, height - cellSize * 5, false));
  bricks.push(new Brick(78 * cellSize, height - cellSize * 5, true, "mushroom"));
  bricks.push(new Brick(79 * cellSize, height - cellSize * 5, false));

  for (let i = 0; i < 8; i++) {
    bricks.push(new Brick((80 + i) * cellSize, height - cellSize * 9));
  }



  //-------------------------------------------------------

  for (let i = 0; i < 62; i++) {
    floors.push(new Floor((89 + i) * cellSize, height));
    floors.push(new Floor((89 + i) * cellSize, height - cellSize));
  }

  //-------------------------------------------------------

  for (let i = 0; i < 3; i++) {
    bricks.push(new Brick((91 + i) * cellSize, height - cellSize * 9, false));
  }

  bricks.push(new Brick(94 * cellSize, height - cellSize * 9, true, "coin"));

  //-------------------------------------------------------

  bricks.push(new Brick(94 * cellSize, height - cellSize * 5, false));

  //-------------------------------------------------------

  for (let i = 0; i < 2; i++) {
    bricks.push(new Brick((100 + i) * cellSize, height - cellSize * 5, false));
  }

  //-------------------------------------------------------

  for (let i = 0; i < 3; i++) {
    bricks.push(new Brick((106 + i * 3) * cellSize, height - cellSize * 5, true, "coin"));

    if (i == 1) {
      bricks.push(new Brick((106 + i * 3) * cellSize, height - cellSize * 9, true, "mushroom"));
    }
  }

  //-------------------------------------------------------

  bricks.push(new Brick(118 * cellSize, height - cellSize * 5, false));

  for (let i = 0; i < 3; i++) {
    bricks.push(new Brick((121 + i) * cellSize, height - cellSize * 9, false));
  }

  //-------------------------------------------------------

  bricks.push(new Brick(127 * cellSize, height - cellSize * 5, false));
  bricks.push(new Brick(128 * cellSize, height - cellSize * 5, false));

  for (let i = 0; i < 4; i++) {
    if (i % 3 == 0) {
      bricks.push(new Brick((126 + i) * cellSize, height - cellSize * 9, false));
    } else {
      bricks.push(new Brick((126 + i) * cellSize, height - cellSize * 9, true, "coin"));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((131 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4 - x; y++) {
      blocks.push(new Block((138 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((145 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let i = 0; i < 4; i++) {
    blocks.push(new Block(150 * cellSize, height - (i + 2) * cellSize));
  }

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4 - x; y++) {
      blocks.push(new Block((153 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  //-------------------------------------------------------

  for (let i = 0; i < 54; i++) {
    floors.push(new Floor((153 + i) * cellSize, height));
    floors.push(new Floor((153 + i) * cellSize, height - cellSize));
  }

  //-------------------------------------------------------

  pipes.push(new Pipe(161 * cellSize, height - cellSize * 2, 2, "vertical", false)); //EXIT PIPE

  //-------------------------------------------------------

  enemies.push(new Enemy(164 * cellSize, height - cellSize * 2));
  enemies.push(new Enemy(165.5 * cellSize, height - cellSize * 2));

  //-------------------------------------------------------

  for (let i = 0; i < 4; i++) {
    if (i == 2) {
      bricks.push(new Brick((166 + i) * cellSize, height - cellSize * 5, true, "coin"));
    } else {
      bricks.push(new Brick((166 + i) * cellSize, height - cellSize * 5, false));
    }
  }

  //-------------------------------------------------------

  pipes.push(new Pipe(177 * cellSize, height - cellSize * 2, 2, "vertical", false))

  //-------------------------------------------------------

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((178 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let i = 0; i < 8; i++) {
    blocks.push(new Block(187 * cellSize, height - (i + 2) * cellSize));
  }

  blocks.push(new Block(193 * cellSize, height - 2 * cellSize));
  flag = new Flag(193 * cellSize, height - 2 * cellSize); //finish flag

  //-------------------------------------------------------
  //Bonus Area
  for (let i = 0; i < 16; i++) {
    floors.push(new Floor((210 + i) * cellSize, height))
    floors.push(new Floor((210 + i) * cellSize, height - cellSize))
  }

  for (let i = 0; i < 12; i++) {
    bricks.push(new Brick(210 * cellSize, height - (i + 1) * cellSize - (12 - i)));
  }

  for (let x = 0; x < 7; x++) {
    bricks.push(new Brick((214 + x) * cellSize, cellSize * 2));

    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick((214 + x) * cellSize, height - (y + 2) * cellSize + y))
    }
  }

  for (let i = 0; i < 7; i++) {
    items.push(new Coin((214 + i) * cellSize, height - cellSize * 5));
    items.push(new Coin((214 + i) * cellSize, height - cellSize * 7));
  }

  for (let i = 0; i < 5; i++) {
    items.push(new Coin((215 + i) * cellSize, height - cellSize * 9));
  }

  //-------------------------------------------------------

  pipes.push(new Pipe(223 * cellSize, height - cellSize * 2, 9, "horizontal", true, 50.5, height - cellSize * 3));
}

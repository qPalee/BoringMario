function createLevel2() { //Creates function that is called to load in second level
//Sets some variables requires for second level
  player.y = height - cellSize*2
  tempX = [36 * cellSize, 35 * cellSize, 64 * cellSize, 65 * cellSize, 79 * cellSize, 82 * cellSize, 83 * cellSize, 93 * cellSize, 119 * cellSize, 120.5 * cellSize, 122 * cellSize, 151.5 * cellSize, 152 * cellSize, 170*cellSize];

  for (let i = 0; i < 12; i++) {
    bricks.push(new Brick(-1 * cellSize, height - (i + 1) * cellSize - (12 - i)));
  }

  for (let i = 0; i < 16; i++) {
    floors.push(new Floor(i * cellSize, height));
    floors.push(new Floor(i * cellSize, height - cellSize));
  }

  pipes.push(new Pipe(12 * cellSize, height - cellSize * 2, 5, "vertical", false));
  pipes.push(new Pipe(10 * cellSize, height - cellSize * 2, 1, "horizontal", true, -18, height - cellSize * 3));

  //-------------------------------------------------------

  //Underground

  for (let i = 0; i < 84; i++) {
    floors.push(new Floor(16 * cellSize + i * cellSize, height))
    floors.push(new Floor(16 * cellSize + i * cellSize, height - cellSize))
  }

  //-------------------------------------------------------

  for (let i = 0; i < 12; i++) {
    bricks.push(new Brick(18 * cellSize, height - (i + 1) * cellSize - (12 - i)));
    bricks.push(new Brick(17 * cellSize, height - (i + 1) * cellSize - (12 - i)));
    bricks.push(new Brick(16 * cellSize, height - (i + 1) * cellSize - (12 - i)));
  }

  for (let i = 0; i < 134; i++) {
    bricks.push(new Brick(24 * cellSize + i * cellSize, cellSize * 2))
  }

  //-------------------------------------------------------

  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      bricks.push(new Brick(28 * cellSize + i * cellSize, height - cellSize * 5, true, "mushroom"));
    } else {
      bricks.push(new Brick(28 * cellSize + i * cellSize, height - cellSize * 5, true, "coin"));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((35 + x * 2) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let i = 0; i < 4; i++) {
    blocks.push(new Block(45 * cellSize, height - (i + 2) * cellSize));
  }

  for (let i = 0; i < 3; i++) {
    blocks.push(new Block(47 * cellSize, height - (i + 2) * cellSize));
    blocks.push(new Block(51 * cellSize, height - (i + 2) * cellSize));
  }

  for (let i = 0; i < 2; i++) {
    blocks.push(new Block(53 * cellSize, height - (i + 2) * cellSize));
  }

  bricks.push(new Brick(49 * cellSize, height - cellSize * 6, true, "coin"))

  enemies.push(new Enemy(49 * cellSize, height - cellSize * 2))

  //-------------------------------------------------------

  for (let i = 0; i < 3; i++) {
    bricks.push(new Brick(59 * cellSize, height - (i + 5) * cellSize))

    bricks.push(new Brick(61 * cellSize, height - (i + 5) * cellSize))

    bricks.push(new Brick(64 * cellSize, height - (i + 5) * cellSize))

    bricks.push(new Brick(66 * cellSize, height - (i + 5) * cellSize))
  }

  bricks.push(new Brick(60 * cellSize, height - 5 * cellSize))

  bricks.push(new Brick(65 * cellSize, height - 5 * cellSize))

  bricks.push(new Brick(62 * cellSize, height - 7 * cellSize))

  bricks.push(new Brick(63 * cellSize, height - 7 * cellSize))

  items.push(new Coin(60 * cellSize, height - 6 * cellSize))
  items.push(new Coin(65 * cellSize, height - 6 * cellSize))

  for (let i = 0; i < 4; i++) {
    items.push(new Coin((61 + i) * cellSize, height - cellSize * 9));
  }

  //-------------------------------------------------------

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick((74 + x) * cellSize, height - (3 + y) * cellSize))

      bricks.push(new Brick((74 + x) * cellSize, height - (10 + y) * cellSize));
    }

    for (let y = 0; y < 5; y++) {
      bricks.push(new Brick((72 + x) * cellSize, height - (5 + y) * cellSize));
    }
  }

  //-------------------------------------------------------

  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((78 + x) * cellSize, (3 + y) * cellSize));
    }

    bricks.push(new Brick((78 + x) * cellSize, height - 5 * cellSize));
  }

  for (let y = 0; y < 5; y++) {
    bricks.push(new Brick((82) * cellSize, height - (5 + y) * cellSize));

    bricks.push(new Brick((83) * cellSize, height - (5 + y) * cellSize));
  }

  for (let i = 0; i < 4; i++) {
    items.push(new Coin((78 + i) * cellSize, height - cellSize * 6));
  }

  //-------------------------------------------------------

  for (let i = 0; i < 4; i++) {
    bricks.push(new Brick((86 + i) * cellSize, 3 * cellSize));
    bricks.push(new Brick((86 + i) * cellSize, 4 * cellSize));
  }

  for (let i = 0; i < 5; i++) {
    bricks.push(new Brick((87) * cellSize, height - (i + 5) * cellSize));
  }

  bricks.push(new Brick((88) * cellSize, height - (5) * cellSize))

  bricks.push(new Brick(89 * cellSize, height - cellSize * 5, true, "mushroom"));

  //-------------------------------------------------------

  for (let i = 0; i < 5; i++) {
    bricks.push(new Brick((92) * cellSize, height - (5 + i) * cellSize))

    bricks.push(new Brick((93) * cellSize, height - (5 + i) * cellSize))
  }

  //-------------------------------------------------------

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 2; y++) {
      bricks.push(new Brick((96 + x) * cellSize, (3 + y) * cellSize));
    }

    bricks.push(new Brick((96 + x) * cellSize, height - 5 * cellSize));
  }

  //-------------------------------------------------------

  for (let i = 0; i < 37; i++) {
    floors.push(new Floor(103 * cellSize + i * cellSize, height))
    floors.push(new Floor(103 * cellSize + i * cellSize, height - cellSize))
  }

  //-------------------------------------------------------

  for (let i = 0; i < 6; i++) {
    bricks.push(new Brick((104 + i) * cellSize, height - 6 * cellSize));
    bricks.push(new Brick((104 + i) * cellSize, height - 7 * cellSize));

    items.push(new Coin((104 + i) * cellSize, height - 9 * cellSize))
  }

  //-------------------------------------------------------

  pipes.push(new Pipe(123 * cellSize, height - cellSize * 2, 3, "vertical", false));

  pipes.push(new Pipe(129 * cellSize, height - cellSize * 2, 4, "vertical", false));

  enemies.push(new Enemy(133 * cellSize, height - cellSize * 2))

  pipes.push(new Pipe(135 * cellSize, height - cellSize * 2, 2, "vertical", false));
  //-------------------------------------------------------

  for (let i = 0; i < 2; i++) {
    floors.push(new Floor(142 * cellSize + i * cellSize, height))
    floors.push(new Floor(142 * cellSize + i * cellSize, height - cellSize))

    bricks.push(new Brick(142 * cellSize + i * cellSize, height - cellSize * 2))
    bricks.push(new Brick(142 * cellSize + i * cellSize, height - cellSize * 3))
    bricks.push(new Brick(142 * cellSize + i * cellSize, height - cellSize * 4))
  }

  //-------------------------------------------------------

  for (let i = 0; i < 12; i++) {
    floors.push(new Floor(146 * cellSize + i * cellSize, height))
    floors.push(new Floor(146 * cellSize + i * cellSize, height - cellSize))
  }

  //-------------------------------------------------------

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((152 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  for (let i = 0; i < 4; i++) {
    blocks.push(new Block(157 * cellSize, height - (i + 2) * cellSize));
  }

  //-------------------------------------------------------

  platforms1.push(new Platform(160 * cellSize, height - cellSize * 2));
  platforms1.push(new Platform(160 * cellSize, height - cellSize * 8));

  //-------------------------------------------------------

  for (let i = 0; i < 8; i++) {
    floors.push(new Floor((166 + i) * cellSize, height))
    floors.push(new Floor((166 + i) * cellSize, height - cellSize))
  }

  for (let i = 0; i < 6; i++) {
    if (i == 5) {
      bricks.push(new Brick((166 + i) * cellSize, height - cellSize * 6, true, "mushroom"));
    } else {
      bricks.push(new Brick((166 + i) * cellSize, height - cellSize * 6, false));
    }
  }

  //-------------------------------------------------------

  platforms2.push(new Platform(176 * cellSize, height - cellSize * 2));
  platforms2.push(new Platform(176 * cellSize, height - cellSize * 8));

  //-------------------------------------------------------

  for (let x = 0; x < 23; x++) {

    floors.push(new Floor((182 + x) * cellSize, height))
    floors.push(new Floor((182 + x) * cellSize, height - cellSize))

    for (let y = 0; y < 3; y++) {
      bricks.push(new Brick(182 * cellSize + x * cellSize, height - cellSize * (2 + y)))
    }


    bricks.push(new Brick(182 * cellSize + x * cellSize, cellSize * 2))
  }

  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 7; y++) {
      bricks.push(new Brick((192 + x) * cellSize, height - cellSize * (y + 5)))
    }
  }

  //-------------------------------------------------------

  pipes.push(new Pipe(188 * cellSize, height - cellSize * 5, 5, "horizontal", true, -20.5, height - cellSize * 3));

  //-------------------------------------------------------

  for(let i = 0; i < 17; i++){
    floors.push(new Floor((205 + i) * cellSize, height))
    floors.push(new Floor((205 + i) * cellSize, height - cellSize))
  }

  pipes.push(new Pipe(207 * cellSize, height - cellSize * 2, 2, "vertical", false));

  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < x; y++) {
      blocks.push(new Block((209 + x) * cellSize, height - (y + 2) * cellSize));
    }
  }

  //-------------------------------------------------------
  blocks.push(new Block(219 * cellSize, height - 2 * cellSize));
  flag = new Flag(219 * cellSize, height - 2 * cellSize); //finish flag

}

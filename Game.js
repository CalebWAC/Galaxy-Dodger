/*
@title: Galaxy Dodger
@tags: ['space', 'asteroids', 'build']
@author: Caleb B
*/

// define the sprites in our game
const player = "p";
const asteroidU = "u";
const asteroidL = "l";
const asteroidR = "r";
const asteroidD = "d";

const noise = tune `
329.6703296703297,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485,
164.83516483516485: F4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: E5~164.83516483516485,
164.83516483516485: D5~164.83516483516485,
164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: C5~164.83516483516485,
164.83516483516485: B4~164.83516483516485,
164.83516483516485: A4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
494.50549450549454,
164.83516483516485: D4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
164.83516483516485: G4~164.83516483516485,
164.83516483516485: E4~164.83516483516485,
659.3406593406594`

const dundundun = tune `
92.3076923076923: A4^92.3076923076923 + G4^92.3076923076923,
92.3076923076923: G4^92.3076923076923 + F4^92.3076923076923,
92.3076923076923: F4^92.3076923076923 + E4^92.3076923076923,
92.3076923076923: E4^92.3076923076923 + D4^92.3076923076923,
92.3076923076923: D4^92.3076923076923 + C4^92.3076923076923,
92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
276.9230769230769,
92.3076923076923: C4-92.3076923076923,
1569.2307692307693`

let backmusic = playTune(noise, Infinity)

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
........3.......
........1.......
........1.......
........1.......
.......111......
......11111.....
..3...11311...3.
..1..1122211..1.
..1..1122211..1.
..1..1112111..1.
..1111111111111.
..1111111111111.
...11111111111..
....111111111...
.......111......
........1.......`],
  [ asteroidU, bitmap`
................
....CCCC........
...CCCCCCCCC....
...CCCCCCCCCCC..
..CCCCC111CCCCC.
.CCCC11CCCCCCCC.
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
...CCCCCCC1CCCCC
...CCCCC11CCCCCC
...C1CC11CCCCCC.
...CCCCCCCCCCC..
....CCCCCC1CCC..
.....CCCCCCCCC..
.......CCCCCC...
................`],
  [ asteroidD, bitmap `
................
................
....LLLLLLL.....
...LLLLLLLLL....
..LLLLLLLLLLL...
..LLLL1111LLL...
..LL11LLLLLLL...
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
.LLLLL11LLLLLL..
..LLLLL1LLL1LLL.
..LLLLL1LLLL1LL.
...L1LLL1LLL11L.
...LLLLL11LLL1L.
...LLLLLL1LLLL..
....LLLLLLLLL...
.......LLLL.....`],
  [ asteroidL, bitmap `
................
................
....LLLLLLL.....
...LLLLLLLLL....
..LLLLLLLLLLL...
..LLLL1111LLL...
..LL11LLLLLLL...
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
.LLLLL11LLLLLL..
..LLLLL1LLL1LLL.
..LLLLL1LLLL1LL.
...L1LLL1LLL11L.
...LLLLL11LLL1L.
...LLLLLL1LLLL..
....LLLLLLLLL...
.......LLLL.....`],
  [ asteroidR, bitmap `
................
....CCCC........
...CCCCCCCCC....
...CCCCCCCCCCC..
..CCCCC111CCCCC.
.CCCC11CCCCCCCC.
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
...CCCCCCC1CCCCC
...CCCCC11CCCCCC
...C1CC11CCCCCC.
...CCCCCCCCCCC..
....CCCCCC1CCC..
.....CCCCCCCCC..
.......CCCCCC...
................`]
)

const level = map `
................................
................................
................................
................................
..u.............................
................................
................................
................................
................................
................................
................................
................................
................................
................................
................................
.............p..................
................................
................................
................................
................................
................................
................................
................................
................................
................................
................................`

// set the map displayed to the current level
// const currentLevel = levels[level];
setMap(level);

let gameOver = false

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
});


function moveAsteroids() {
  getAll(asteroidU).forEach(ast => { 
    if (ast.y == height() - 1) { ast.remove(); }
    ast.y += 1; 
  });

  getAll(asteroidD).forEach(ast => { 
    if (ast.y == 0) { ast.remove(); }
    ast.y -= 1; 
  });

  getAll(asteroidL).forEach(ast => { 
    if (ast.x == width() - 1) { ast.remove(); }
    ast.x += 1; 
  });

  getAll(asteroidR).forEach(ast => { 
    if (ast.x == 0) { ast.remove(); }
    ast.x -= 1; 
  });
}

function checkForCollision() {
  let p = getFirst(player)
  getAll(asteroidU).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { gameOver = true; backmusic.end(); playTune(dundundun); addText("Game Over", { x: 10, y: 10, color: color`3` })}})
  getAll(asteroidD).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { gameOver = true; backmusic.end(); playTune(dundundun); addText("Game Over", { x: 10, y: 10, color: color`3` })}})
  getAll(asteroidL).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { gameOver = true; backmusic.end(); playTune(dundundun); addText("Game Over", { x: 10, y: 10, color: color`3` })}})
  getAll(asteroidR).forEach(ast => { if (ast.x == p.x && ast.y == p.y) { gameOver = true; backmusic.end(); playTune(dundundun); addText("Game Over", { x: 10, y: 10, color: color`3` })}})
}

function gameLoop() {
  if (!gameOver) {
    moveAsteroids()
    checkForCollision()
    
    setTimeout(gameLoop, 100)
  }
}

function genAsteroids() {
  if (!gameOver) {
    switch (Math.floor(Math.random() * 4)) {
      case 0:   addSprite(Math.floor(Math.random() * width()), 0, asteroidU); break;
      case 1:   addSprite(Math.floor(Math.random() * width()), 25, asteroidD); break;
      case 2:   addSprite(0, Math.floor(Math.random() * height()), asteroidL); break;
      case 3:   addSprite(31, Math.floor(Math.random() * height()), asteroidR); break;
    }
    
    setTimeout(genAsteroids, 250)
  }
}

gameLoop()
genAsteroids()
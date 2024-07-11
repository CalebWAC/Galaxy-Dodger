/*
@title: getting_started
@tags: ['beginner', 'tutorial']
@addedOn: 2022-07-26
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const asteroid = "a";

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
  [ asteroid, bitmap`
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
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
...............
...............
.a.............
...............
...............
...............
...............
.......p.......
...............
...............
...............
...............
...............
...............
...............`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

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
  playTune(noise)
});

function gameLoop() {
  getFirst(asteroid).y += 1

  for (a in getAll(asteroid)) {
    console.log(a)
    if (a.y >= height() - 5) {
      a.remove()
    }
  }
  
  setTimeout(gameLoop, 400)
}

gameLoop()
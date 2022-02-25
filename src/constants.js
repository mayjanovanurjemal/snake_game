const CANVAS_SIZE = [700, 380]
const APPLE_START = [8, 3];
const SCALE = 20;
const SPEED = 250;
const SNAKE_START = [
  [8, 7],
  [8, 8]
];

const DIRECTIONS = {
  38: [0, -1],
  40: [0, 1],
  37: [-1, 0],
  39: [1, 0]
};

export {
  CANVAS_SIZE,
  SNAKE_START,
	APPLE_START,
	DIRECTIONS,
	SCALE,
	SPEED
};
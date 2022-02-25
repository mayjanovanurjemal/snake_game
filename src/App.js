import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from './useInterval';
import {
	CANVAS_SIZE,
	APPLE_START,
	DIRECTIONS,
	SCALE,
	SNAKE_START,
	SPEED,
} from './constants';

const App = () => {
  const canvasRef = useRef(null);
	const [snake, setSnake] = useState(SNAKE_START);
	const [apple, setApple] = useState(APPLE_START);
	const [dir, setDir] = useState([0, -1]);
	const [speed, setSpeed] = useState(null);
	const [gameOver, setGameOver] = useState(false);

const startGame = () => {
	setSnake(SNAKE_START);
	setApple(APPLE_START);
	setDir([0, -1]);
	setSpeed(SPEED);
	setGameOver(false);
};

const endGame = () => {
	setSpeed(null);
	setGameOver(true);
};

const moveSnake = ({ keyCode }) => setDir(DIRECTIONS[keyCode]);

const createApple = () =>
	apple.map((_, i) => Math.floor((Math.random() * CANVAS_SIZE[i]) / SCALE));

const checkCollision = (piece, snk = snake) => {
	if (
		piece[0] * SCALE >= CANVAS_SIZE[0] ||
		piece[0] < 0 ||
		piece[1] * SCALE >= CANVAS_SIZE[1] ||
		piece[1] < 0
	)
		return true;
	for (const segment of snk) {
		if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
	}
	return false;
};

const checkAppleCollision = (newSnake) => {
	if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
		let newApple = createApple();
		while (checkCollision(newApple, newSnake)) {
			newApple = createApple();
		}
		setApple(newApple);
		return true;
	}
	return false;
};

const gameLoop = () => {
	const snakeCopy = JSON.parse(JSON.stringify(snake));
	const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
	snakeCopy.unshift(newSnakeHead);
	if (checkCollision(newSnakeHead)) endGame();
	if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
	setSnake(snakeCopy);
};

useEffect(() => {
	const context = canvasRef.current.getContext('2d');
	// if (context == null) throw new Error('Could not get context');
	context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
	context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
	context.fillStyle = 'red';
	snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
	context.fillStyle = 'blue';
	context.fillRect(apple[0], apple[1], 1, 1);
}, [snake, apple, gameOver]);

useInterval(() => gameLoop(), speed);

return (
<div role='button' tabIndex='0' onKeyDown={(e) => moveSnake(e)}>
	{gameOver && <div><h2>GAME OVER!!</h2></div>}
	<canvas
	style={{ border: '5px double', marginLeft: '70px'}}
	ref={canvasRef}
	width={`${CANVAS_SIZE[0]}px`}
	height={`${CANVAS_SIZE[1]}px`}
	/>
	<button className='start-button' onClick={startGame}>Start Game</button>
</div>

);

};

export default App;
const CANVAS = document.getElementById('game');
const CTX = CANVAS.getContext("2d");
const SCORE = document.getElementById('score');
const RESTART_BUTTON = document.getElementById('buttonRestart');

const GROUND = new Image();
const FOOD = new Image();
const GAMEOVER = new Image();



GROUND.src = 'src/img/ground.png';
FOOD.src = 'src/img/food.png';
GAMEOVER.src = 'src/img/gameover.png';

let box = 32;
let score = 1;
let check = 1;
let maxScore = 0;

function eat() {
	const AUDIO = new Audio();
	AUDIO.src = 'src/audio/eat.mp3';
	AUDIO.autoplay = true;
}





let foodCordination = {
	x: Math.floor((Math.random() * 20)) * box,
	y: Math.floor((Math.random() * 20)) * box
};



let snake = [];
snake[0] = {
	x: 10 * box,
	y: 10 * box
}

function startGame() {
	if (check == 0) {
		clearInterval(menu);
		game = setInterval(drawGame, 100);
	}
	score = 1;
	SCORE.innerHTML = "";
	SCORE.append(score);
	snake = [];
	snake[0] = {
		x: 10 * box,
		y: 10 * box
	}
	dir = '';
	check = 1;
	foodCordination = {
		x: Math.floor((Math.random() * 20)) * box,
		y: Math.floor((Math.random() * 20)) * box
	};
}

function overMenu() {
	if (maxScore < score) {
		maxScore = score;
	}
	CTX.fillStyle = "rgb(125, 255, 208)";
	CTX.font = "50px Poppins sans-serif";
	CTX.fillText("GAME OVER", box * 6, box * 6);
	CTX.font = "30px Poppins sans-serif";
	CTX.fillText(`SCORE: ${score}`, box * 6, box * 9);
	CTX.fillText(`MAX SCORE: ${maxScore}`, box * 6, box * 12);
}

function gameOver() {
	CTX.clearRect(0, 0, 672, 672);
	clearInterval(game);
	menu = setInterval(overMenu, 100);
	check = 0;
}

RESTART_BUTTON.addEventListener("click", startGame);

document.addEventListener("keydown", direction);

let dir;

function direction(event){
	if ((event.code == 'KeyA' || event.key == 'ArrowLeft') && dir != 'right') {
		dir = 'left';
	}
	else if ((event.code == 'KeyW' || event.key == 'ArrowUp') && dir != 'down') {
		dir = 'up';
	}
	else if ((event.code == 'KeyD' || event.key == 'ArrowRight') && dir != 'left') {
		dir = 'right';
	}
	else if ((event.code == 'KeyS' || event.key == 'ArrowDown') && dir != 'up') {
		dir = 'down';
	}
}


function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++){
		if (head.x == arr[i].x && head.y == arr[i].y)
			gameOver();
	}
}


function drawGame() {
	CTX.drawImage(GROUND, 0, 0);
	CTX.drawImage(FOOD, foodCordination.x, foodCordination.y);


	for (let i = 0; i < snake.length; i++){
		CTX.fillStyle = i == 0 ? "rgb(215, 215, 215)" : "rgb(125, 255, 208)";
		CTX.fillRect(snake[i].x, snake[i].y, box, box);
	}

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == foodCordination.x && snakeY == foodCordination.y) {
		eat();
		++score;
		SCORE.innerHTML = "";
		SCORE.append(score);
		foodCordination = {
			x: Math.floor((Math.random() * 20)) * box,
			y: Math.floor((Math.random() * 20)) * box
		}
	}
	else{
		snake.pop();
	}

	if (snakeX < 0 || snakeX > box * 20 || snakeY < 0 || snakeY > box * 20) {
		gameOver();
		snakeX = 10 * box;
		snakeY = 10 * box;
	}
	if (dir == 'left') snakeX -= box;
	if (dir == 'right') snakeX += box;
	if (dir == 'up') snakeY -= box;
	if (dir == 'down') snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

game = setInterval(drawGame, 100);

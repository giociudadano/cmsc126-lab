const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const mapBounds = []
for (let i = 0; i < bounds.length; i += 52){
	mapBounds.push(bounds.slice(i, 52 + i));
}

const mapZones = []
for (let i = 0; i < zones.length; i += 52){
	mapZones.push(zones.slice(i, 52 + i));
}

const screenOffset = {x: -1088, y: -464};

const graphics = canvas.getContext('2d');
graphics.scale(2, 2);
graphics.imageSmoothingEnabled = false;

const mapBGImage = new Image();
mapBGImage.src = '../assets/background.png';
const mapFGImage = new Image();
mapFGImage.src = '../assets/foreground.png';

const playerImageDown = new Image();
playerImageDown.src = '../assets/Alex_run_32x32_down.png';
const playerImageLeft = new Image();
playerImageLeft.src = '../assets/Alex_run_32x32_left.png';
const playerImageRight = new Image();
playerImageRight.src = '../assets/Alex_run_32x32_right.png';
const playerImageUp = new Image();
playerImageUp.src = '../assets/Alex_run_32x32_up.png';

const boundaries = []
mapBounds.forEach((row, i) => {
	row.forEach((tile, j) => {
		if (tile === 124){
			boundaries.push(new Boundary(
				{position: {x: j * 32 + screenOffset.x, y: i * 32 + screenOffset.y}}
				));
		}
	})
});

const battlezones = []
mapZones.forEach((row, i) => {
	row.forEach((tile, j) => {
		if (tile === 423){
			battlezones.push(new Boundary(
				{position: {x: j * 32 + screenOffset.x, y: i * 32 + screenOffset.y}}
				));
		}
	})
});

const background = new Sprite({
	position: {x: screenOffset.x, y: screenOffset.y},
	image: mapBGImage
});

const foreground = new Sprite({
	position: {x: screenOffset.x, y: screenOffset.y},
	image: mapFGImage
});

const keys = {
	w: {pressed: false},
	a: {pressed: false},
	s: {pressed: false},
	d: {pressed: false},
}

const player = new Sprite({
	position: {
		x: (canvas.width / 2) - (192 / 6) - (32 * 8),
		y: (canvas.height / 2) - (64) - (32 * 4)
	},
	image: playerImageDown,
	frames: {
		max: 6
	},
	sprites: {
		up: playerImageUp,
		down: playerImageDown,
		left: playerImageLeft, 
		right: playerImageRight
	}
})

const moveObjects = [background, ...boundaries, foreground, ...battlezones];
let isBattling = false;

function isColliding(a, b){
	if (a.position.x + a.width - 1 > b.position.x){
		if (a.position.x + 1 < b.position.x + b.width){
			if (a.position.y + 48 < b.position.y + b.height){
				if (a.position.y + a.height > b.position.y){
					return true;
				}
			}
		}
	}
	return false;
}

function isOverlapping(a, b){
	const overlappingArea = 
		(Math.min(a.position.x + a.width, b.position.x + b.width) - Math.max(a.position.x, b.position.x)) *
		(Math.min(a.position.y + a.height + 16, b.position.y + b.height) - Math.max(a.position.y, b.position.y));
	return overlappingArea > ((a.width * a.height) * 0.40);

}

function animate(){
	window.requestAnimationFrame(animate);
	background.draw();
	player.draw();
	foreground.draw();
	let isMoving = true;
	player.isMoving = false;

	if (isBattling) {
		return;
	}

	if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
		for (let i = 0; i < battlezones.length; i++){
			const battlezone = battlezones[i];
			if (isColliding(player, battlezone)){
				if(isOverlapping(player, battlezone)){
					if (Math.random() < 0.01){
						isBattling = true;
					}
				}
			}
		}
	}

	if (keys.w.pressed){
		if (lastKey === 'w'){
			player.image = player.sprites.up;
			player.isMoving = true;
			for (let i = 0; i < boundaries.length; i++){
				const boundary = boundaries[i];
				if (isColliding(player, {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 3}})){
					isMoving = false;
					break;
				}
			}
			if (isMoving){
				moveObjects.forEach(object => {object.position.y += 3})
			}
		}
	} else if (keys.a.pressed){
		if (lastKey === 'a'){
			player.image = player.sprites.left;
			player.isMoving = true;
			for (let i = 0; i < boundaries.length; i++){
				const boundary = boundaries[i];
				if (isColliding(player, {...boundary, position: {x: boundary.position.x + 3, y: boundary.position.y}})){
					isMoving = false;
					break;
				}
			}
			if (isMoving){
				moveObjects.forEach(object => {object.position.x += 3})
			}
		}
	} else if (keys.s.pressed){
		if (lastKey === 's'){
			player.image = player.sprites.down;
			player.isMoving = true;
			for (let i = 0; i < boundaries.length; i++){
				const boundary = boundaries[i];
				if (isColliding(player, {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 3}})){
					isMoving = false;
					break;
				}
			}
			if (isMoving){
				moveObjects.forEach(object => {object.position.y -= 3})
			}
		}
	} else if (keys.d.pressed){
		player.image = player.sprites.right;
		if (lastKey === 'd'){
			player.isMoving = true;
			for (let i = 0; i < boundaries.length; i++){
				const boundary = boundaries[i];
				if (isColliding(player, {...boundary, position: {x: boundary.position.x - 3, y: boundary.position.y}})){
					isMoving = false;
					break;
				}
			}
			if (isMoving){
				moveObjects.forEach(object => {object.position.x -= 3})
			}
		}	
	}

}
animate()

let lastKey = ''
window.addEventListener('keydown' , (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = true;
			lastKey = 'w';
			break;
		case 'a':
			keys.a.pressed = true;
			lastKey = 'a';
			break;
		case 's':
			keys.s.pressed = true;
			lastKey = 's';
			break;
		case 'd':
			keys.d.pressed = true;
			lastKey = 'd';
			break;
	}
});

window.addEventListener('keyup' , (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = false;
			break;
		case 'a':
			keys.a.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
	}
});
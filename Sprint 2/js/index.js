const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const mapBounds = []
for (let i = 0; i < bounds.length; i += 44){
	mapBounds.push(bounds.slice(i, 44 + i));
}

const screenOffset = {x: -896, y: -304};

const graphics = canvas.getContext('2d');
graphics.scale(2, 2);
graphics.imageSmoothingEnabled = false;

const mapImage = new Image();
mapImage.src = '../assets/background.png';
const playerImage = new Image();
playerImage.src = '../assets/Alex_run_32x32.png';

class Boundary {
	constructor({position}) {
		this.position = position;
		this.width = 32;
		this.height = 32;
	}

	draw() {
		graphics.fillStyle = 'rgba(255, 255, 255, 0.2)';
		graphics.fillRect(this.position.x, this.position.y, 32, 32);
	}
}

const boundaries = []
mapBounds.forEach((row, i) => {
	row.forEach((tile, j) => {
		if (tile === 124){
			boundaries.push(new Boundary(
				{position: {x: j * 32 + screenOffset.x, y: i * 32 + screenOffset.y}}
				));
		}
	})
})

class Sprite {
	constructor({position, image, frames = {max: 1}}) {
		this.position = position;
		this.image = image;
		this.frames = frames;
		this.image.onload = () => {
			this.width = this.image.width / this.frames.max
			this.height = this.image.height
		}
	}

	draw(){
		graphics.drawImage(this.image,
			0,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y,
			this.image.width / this.frames.max,
			this.image.height
		);
	}
}

const background = new Sprite({
	position: {x: screenOffset.x, y: screenOffset.y},
	image: mapImage
});

const keys = {
	w: {pressed: false},
	a: {pressed: false},
	s: {pressed: false},
	d: {pressed: false},
}

const player = new Sprite({
	position: {
		x: (canvas.width / 2) - (768 / 24) - (32 * 8),
		y: (canvas.height / 2) - (64) - (32 * 4)
	},
	image: playerImage,
	frames: {
		max: 24
	}
})

const moveObjects = [background, ...boundaries];

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

function animate(){
	window.requestAnimationFrame(animate);
	background.draw();
	boundaries.forEach((boundary) => {
		boundary.draw();	
	})
	player.draw();

	let isMoving = true;
	if (keys.w.pressed){
		if (lastKey === 'w'){
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
		if (lastKey === 'd'){
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
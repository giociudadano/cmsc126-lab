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
	}

	draw() {
		graphics.fillStyle = 'red';
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

const test = new Boundary({position:{x: 0, y:0}});

const moveObjects = [background, test];

function animate(){
	window.requestAnimationFrame(animate);
	background.draw();
	test.draw();
	player.draw();
	//boundaries.forEach(boundary => {
	//	boundary.draw();
	//})
	if (keys.w.pressed && lastKey === 'w'){
		moveObjects.forEach(object => {object.position.y += 3})
	} else if (keys.a.pressed && lastKey === 'a'){
		moveObjects.forEach(object => {object.position.x += 3})
	} else if (keys.d.pressed && lastKey === 'd'){
		moveObjects.forEach(object => {object.position.x -= 3})
	} else if (keys.s.pressed && lastKey === 's'){
		moveObjects.forEach(object => {object.position.y -= 3})
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
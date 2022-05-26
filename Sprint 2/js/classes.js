class Boundary {
	constructor({position}) {
		this.position = position;
		this.width = 32;
		this.height = 32;
	}

	debug() {
		graphics.fillStyle = 'rgba(255, 255, 255, 0.2)';
		graphics.fillRect(this.position.x, this.position.y, 32, 32);
	}
}

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
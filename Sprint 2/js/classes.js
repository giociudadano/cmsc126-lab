class Boundary {
	constructor({position}) {
		this.position = position;
		this.width = 32;
		this.height = 32;
	}

	debug() {
		graphics.fillStyle = 'rgba(255, 255, 255, 0.3)';
		graphics.fillRect(this.position.x, this.position.y, 32, 32);
	}
}

class Sprite {
	constructor({position, image, frames = {max: 1}, sprites}) {
		this.position = position;
		this.image = image;
		this.frames = {...frames, frame: 0, timeElapsed: 0}
		this.image.onload = () => {
			this.width = this.image.width / this.frames.max
			this.height = this.image.height
		}
		this.isMoving = false;
		this.sprites = sprites;
	}

	draw(){
		graphics.drawImage(this.image,
			this.frames.frame * this.width,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y,
			this.image.width / this.frames.max,
			this.image.height
		);
		if (!this.isMoving){return;}
		if (this.frames.max > 1){
			this.frames.timeElapsed++;
			if (this.frames.timeElapsed % 10 === 0){
				this.frames.frame = (this.frames.frame + 1) % (this.frames.max);
			}
		}
	}
}
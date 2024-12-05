import { CharacterNode } from "../nodes/character-node.js";

export class PacmanNode extends CharacterNode {
    constructor(x, y) {
        super(x, y, 40, 40, 250);
        this._addEventListeners();
    }

    loadImages() {
        const filePath = './sprites/PacMan{{i}}.png'
        const promises = [];

        for (let i = 0; i < 4; i++) {
            const image = new Image();
            image.src = filePath.replace('{{i}}', i.toString());
            promises.push(new Promise((resolve, reject) => {
                image.onload = () => resolve(image);
                image.onerror = reject;
            }));
        }

        return Promise.all(promises).then(images => {
            this.sprites = images;
        })
    }

    draw() {
        // calculate the index by dividing the current time by the animation speed, modulo ensures that the index is always within the range of the animation sprites
        const spriteIndex = Math.floor(Date.now() / this.currentAnimationSpeed) % this.sprites.length;
        const sprite = this.sprites[spriteIndex];

        this.ctx.save(); // Save the current context state
        this.ctx.translate(this.x + sprite.width / 2, this.y + sprite.height / 2); // translate to the character position

        // rotate the context based on the character's direction
        switch (this.rotation) {
            case 'up':
                this.ctx.rotate(-Math.PI / 2);
                break;
            case 'down':
                this.ctx.rotate(Math.PI / 2);
                break;
            case 'left':
                this.ctx.rotate(Math.PI);
                this.ctx.scale(1, -1); // flip vertically
                break;
            case 'right':
                break;
        }

        this.ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
        this.ctx.restore(); // restore the context to its original state
    }

    update(deltaTime, collisionNodes) {
        let newX = this.x + this.xVelocity * (deltaTime ?? 0);
        let newY = this.y + this.yVelocity * (deltaTime ?? 0);

        // Temporarily update position to check for collisions
        this.x = newX;
        this.y = newY;

        if (this.checkCollision(collisionNodes)) {
            // Revert position if collision detected
            this.x -= this.xVelocity * (deltaTime ?? 0);
            this.y -= this.yVelocity * (deltaTime ?? 0);
            this.stop();
            this.isColliding = true;
        } else {
            this.isColliding = false;
        }

        this._screenWrap();

        this.updateCallback();
    }

    _screenWrap() {
        const boxBounds = this.getBoxBounds();
        if (boxBounds.left > this.canvasBounds.right) {
            this.x = this.canvasBounds.left - this.width;
        } else if (boxBounds.right < this.canvasBounds.left) {
            this.x = this.canvas.width;
        }

        if (boxBounds.top > this.canvasBounds.bottom) {
            this.y = this.canvasBounds.top - this.height;
        } else if (boxBounds.bottom < this.canvasBounds.top) {
            this.y = this.canvas.height;
        }
    }

    _addEventListeners() {
        document.addEventListener("keydown", this._move.bind(this));
        document.addEventListener("keyup", this.stop.bind(this));
    }

    _move(event) {
        // Normalize the key value to lowercase in order to check for arrows keys more easily
        const key = event.key.toLowerCase();

        if (['w', 'arrowup'].includes(key)) {
            this.yVelocity = -this.velocity;
            this.xVelocity = 0;
            this.rotation = 'up';
            this.currentAnimationSpeed = this.animationSpeed * this.spriteAnimationMovingFactor;
        }

        if (['s', 'arrowdown'].includes(key)) {
            this.yVelocity = this.velocity;
            this.xVelocity = 0;
            this.rotation = 'down';
            this.currentAnimationSpeed = this.animationSpeed * this.spriteAnimationMovingFactor;
        }

        if (['a', 'arrowleft'].includes(key)) {
            this.xVelocity = -this.velocity;
            this.yVelocity = 0;
            this.rotation = 'left';
            this.currentAnimationSpeed = this.animationSpeed * this.spriteAnimationMovingFactor;
        }

        if (['d', 'arrowright'].includes(key)) {
            this.xVelocity = this.velocity
            this.yVelocity = 0;
            this.rotation = 'right';
            this.currentAnimationSpeed = this.animationSpeed * this.spriteAnimationMovingFactor;
        }
    }
}
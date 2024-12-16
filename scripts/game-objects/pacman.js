import {CharacterNode} from "../nodes/character-node.js";
import {loadImageByPath} from "../lib/image.js";

export class Pacman extends CharacterNode {
    prevX;
    prevY;

    constructor(x, y) {
        super(x, y, 40, 40, 40 * 5);
        this._addEventListeners();
    }

    loadImages() {
        const filePath = './sprites/PacMan{{i}}.png'
        const promises = [];

        for (let i = 0; i < 4; i++) {
            promises.push(loadImageByPath(filePath.replace('{{i}}', i.toString())));
        }

        return Promise.all(promises).then(images => {
            this.sprites = images;
        })
    }

    update(deltaTime) {
        this.prevX = this.x;
        this.prevY = this.y;

        this.x = this.x + this.xVelocity * (deltaTime ?? 0);
        this.y = this.y + this.yVelocity * (deltaTime ?? 0);

        this._screenWrap();

        this.updateCallback();
    }

    _resetToLastFrame() {
        if(this.prevX && this.prevY) {
            this.x = this.prevX;
            this.y = this.prevY;
            this.stop();
        }
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

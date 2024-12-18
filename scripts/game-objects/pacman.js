import {CharacterNode} from "../nodes/character-node.js";
import {Wall} from "./wall.js";
import {Candy} from "./candy.js";

export class Pacman extends CharacterNode {
    prevX;
    prevY;

    constructor(x, y) {
        super(x, y, 40, 40, 40 * 5);
        this.animatedSpriteNode.setConfig({
            spritePath: 'sprites/frog-{{i}}.png',
            numberOfSprites: 2,
            animationSpeed: 300,
        })
        this._addEventListeners();
    }

    update(deltaTime) {
        this.prevX = this.x;
        this.prevY = this.y;

        this.x = this.x + this.xVelocity * (deltaTime ?? 0);
        this.y = this.y + this.yVelocity * (deltaTime ?? 0);

        this._screenWrap();

        this.updateCallback();
    }

    onCollision(node) {
        if(node instanceof Wall) {
            this._resetToLastFrame();
        }

        if(node instanceof Candy) {
            node.destroy();
        }
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
            this.animatedSpriteNode.setAnimationMovingSpeed();
        }

        if (['s', 'arrowdown'].includes(key)) {
            this.yVelocity = this.velocity;
            this.xVelocity = 0;
            this.rotation = 'down';
            this.animatedSpriteNode.setAnimationMovingSpeed();
        }

        if (['a', 'arrowleft'].includes(key)) {
            this.xVelocity = -this.velocity;
            this.yVelocity = 0;
            this.rotation = 'left';
            this.animatedSpriteNode.setAnimationMovingSpeed();
        }

        if (['d', 'arrowright'].includes(key)) {
            this.xVelocity = this.velocity
            this.yVelocity = 0;
            this.rotation = 'right';
            this.animatedSpriteNode.setAnimationMovingSpeed();
        }
    }
}

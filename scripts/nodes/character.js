import { BaseNode } from "./base-node.js";

export class Character extends BaseNode {
    velocity = 160;
    xVelocity = 0;
    yVelocity = 0;
    animationSpeed = 80;
    currentAnimationSpeed = 80;
    spriteAnimationMovingFactor = 0.6;
    /**
     * @type {Image[]}
     */
    sprites = [];
    /**
     * @type {'right', 'left', 'up', 'down'}
     */
    rotation = 'right';
    updateCallback = () => {
    };

    constructor(x, y, width, height, velocity = 160, animationSpeed = 80, currentAnimationSpeed = 80, spriteAnimationMovingFactor = 0.6, rotation = 'right') {
        super(x ?? 0, y ?? 0, width, height);
        this.velocity = velocity;
        this.animationSpeed = animationSpeed;
        this.currentAnimationSpeed = currentAnimationSpeed;
        this.spriteAnimationMovingFactor = spriteAnimationMovingFactor;
        this.rotation = rotation;
        this._addEventListeners();
    }

    /**
     * Called when data is received and should update the data buffer
     * for each of the charts
     *
     * @abstract
     * @return {Promise<void>}
     */
    loadImages() {
    }

    /**
     * Called when the node should draw on the canvas
     * @abstract
     * @return void
     */
    draw() {

    }

    update(deltaTime) {
        this.x += this.xVelocity * (deltaTime ?? 0);
        this.y += this.yVelocity * (deltaTime ?? 0);

        if (this.x > this.canvas.width) {
            this.x = 0 - this.width;
        } else if (this.x + this.width < 0) {
            this.x = this.canvas.width;
        }

        if (this.y > this.canvas.height) {
            this.y = 0 - this.height;
        } else if (this.y + this.height < 0) {
            this.y = this.canvas.height;
        }

        this.updateCallback();
    }
}
import {BaseNode} from "./base-node.js";
import {CanvasItemNode} from "./canvas-item-node.js";
import {checkCollision} from "../lib/collision.js";

export class CharacterNode extends CanvasItemNode {
    velocity = 160;
    xVelocity = 0;
    yVelocity = 0;
    animationSpeed = 80;
    currentAnimationSpeed = 80;
    spriteAnimationMovingFactor = 0.6;

    /**
     * Array of images that will be used to draw the character
     * @type {Image[]}
     */
    sprites = [];
    /**
     * The current rotation of the character
     * @type {'right', 'left', 'up', 'down'}
     */
    rotation = 'right';
    /**
     * Callback function that will be called when the character is updated
     * @type {() => void}
     */
    updateCallback = () => {
    };

    constructor(x, y, width, height, velocity = 160, animationSpeed = 80, currentAnimationSpeed = 80, spriteAnimationMovingFactor = 0.6, rotation = 'right') {
        super(x ?? 0, y ?? 0, width, height);
        this.velocity = velocity;
        this.animationSpeed = animationSpeed;
        this.currentAnimationSpeed = currentAnimationSpeed;
        this.spriteAnimationMovingFactor = spriteAnimationMovingFactor;
        this.rotation = rotation;
    }

    /**
     * Load the images that will be used to draw the character
     *
     * @abstract
     * @return {Promise<void>}
     */
    loadImages() {
    }

    draw() {
        // calculate the index by dividing the current time by the animation speed, modulo ensures that the index is always within the range of the animation sprites
        if ((this.sprites || []).length === 0) return;

        let sprite
        if (this.sprites.length === 1) {
            sprite = this.sprites[0];
        } else {
            sprite = this.sprites[Math.floor(Date.now() / this.currentAnimationSpeed) % this.sprites.length];
        }

        this.ctx.save(); // Save the current context state
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // translate to the character position

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

        this.ctx.drawImage(sprite, -this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore(); // restore the context to its original state
    }

    stop() {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.currentAnimationSpeed = this.animationSpeed;
    }
}
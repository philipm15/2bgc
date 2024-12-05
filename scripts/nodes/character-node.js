import { BaseNode } from "./base-node.js";

export class CharacterNode extends BaseNode {
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

    getBoxBounds() {
        return {
            topLeft: this.x,
            bottomLeft: this.y,
            topRight: this.x + this.width,
            bottomRight: this.y + this.height
        }
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

    /**
     * Called when the node should update its state
     * @abstract
     * @param deltaTime {number}
     */
    update(deltaTime) {
    }
}
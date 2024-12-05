import { BaseNode } from "./base-node.js";

export class CharacterNode extends BaseNode {
    velocity = 160;
    xVelocity = 0;
    yVelocity = 0;
    animationSpeed = 80;
    currentAnimationSpeed = 80;
    spriteAnimationMovingFactor = 0.6;
    isColliding = false;
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
     * @param collisionNodes {Area2DNode[]}
     */
    update(deltaTime, collisionNodes) {
    }

    /**
     * Check if the character is colliding with any area2D nodes
     * @param {Area2DNode[]} area2DNodes
     * @return boolean
     */
    checkCollision(area2DNodes) {
        const characterBounds = this.getBoxBounds();
        const area2DBounds = (area2DNodes || []).map(node => node.getBoxBounds());

        return area2DBounds.some(area2DBound => {
            return characterBounds.right >= area2DBound.left &&
                characterBounds.left <= area2DBound.right &&
                characterBounds.bottom >= area2DBound.top &&
                characterBounds.top <= area2DBound.bottom;
        });
    }

    stop() {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.currentAnimationSpeed = this.animationSpeed;
    }
}
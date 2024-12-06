import {BaseNode} from "./base-node.js";
import {CanvasItemNode} from "./canvas-item-node.js";

export class CharacterNode extends CanvasItemNode {
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

    /**
     * Check if the character is colliding with any area2D nodes
     * @param {AreaNode[]} areaNodes
     * @return boolean
     */
    checkCollision(areaNodes) {
        const characterBounds = this.getBoxBounds();
        const area2DBounds = (areaNodes || []).map(node => node.getBoxBounds());

        return area2DBounds.some(areaBound => {
            return characterBounds.right >= areaBound.left &&
                characterBounds.left <= areaBound.right &&
                characterBounds.bottom >= areaBound.top &&
                characterBounds.top <= areaBound.bottom;
        });
    }

    stop() {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.currentAnimationSpeed = this.animationSpeed;
    }
}
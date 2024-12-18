import {CanvasItemNode} from "./canvas-item-node.js";
import {AnimatedSpriteNode} from "./animated-sprite-node.js";

export class CharacterNode extends CanvasItemNode {
    velocity = 160;
    xVelocity = 0;
    yVelocity = 0;
    animatedSpriteNode = new AnimatedSpriteNode();

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

    constructor(x, y, width, height, velocity = 160, rotation = 'right') {
        super(x ?? 0, y ?? 0, width, height);
        this.velocity = velocity;
        this.rotation = rotation;
    }

    /**
     * Array of images that will be used to draw the character
     * @return {Image[]}
     */
    get sprites() {
        return this.animatedSpriteNode.sprites ?? [];
    }

    /**
     * Load the images that will be used to draw the character
     *
     * @return {Promise<void>}
     */
    loadImages() {
        return this.animatedSpriteNode.loadImages();
    }

    draw() {
        const sprites = this.sprites;
        // calculate the index by dividing the current time by the animation speed, modulo ensures that the index is always within the range of the animation sprites
        if ((sprites || []).length === 0) return;

        const currentAnimationSpeed = this.animatedSpriteNode.currentAnimationSpeed;
        let sprite;
        if (sprites.length === 1) {
            sprite = sprites[0];
        } else {
            sprite = sprites[Math.floor(Date.now() / currentAnimationSpeed) % sprites.length];
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
        this.animatedSpriteNode.resetAnimationSpeed();
    }

    onCollision(node) {
    }

    update(deltaTime) {
    }
}
import {CanvasItemNode} from "./canvas-item-node.js";
import {AnimatedSpriteNode} from "./animated-sprite-node.js";

export class AreaNode extends CanvasItemNode {
    animatedSpriteNode = new AnimatedSpriteNode();

    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    /**
     * Load the image that will be used to draw the area2D node
     * @return {Promise<void>}
     */
    loadImages() {
        return this.animatedSpriteNode.loadImages();
    }

    draw() {
        this.ctx.drawImage(this.animatedSpriteNode.sprites[0], this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
    }
}

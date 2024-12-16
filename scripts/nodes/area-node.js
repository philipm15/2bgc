import {CanvasItemNode} from "./canvas-item-node.js";

export class AreaNode extends CanvasItemNode {
    /**
     * The sprite that will be used to draw the area2D node
     * @type {Image}
     */
    sprite;

    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    /**
     * Load the image that will be used to draw the area2D node
     *
     * @abstract
     * @return {Promise<void>}
     */
    loadImage() {
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
    }
}

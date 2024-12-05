import { BaseNode } from "./base-node.js";

export class Area2DNode extends BaseNode {
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

    /**
     * Called when the node should draw on the canvas
     * @abstract
     * @return void
     */
    draw() {
    }
}
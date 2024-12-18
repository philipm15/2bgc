import {BaseNode} from "./base-node.js";

export class CanvasItemNode extends BaseNode {
    /**
     * Callback functions that will be called when the node collides with another node
     * @type {Array<{callback: (node: CanvasItemNode) => {}, nodeInstance: CanvasItemNode}>}
     */
    onCollisionCallbacks = [];

    constructor(x, y, width, height) {
        super(x, y, width, height);
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
     // * @param collisionNodes {AreaNode[]}
     */
    update(deltaTime) {
    }

    /**
     * Called when the node should react to a collision
     * @param node {CanvasItemNode} node it collided with
     */
    onCollision(node) {
        this.onCollisionCallbacks.forEach(callback => {
            if (callback.callback && node === callback.nodeInstance) {
                callback.callback(node)
            }
        });
    }

    /**
     * @param collisionCallback { {callback: (node: CanvasItemNode) => {}, nodeInstance: CanvasItemNode} }
     * @return void
     */
    addOnCollisionCallback(collisionCallback) {
        this.onCollisionCallbacks.push(collisionCallback);
    }
}

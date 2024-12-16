export class BaseNode {
    canvas;
    onDestroyed = () => {};

    constructor(x, y, width, height) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.width = width;
        this.height = height;
    }

    get ctx() {
        return this.canvas?.getContext('2d') ?? undefined;
    }

    get canvasBounds() {
        return {
            left: 0,
            right: this.canvas.width,
            bottom: this.canvas.height,
            top: 0
        }
    }

    getBoxBounds() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height
        }
    }

    /**
     * Function will be set by parent game class
     * @access protected
     */
    destroy() {
        this.onDestroyed();
    }
}

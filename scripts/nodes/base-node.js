export class BaseNode {
    canvas;

    constructor(x, y, width, height) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.width = width;
        this.height = height;
    }

    get ctx() {
        return this.canvas?.getContext('2d') ?? undefined;
    }
}
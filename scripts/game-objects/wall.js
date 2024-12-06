import { AreaNode } from "../nodes/area-node.js";

export class Wall extends AreaNode {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    loadImage() {
        const filePath = './sprites/wall.jpg';
        const image = new Image();
        image.src = filePath;
        return new Promise((resolve, reject) => {
            image.onload = () => {
                this.sprite = image;
                resolve();
            };
            image.onerror = reject;
        });
    }
}
import { Area2DNode } from "../nodes/area2D-node.js";

export class Wall extends Area2DNode {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
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
import {checkCollision} from "../lib/collision.js";

export class GameLoop {
    /**
     * The canvas element
     * @type {HTMLCanvasElement}
     */
    canvas;
    deltaTime = 0;
    prevTotalRunningTime = 0;
    characterNodes = [];
    area2DNodes = [];
    frameRequestId = undefined;
    stopGame = false;

    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     *
     * @returns {CanvasRenderingContext2D}
     */
    get ctx() {
        return this.canvas?.getContext('2d') ?? undefined;
    }

    get allNodes() {
        return [...this.characterNodes, ...this.area2DNodes];
    }

    start() {
        if (this.frameRequestId) {
            window.cancelAnimationFrame(this.frameRequestId);
        }

        this.stopGame = false;

        const promises = [
            ...this.characterNodes.map(character => character.loadImages()),
            ...this.area2DNodes.map(area2DNode => area2DNode.loadImages())
        ];

        Promise.all(promises)
            .then(() => {
                this.clearRect();
                this.frameRequestId = requestAnimationFrame(this._initGameLoop.bind(this));
            })
            .catch(error => {
                console.error('Error loading images', error);
            });
    }

    stop() {
        console.log(this.frameRequestId)
        delete this;
        if (this.frameRequestId) {
            this.stopGame = true;
            window.cancelAnimationFrame(this.frameRequestId);
            this.frameRequestId = null;
        }
        this.clearRect();
    }

    addCharacters(characters) {
        characters.forEach(character => {
            character.canvas = this.canvas;
            character.destroy = () => {
                character.destroy();
                this.characterNodes.filter(node => node !== character);
            };
        })
        this.characterNodes.push(...characters);
    }

    addAreaNodes(areaNodes) {
        areaNodes.forEach(areaNode => {
            areaNode.canvas = this.canvas;
            const originalDestroy = areaNode.destroy;
            areaNode.destroy = () => {
                originalDestroy.call(areaNode);
                this.area2DNodes = this.area2DNodes.filter(node => node !== areaNode);
            }
        });
        this.area2DNodes.push(...areaNodes);
    }

    _initGameLoop(totalRunningTime) {
        if (this.stopGame) {
            this.drawWinningScreen();
            return
        }
        this.deltaTime = (totalRunningTime - this.prevTotalRunningTime) / 1000;
        this.prevTotalRunningTime = totalRunningTime;

        const collidableNodes = [...this.characterNodes, ...this.area2DNodes];

        for (let i = 0; i < collidableNodes.length; i++) {
            for (let j = i + 1; j < collidableNodes.length; j++) {
                const nodeA = collidableNodes[i];
                const nodeB = collidableNodes[j];

                if (checkCollision(nodeA, nodeB)) {
                    // Handle collision
                    nodeA.onCollision(nodeB);
                    nodeB.onCollision(nodeA);
                }
            }
        }

        collidableNodes.forEach(node => {
            node.update(this.deltaTime);
        });

        this.clearRect();
        [...this.area2DNodes, ...this.characterNodes].forEach(node => {
            node.draw();
        });

        this.frameRequestId = requestAnimationFrame(this._initGameLoop.bind(this));
    }

    drawLoadingScreen() {
        this.clearRect();
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'yellow';
        this.ctx.textAlign = 'center';
        this.ctx.font = '48px Monospace';
        this.ctx.fillText('SnackMan', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.restore();
    }

    drawWinningScreen() {
        this.clearRect();
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'yellow';
        this.ctx.textAlign = 'center';
        this.ctx.font = '48px Monospace';
        this.ctx.fillText('You won!', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.restore();
    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

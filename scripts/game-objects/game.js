export class GameLoop {
    canvas;
    deltaTime = 0;
    prevTotalRunningTime = 0;
    characterNodes = [];
    area2DNodes = [];
    frameRequestId = undefined;

    constructor(canvas) {
        this.canvas = canvas;
    }

    get ctx() {
        return this.canvas?.getContext('2d') ?? undefined;
    }

    start() {
        if (this.frameRequestId) {
            window.cancelAnimationFrame(this.frameRequestId);
        }
        const promises = [
            ...this.characterNodes.map(character => character.loadImages()),
            ...this.area2DNodes.map(area2DNode => area2DNode.loadImage())
        ];
        Promise.all(promises)
            .then(() => {
                this.frameRequestId = requestAnimationFrame(this._initGameLoop.bind(this));
            })
            .catch(error => {
                console.error('Error loading images', error);
            });
    }

    addCharacters(characters) {
        characters.forEach(character => {
            character.canvas = this.canvas;
            // character.update = character.update.bind(character);
            // character.draw = character.draw.bind(character);
        })
        this.characterNodes.push(...characters);
    }

    addArea2DNodes(area2DNodes) {
        area2DNodes.forEach(area2DNode => {
            area2DNode.canvas = this.canvas;
        });
        this.area2DNodes.push(...area2DNodes);
    }

    _initGameLoop(totalRunningTime) {
        this.deltaTime = (totalRunningTime - this.prevTotalRunningTime) / 1000;
        this.prevTotalRunningTime = totalRunningTime;

        this.characterNodes.forEach(character => {
            character.update(this.deltaTime, this.area2DNodes);
        });
        this.clearRect();
        [...this.area2DNodes, ...this.characterNodes].forEach(node => {
            node.draw();
        });

        requestAnimationFrame(this._initGameLoop.bind(this));
    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
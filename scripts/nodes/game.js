export class GameLoop {
    canvas;
    deltaTime = 0;
    prevTotalRunningTime = 0;
    characters = [];
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
        const promises = this.characters.map(character => character.loadImages());
        Promise.all(promises)
            .then(() => {
                this.frameRequestId = requestAnimationFrame(this._initGameLoop.bind(this));
            })
            .catch(error => {
                console.error('Error loading images', error);
            });
    }

    addCharacters(characters) {
        console.log(characters)
        characters.forEach(character => {
            character.canvas = this.canvas;
            // character.update = character.update.bind(character);
            // character.draw = character.draw.bind(character);
        })
        this.characters.push(...characters);
    }

    _initGameLoop(totalRunningTime) {
        this.deltaTime = (totalRunningTime - this.prevTotalRunningTime) / 1000;
        this.prevTotalRunningTime = totalRunningTime;

        this.characters.forEach(character => {
            character.update(this.deltaTime);
        });
        this.clearRect();
        this.characters.forEach(character => {
            character.draw();
        });

        requestAnimationFrame(this._initGameLoop.bind(this));
    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
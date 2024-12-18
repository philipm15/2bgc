export function loadImageByPath(filePath) {
    const image = new Image();
    image.src = filePath;
    return new Promise((resolve, reject) => {
        image.onload = () => {
            resolve(image)
        };
        image.onerror = reject;
    });
}

export function loadImagesFromSpritesheet(spritesheetPath, spritesheetWidth, spritesheetHeight, singleSpriteWidth, singleSpriteHeight) {
    // Calculate the number of rows and columns
    const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
    const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
    const totalSprites = cols * rows;

    // Pre-create an array with `Image` objects for all sprites
    const animationSprites = Array.from({length: totalSprites}, () => new Image());

    // Create a temporary canvas to extract sprites from the spritesheet
    const tempSpritesheetCanvas = document.createElement("canvas");
    const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
    tempSpritesheetCanvas.width = singleSpriteWidth;
    tempSpritesheetCanvas.height = singleSpriteHeight;

    // Load the spritesheet
    const spritesheet = new Image();
    spritesheet.src = spritesheetPath;

    // Add a "load" event listener to the spritesheet
    spritesheet.addEventListener("load", () => {
        // Loop through each sprite's row and column position
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                tempSpritesheetCtx.drawImage(
                    spritesheet,
                    col * singleSpriteWidth,
                    row * singleSpriteHeight,
                    singleSpriteWidth,
                    singleSpriteHeight,
                    0,
                    0,
                    singleSpriteWidth,
                    singleSpriteHeight
                );

                // assign it to the corresponding Image object
                const index = row * cols + col;
                animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
            }
        }
    })
}

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
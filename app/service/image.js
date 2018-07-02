const cv = require('opencv4nodejs');
const jimp = require("jimp");

module.exports = {


    readImage(path) {
        return cv.imreadAsync(path).then(img => img.bgrToGrayAsync());
    },

    async hideFromImage(file, regions) {
        regions = regions.slice();
        let image = await jimp.read(file);

        for (let region of regions) {
            image = await image.pixelate(21, region.x, region.y, region.width, region.height);
        }

        return image;
    },
    
    async detectFaceInFiles(files) {
        const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
        const result = [];

        for (let file of files) {
            try {
                const grayImg = await this.readImage(file);
                const res = await classifier.detectMultiScaleAsync(grayImg);                
                result.push(res);
                console.log(res);
                const img = await this.hideFromImage(file, res.objects);
                await img.write(file);
            } catch (e) {
                console.error(e);
            }
        }

        return result;
    }

}
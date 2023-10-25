import * as cv from "opencv4nodejs";
import * as jimp from "jimp";

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export default {

    readImage(path: string) {
        return cv.imreadAsync(path).then((img: any) => img.bgrToGrayAsync());
    },

    async hideFromImage(file: string, regions: Rect[]) {
        regions = regions.slice();
        let image = await jimp.read(file);

        for (let region of regions) {
            image = await image.pixelate(21, region.x, region.y, region.width, region.height);
        }

        return image;
    },
    
    async detectFaceInFiles(files: string[]) {
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
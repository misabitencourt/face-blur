import { getImageFiles } from "./app/file/get-image-files";
import argParser from "./app/file/arg-parser";
import imageService from "./app/service/image-service";


(async () => {

    await argParser.parseArgs(process.argv);
    const rootDir = argParser.getArgument('dir');
    const files = await getImageFiles(rootDir || '');
    console.log(rootDir, files);
    await imageService.detectFaceInFiles(files);
    console.log('Done!');

})().catch(err => {
    console.error(err);
})



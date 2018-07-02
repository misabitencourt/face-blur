const args = require('./app/file/args');
const getFiles = require('./app/file/get-files');
const rootDir = args.getDir();
const imageSrv = require('./app/service/image');

getFiles(rootDir).then(files => {
    console.log(files);
    imageSrv.detectFaceInFiles(files).then(() => {
        console.log('DONE');
    });
});

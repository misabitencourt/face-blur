const glob = require("glob");

module.exports = function(rootDir) {
    return new Promise((resolve, reject) => {
        glob(`${rootDir}/**/*.jpg`, {}, (err, files) => {
            if (err) {
                return reject(err);
            }

            resolve(files);
        });
    });
}
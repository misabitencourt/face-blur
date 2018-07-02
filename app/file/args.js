
module.exports = {

    getDir() {
        if (this.dir) {
            return this.dir;
        }

        return this.dir = process.argv.pop().split('dir=').pop();
    }

}
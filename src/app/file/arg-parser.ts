
const args = new Map<string, string>();

const availableArgs = [
    'dir'
];

export default {

    parseArgs(argv: string[]) {
        const argsStr = argv.pop() || '';
        availableArgs.forEach(arg => {
            const value = argsStr.split(`${arg}=`).pop();
            if (value) {
                args.set(arg, value.trim());
            }
        })
    },

    getArgument(key: string) {
        return args.get(key);
    }

}
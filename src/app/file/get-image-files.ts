import {glob} from 'glob';

export const getImageFiles = (rootDir: string) => glob(`${rootDir}/**/*.jpg`, {});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flat = void 0;
/**
 * Returns a flatten array from a given array
 * @param array     // The array to flat
 */
function flat(array) {
    if (!array || array.length === 0) {
        return [];
    }
    else if (Array.isArray(array[0])) {
        return flat(array[0]).concat(flat(array.slice(1)));
    }
    else {
        return [array[0]].concat(flat(array.slice(1)));
    }
}
exports.flat = flat;

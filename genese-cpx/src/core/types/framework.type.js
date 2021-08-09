"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFramework = void 0;
/**
 * Checks if a string is the name of a Framework
 * @param name
 */
function isFramework(name) {
    return ['angular', 'react'].includes(name);
}
exports.isFramework = isFramework;

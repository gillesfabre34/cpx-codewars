"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsx = void 0;
function isJsx(node) {
    var _a;
    return ((_a = node === null || node === void 0 ? void 0 : node.getKindName()) === null || _a === void 0 ? void 0 : _a.slice(0, 3)) === 'Jsx';
}
exports.isJsx = isJsx;

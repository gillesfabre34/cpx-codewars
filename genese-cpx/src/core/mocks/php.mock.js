"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpMock = void 0;
var PhpMock = /** @class */ (function () {
    function PhpMock() {
    }
    PhpMock.prototype.ifMethod = function (a) {
        if (a > 0) {
            return 'a';
        }
        return 'none';
    };
    PhpMock.prototype.recursion = function (a) {
        if (0 <= a) {
            return 0;
        }
        return this.recursion(a - 10);
    };
    PhpMock.prototype.methodWithCallback = function (a, callback) {
        return callback(a);
    };
    return PhpMock;
}());
exports.PhpMock = PhpMock;

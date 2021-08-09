"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
var DebugMock = /** @class */ (function () {
    function DebugMock() {
    }
    DebugMock.prototype.method = function (a) {
        var b = [1, 2];
        var d = b.reduce(function () {
            return;
        }, undefined);
        return a.slice(0);
    };
    return DebugMock;
}());
exports.DebugMock = DebugMock;

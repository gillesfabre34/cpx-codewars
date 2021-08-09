"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
var callbacks_mock_1 = require("./mocks-subfolder/callbacks.mock");
var DebugMock = /** @class */ (function () {
    function DebugMock() {
    }
    DebugMock.prototype.ifAlone = function (a) {
        if (a) {
            return 'b';
        }
    };
    DebugMock.prototype.twoIfs = function (a, b) {
        if (a) {
            return 'b';
        }
        if (b) {
            return 'c';
        }
    };
    DebugMock.prototype.ifNestedIf = function (a, b) {
        if (a) {
            if (b) {
                return 'c';
            }
            return 'b';
        }
    };
    DebugMock.prototype.ifIfIf = function (a, b, c) {
        if (a) {
            if (b) {
                if (c) {
                    return 'd';
                }
                return 'c';
            }
            return 'b';
        }
    };
    DebugMock.prototype.switchCase = function (a) {
        switch (a) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            default:
                return 'other';
        }
    };
    DebugMock.prototype.methodWithoutTyping = function (z) {
        var a;
        var b;
        return b;
    };
    DebugMock.prototype.recursion = function (a) {
        this.recursion(a);
    };
    DebugMock.prototype.methodWithCallback = function (a, callback) {
        callback(a);
    };
    DebugMock.prototype.hyperComplex = function (object, path, value) {
        if (path === void 0) { path = ''; }
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce(function (acc, curr, index) {
            var arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new callbacks_mock_1.CallbacksMock(object);
    };
    return DebugMock;
}());
exports.DebugMock = DebugMock;

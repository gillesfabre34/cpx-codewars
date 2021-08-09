"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbacksMock = void 0;
// @ts-ignore
var CallbacksMock = /** @class */ (function () {
    function CallbacksMock(object) {
        console.log(object);
    }
    CallbacksMock.prototype.recursion = function (a) {
        this.recursion(a);
    };
    CallbacksMock.prototype.methodWithCallback = function (a, callback) {
        return callback(a);
    };
    CallbacksMock.prototype.caller = function (a) {
        this.methodWithCallback(a, function (b) {
            if (a < 2) {
                console.log(b);
            }
        });
    };
    CallbacksMock.prototype.callerFunction = function (a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b);
            }
        });
    };
    return CallbacksMock;
}());
exports.CallbacksMock = CallbacksMock;

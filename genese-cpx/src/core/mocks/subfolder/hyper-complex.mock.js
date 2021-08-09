"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperComplexMock = void 0;
var callbacks_mock_1 = require("./callbacks.mock");
var HyperComplexMock = /** @class */ (function () {
    function HyperComplexMock() {
    }
    HyperComplexMock.prototype.hyperComplex = function (object, path, value) {
        if (path === void 0) { path = ''; }
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce(function (acc, curr, index) {
            var arg = Math.round(index) % 3;
            acc(0);
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new callbacks_mock_1.CallbacksMock(object);
    };
    HyperComplexMock.prototype.ifIf = function (data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
    };
    HyperComplexMock.prototype.reducer = function (acc, curr, index, path) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    };
    return HyperComplexMock;
}());
exports.HyperComplexMock = HyperComplexMock;

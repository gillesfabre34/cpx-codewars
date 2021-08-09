"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForMock = void 0;
var ForMock = /** @class */ (function () {
    function ForMock() {
    }
    ForMock.prototype.forMethod = function (a) {
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var elt = a_1[_i];
            console.log(elt);
        }
    };
    ForMock.prototype.forEachMethod = function (a) {
        a.forEach(function (e) {
            console.log(e);
        });
    };
    ForMock.prototype.forForFor = function (max) {
        var total = 0;
        for (var i = 1; i < max; ++i) {
            for (var j = 2; j < i; ++j) {
                for (var k = 2; k < 10; ++k) {
                    console.log("k = " + k);
                }
            }
            total += i;
        }
        return total;
    };
    return ForMock;
}());
exports.ForMock = ForMock;

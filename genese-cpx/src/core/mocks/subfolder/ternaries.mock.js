"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TernariesMock = void 0;
var TernariesMock = /** @class */ (function () {
    function TernariesMock() {
    }
    TernariesMock.prototype.ternary = function (a) {
        return a ? 5 : 3;
    };
    TernariesMock.prototype.nestedTernaries = function (a, b) {
        return a ? 1 : b ? 0 : 2;
    };
    TernariesMock.prototype.ifWithTernary = function (a, b) {
        if (a) {
            return 1;
        }
        else {
            return b ? 0 : 2;
        }
    };
    TernariesMock.prototype.NoTernary = function (a, b) {
        if (a) {
            return 1;
        }
        else if (b) {
            return 0;
        }
        else {
            return 2;
        }
    };
    TernariesMock.prototype.ternaries = function (a) {
        return a > 10 ? 5 : ((a < 5) ? 3 : 2);
    };
    return TernariesMock;
}());
exports.TernariesMock = TernariesMock;

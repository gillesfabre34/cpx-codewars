"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfMock = void 0;
var IfMock = /** @class */ (function () {
    function IfMock() {
    }
    // @ts-ignore
    IfMock.prototype.ifAlone = function (a) {
        if (a) {
            return 'b';
        }
    };
    IfMock.prototype.ifElse = function (a) {
        if (a) {
            return 'b';
        }
        else {
            return 'c';
        }
    };
    // @ts-ignore
    IfMock.prototype.ifIfNested = function (a, b) {
        if (a) {
            return 'b';
            if (b) {
                return 'c';
            }
        }
    };
    IfMock.prototype.ifElseIfElse = function (a, b) {
        if (a) {
            return 'b';
        }
        else if (b) {
            return 'c';
        }
        else {
            return 'c';
        }
    };
    // @ts-ignore
    IfMock.prototype.ifElseIfIfElse = function (a, b, c) {
        if (a) {
            return 1;
        }
        else if (b) {
            if (c) {
                return 0;
            }
        }
        else {
            return 2;
        }
    };
    // @ts-ignore
    IfMock.prototype.ifElseIfInside = function (a, b) {
        if (a) {
            return 'b';
        }
        else {
            if (b) {
                return 'c';
            }
        }
    };
    // @ts-ignore
    IfMock.prototype.ifNestedIf = function (a) {
        if (a) {
            return 'b';
            if (a === 'v') {
                return 'c';
            }
        }
    };
    // @ts-ignore
    IfMock.prototype.ifIfElseInside = function (a) {
        if (a) {
            return 'b';
            if (a === 'v') {
                return 'c';
            }
            else {
                return 'f';
            }
        }
    };
    IfMock.prototype.ifAnd = function (a, b) {
        if (a && b) {
            console.log(a);
        }
    };
    IfMock.prototype.ifOr = function (a, b) {
        if (a || b) {
            console.log(a);
        }
    };
    IfMock.prototype.ifAndAnd = function (a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
    };
    IfMock.prototype.ifAndOr = function (a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
    };
    IfMock.prototype.ifAndAndOrAnd = function (a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
    };
    IfMock.prototype.ifAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
    };
    IfMock.prototype.ifIfIf = function (a) {
        if (a > 2) {
            if (a > 3) {
                if (a > 4) {
                    console.log('a > 4');
                }
            }
        }
    };
    IfMock.prototype.ifIfIfElse = function (a) {
        if (a > 2) {
            if (a > 3) {
                if (a > 4) {
                    console.log('a > 4');
                }
                else {
                    console.log('a <= 4');
                }
            }
        }
    };
    return IfMock;
}());
exports.IfMock = IfMock;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinariesMock = void 0;
var BinariesMock = /** @class */ (function () {
    function BinariesMock() {
    }
    BinariesMock.prototype.binary = function (a, b) {
        if (a && b) {
            console.log('b');
        }
    };
    BinariesMock.prototype.sameLogicDoor = function (a, b, c) {
        if (a && b && c) {
            console.log('b');
        }
    };
    BinariesMock.prototype.differentLogicDoor = function (a, b, c) {
        if (a && b || c) {
            console.log('b');
        }
    };
    BinariesMock.prototype.differentLogicDoorWithBrackets = function (a, b, c) {
        if ((a && b) || c) {
            console.log('b');
        }
    };
    BinariesMock.prototype.orBetweenTwoBinaries = function (a, b, c, d) {
        if ((a && b) || (c && d)) {
            console.log('b');
        }
    };
    BinariesMock.prototype.differentLogicDoorBetweenBinaries = function (a, b, c, d) {
        if ((a && b) || (c && d) && a) {
            console.log('b');
        }
    };
    BinariesMock.prototype.forIfAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        for (var i = 0; i < 10; i++) {
            if (b && c || d && f || a) {
                console.log(e);
            }
        }
    };
    BinariesMock.prototype.forForIfAndAndOrAndAndOrOr = function (a, b, c, d, e, f) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (b && c || d && f || a) {
                    console.log(e);
                }
            }
        }
        if (a > b) {
            console.log(b);
        }
    };
    return BinariesMock;
}());
exports.BinariesMock = BinariesMock;

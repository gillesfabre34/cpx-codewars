"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSubfolderMock = void 0;
var SubSubfolderMock = /** @class */ (function () {
    function SubSubfolderMock() {
    }
    // @ts-ignore
    SubSubfolderMock.prototype.ifVeryAlone = function (a) {
        if (a) {
            return 'b';
        }
    };
    return SubSubfolderMock;
}());
exports.SubSubfolderMock = SubSubfolderMock;

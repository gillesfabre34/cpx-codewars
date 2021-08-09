"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraysMock = void 0;
var ArraysMock = /** @class */ (function () {
    function ArraysMock() {
    }
    ArraysMock.prototype.elementAccessExpression = function (a) {
        return a[0];
    };
    ArraysMock.prototype.arrayLiteralExpression = function (b) {
        return [b];
    };
    ArraysMock.prototype.aggregateElementAccess = function (a, b, c) {
        return c[a][b];
    };
    ArraysMock.prototype.aggregateElementAccessX2 = function (a, b, c, d) {
        return c[a][b][d];
    };
    ArraysMock.prototype.aggregateArrayLiteral = function (a, b) {
        return [a][b];
    };
    ArraysMock.prototype.nestingElementAccessElementAccess = function (a, b, c) {
        return a[b[c]];
    };
    ArraysMock.prototype.nestingElementAccessElementAccessX2 = function (a, b, c, d) {
        return a[b[c[d]]];
    };
    ArraysMock.prototype.nestingTernaryElementAccess = function (a, b, c, d) {
        return a[b ? c : d];
    };
    return ArraysMock;
}());
exports.ArraysMock = ArraysMock;

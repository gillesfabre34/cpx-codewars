"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexMock = void 0;
var RegexMock = /** @class */ (function () {
    function RegexMock() {
    }
    RegexMock.prototype.shortRegex = function () {
        return /[^.[\]]+/g;
    };
    RegexMock.prototype.email = function () {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    };
    RegexMock.prototype.frenchPhoneNumber = function () {
        return /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    };
    return RegexMock;
}());
exports.RegexMock = RegexMock;

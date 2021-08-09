"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherStatement = void 0;
var statement_without_trailing_sub_statement_model_1 = require("./statement-without-trailing-sub-statement.model");
var location_model_1 = require("./location.model");
var OtherStatement = /** @class */ (function () {
    function OtherStatement() {
        this.name = '';
        this.children = [new statement_without_trailing_sub_statement_model_1.StatementWithoutTrailingSubstatement()];
        this.location = new location_model_1.Location();
    }
    return OtherStatement;
}());
exports.OtherStatement = OtherStatement;

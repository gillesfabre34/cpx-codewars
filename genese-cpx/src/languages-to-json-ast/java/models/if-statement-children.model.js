"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var location_model_1 = require("./location.model");
var expression_model_1 = require("./expression.model");
var IfStatementChildren = /** @class */ (function () {
    function IfStatementChildren() {
        this.If = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.RBrace = [new infos_model_1.Infos()];
        this.statement = [{
                name: '',
                children: {
                    statementWithoutTrailingSubstatement: [{
                            name: '',
                            children: {
                                block: [{
                                        name: '',
                                        children: {
                                            LCurly: [new infos_model_1.Infos()],
                                            blockStatements: [{
                                                    name: '',
                                                    children: {
                                                        blockStatement: [{
                                                                name: '',
                                                                children: {
                                                                    statement: [{
                                                                            name: '',
                                                                            children: {
                                                                                statementWithoutTrailingSubstatement: [{
                                                                                        name: '',
                                                                                        children: {
                                                                                            expressionStatement: [{
                                                                                                    name: '',
                                                                                                    children: {
                                                                                                        statementExpression: [{
                                                                                                                name: '',
                                                                                                                children: {
                                                                                                                    expression: [new expression_model_1.Expression()],
                                                                                                                },
                                                                                                                location: new location_model_1.Location()
                                                                                                            }],
                                                                                                    },
                                                                                                    location: new location_model_1.Location()
                                                                                                }],
                                                                                        },
                                                                                        location: new location_model_1.Location()
                                                                                    }]
                                                                            },
                                                                            location: new location_model_1.Location()
                                                                        }],
                                                                },
                                                                location: new location_model_1.Location()
                                                            }]
                                                    },
                                                    location: new location_model_1.Location()
                                                }],
                                            RCurly: [new infos_model_1.Infos()]
                                        },
                                        location: new location_model_1.Location()
                                    }]
                            },
                            location: new location_model_1.Location()
                        }]
                },
                location: new location_model_1.Location()
            }];
    }
    return IfStatementChildren;
}());
exports.IfStatementChildren = IfStatementChildren;

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactService = void 0;
var chalk = require("chalk");
var syntax_kind_enum_1 = require("../../../../core/enum/syntax-kind.enum");
var ast_util_1 = require("../../../../core/utils/ast.util");
var react_component_type_1 = require("./react-component.type");
var hooks_enum_1 = require("./hooks.enum");
var ReactService = /** @class */ (function () {
    function ReactService() {
    }
    ReactService.extractHooksAndArrowFunctions = function (fileAstNode) {
        try {
            var reactComponents = this.getArrowFunctionsWithIndexes(fileAstNode);
            var extractedArrowFunctions = this.extractHooksAndArrowFunctionsFromReactComponents(reactComponents);
            this.insertExtractsIntoFileAstNode(fileAstNode, extractedArrowFunctions);
        }
        catch (err) {
            console.log(chalk.redBright("Error extracting arrow functions from react components from " + (fileAstNode === null || fileAstNode === void 0 ? void 0 : fileAstNode.name)));
        }
    };
    ReactService.extractHooksAndArrowFunctionsFromReactComponents = function (reactComponents) {
        var extractedArrowFunctions = [];
        for (var _i = 0, reactComponents_1 = reactComponents; _i < reactComponents_1.length; _i++) {
            var reactComponent = reactComponents_1[_i];
            extractedArrowFunctions.push.apply(extractedArrowFunctions, this.extractArrowFunctionsFromReactComponent(reactComponent));
            extractedArrowFunctions.push.apply(extractedArrowFunctions, this.extractHooksFromReactComponent(reactComponent));
        }
        return extractedArrowFunctions;
    };
    ReactService.getArrowFunctionsWithIndexes = function (astNodeInterface) {
        var _a;
        try {
            var arrowFunctionWithIndexes = [];
            var i = 0;
            var children = (_a = astNodeInterface.children) !== null && _a !== void 0 ? _a : [];
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                if (child.kind === syntax_kind_enum_1.SyntaxKind.VariableStatement) {
                    var son = ast_util_1.getFirstChild(child);
                    var grandSon = ast_util_1.getFirstChild(son);
                    if (son.kind === 'VariableDeclarationList'
                        && grandSon.kind === 'VariableDeclaration'
                        && this.hasArrowFunctionChild(grandSon)) {
                        arrowFunctionWithIndexes.push(new react_component_type_1.ArrowFunctionWithIndex(child, i));
                    }
                }
                i++;
            }
            return arrowFunctionWithIndexes;
        }
        catch (err) {
            console.log(chalk.redBright("Error getting react components from " + (astNodeInterface === null || astNodeInterface === void 0 ? void 0 : astNodeInterface.name)));
        }
    };
    ReactService.hasArrowFunctionChild = function (astNodeInterface) {
        return !!ast_util_1.getFirstChildByKind(astNodeInterface, syntax_kind_enum_1.SyntaxKind.ArrowFunction);
    };
    ReactService.extractArrowFunctionsFromReactComponent = function (reactComponent) {
        var newFileAstNodeChildren = [];
        var block = ast_util_1.arrowFunctionBlock(reactComponent.arrowFunction);
        if (!block) {
            return [];
        }
        var arrowFunctionsWithIndexes = this.getArrowFunctionsWithIndexes(block);
        var _loop_1 = function (arrowFunctionsWithIndex) {
            var blockChildIndex = block.children.findIndex(function (a) { return a === arrowFunctionsWithIndex.arrowFunction; });
            var extract = new react_component_type_1.ArrowFunctionWithIndex(block.children[blockChildIndex], reactComponent.index);
            newFileAstNodeChildren.push(extract);
            block.children.splice(blockChildIndex, 1);
        };
        for (var _i = 0, arrowFunctionsWithIndexes_1 = arrowFunctionsWithIndexes; _i < arrowFunctionsWithIndexes_1.length; _i++) {
            var arrowFunctionsWithIndex = arrowFunctionsWithIndexes_1[_i];
            _loop_1(arrowFunctionsWithIndex);
        }
        return newFileAstNodeChildren;
    };
    ReactService.insertExtractsIntoFileAstNode = function (fileAstNode, extracts) {
        var extractsGroupedByReactComponent = this.getExtractsGroupedByReactComponent(extracts);
        var groupsInReverseOrder = __spreadArrays(extractsGroupedByReactComponent).reverse();
        for (var _i = 0, groupsInReverseOrder_1 = groupsInReverseOrder; _i < groupsInReverseOrder_1.length; _i++) {
            var group = groupsInReverseOrder_1[_i];
            this.insertGroupedExtractsIntoFileAstNode(fileAstNode, group);
        }
    };
    ReactService.getExtractsGroupedByReactComponent = function (extracts) {
        var groups = [];
        var _loop_2 = function (extract) {
            var existingGroup = groups.find(function (g) { return g.reactComponentIndex === extract.index; });
            if (existingGroup) {
                existingGroup.extracts.push(extract);
            }
            else {
                groups.push({ reactComponentIndex: extract.index, extracts: [extract] });
            }
        };
        for (var _i = 0, extracts_1 = extracts; _i < extracts_1.length; _i++) {
            var extract = extracts_1[_i];
            _loop_2(extract);
        }
        return groups;
    };
    ReactService.insertGroupedExtractsIntoFileAstNode = function (fileAstNode, group) {
        var _a;
        (_a = fileAstNode.children).splice.apply(_a, __spreadArrays([group.reactComponentIndex + 1, 0], group.extracts.map(function (e) { return e.arrowFunction; })));
    };
    ReactService.extractHooksFromReactComponent = function (reactComponent) {
        var newFileAstNodeChildren = [];
        var block = ast_util_1.arrowFunctionBlock(reactComponent.arrowFunction);
        var hooksWithCallbacks = this.getHooksWithCallbacks(block);
        var _loop_3 = function (hookWithCallback) {
            var blockChildIndex = block.children.findIndex(function (a) { return a === hookWithCallback; });
            var extract = new react_component_type_1.ArrowFunctionWithIndex(block.children[blockChildIndex], reactComponent.index);
            newFileAstNodeChildren.push(extract);
            block.children.splice(blockChildIndex, 1);
        };
        for (var _i = 0, hooksWithCallbacks_1 = hooksWithCallbacks; _i < hooksWithCallbacks_1.length; _i++) {
            var hookWithCallback = hooksWithCallbacks_1[_i];
            _loop_3(hookWithCallback);
        }
        return newFileAstNodeChildren;
    };
    ReactService.getHooksWithCallbacks = function (block) {
        var _a, _b;
        var hooksWithCallBacks = [];
        var statements = (_b = (_a = block === null || block === void 0 ? void 0 : block.children) === null || _a === void 0 ? void 0 : _a.filter(function (c) { return c.kind.includes('Statement') || c.kind === syntax_kind_enum_1.SyntaxKind.Keyword; })) !== null && _b !== void 0 ? _b : [];
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            var callExpression = ast_util_1.getFirstDescendantByKind(statement, syntax_kind_enum_1.SyntaxKind.CallExpression);
            var identifier = ast_util_1.getFirstChildByKind(callExpression, syntax_kind_enum_1.SyntaxKind.Identifier);
            if ((identifier === null || identifier === void 0 ? void 0 : identifier.type) === 'function' && hooks_enum_1.isReactHook(identifier === null || identifier === void 0 ? void 0 : identifier.name)) {
                hooksWithCallBacks.push(statement);
            }
        }
        return hooksWithCallBacks;
    };
    return ReactService;
}());
exports.ReactService = ReactService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    var astNode = {
        kind: 'Identifier',
        start: cstNode.startOffset,
        end: cstNode.endOffset + 1,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
    setType(astNode);
    return astNode;
}
exports.run = run;
function setType(astNode) {
    switch (astNode.name) {
        case 'forEach':
            astNode.type = 'function';
            return astNode;
    }
}

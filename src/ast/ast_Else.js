BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Else",
    "message0": "else",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

Blockly.Python['ast_Else'] = function (block) {
    return "else\n";
};

BlockMirrorTextToBlocks.prototype['ast_Else'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("ast_Else", node.lineno);
};
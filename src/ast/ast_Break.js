BlockMirrorTextToBlocks.BLOCKS.push({
  type: "ast_Break",
  message0: "break", //方塊名稱
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: BlockMirrorTextToBlocks.COLOR.CONTROL,
});

Blockly.Python["ast_Break"] = function (block) {
  return "break\n"; //返回text 文字
};

BlockMirrorTextToBlocks.prototype["ast_Break"] = function (node, parent) {
  return BlockMirrorTextToBlocks.create_block("ast_Break", node.lineno);
};

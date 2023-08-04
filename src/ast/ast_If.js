Blockly.Blocks['ast_If'] = {
  init: function () {
    this.orelse_ = 0;
    this.elifs_ = 0;

    this.appendValueInput("TEST").appendField(Blockly.Msg.AST_IF_TOOLTIP); //判斷式設定 appendField('if')
    this.appendStatementInput("BODY")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);

    
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['ast_If_elif', 'ast_If_orelse'])); // 加入 mutator

  },
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('elif', this.elifs_);
    container.setAttribute('else', this.orelse_ ? 1 : 0);
    return container;
  },

  updateShape_: function () {
    let latestInput = "BODY";
    //else 只會有一個
    k = 0;
    for (var i = 0; i < this.elifs_; i++) {


      if (!this.getInput("ELIFTEST" + i)) {
        console.log("我想要增加ELIF");
        this.appendValueInput("ELIFTEST" + i)
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
          .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF' + i); // 修改此處
        this.appendStatementInput("ELIFBODY" + i)
          .setCheck(null)
          .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF_BODY' + i) // 修改此處
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        
   
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ELIFTEST" + i)) {
      console.log("我想要移除ELIF");
      this.removeInput("ELIFTEST" + i);
      this.removeInput("ELIFBODY" + i);
      i++;
    }

    if (this.orelse_ && !this.getInput("ORELSETEST")) {
      
      //確認k = 0
      if(k == 0){

        
      console.log("我想要增加ORELSE");
      this.appendDummyInput("ORELSETEST")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE); // 修改此處
      this.appendStatementInput("ORELSEBODY")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN); // 修改此處
      k = 1;
      }else{
        console.log("ORELSE已經存在");
      }

      }else if(!this.orelse_ && this.getInput("ORELSETEST")){
        console.log("我想要移除ORELSE");
        this.removeInput("ORELSETEST");
        this.removeInput("ORELSEBODY");
        k = 0;
      }



    if(k == 0){
    for (i = 0; i < this.elifs_; i++) {
      if (this.orelse_) {
        this.moveInputBefore("ELIFTEST" + i, "ORELSETEST");
        this.moveInputBefore("ELIFBODY" + i, "ORELSETEST");
      } else if (i + 1 < this.elifs_) {
        this.moveInputBefore("ELIFTEST" + i, "ELIFTEST" + (i + 1));
        this.moveInputBefore("ELIFBODY" + i, "ELIFTEST" + (i + 1));
      }
    }
  }
  },
  mutationToDom: function () {
    let container = document.createElement("mutation");
    container.setAttribute("orelse", this.orelse_);
    container.setAttribute("elifs", this.elifs_);
    return container;
  },
  domToMutation: function (xmlElement) {
    this.orelse_ = "true" === xmlElement.getAttribute("orelse");
    this.elifs_ = parseInt(xmlElement.getAttribute("elifs"), 10) || 0;

    this.updateShape_();
  },
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('ast_If_If'); //mutator 預設第一個積木
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elifs_; i++) {
      var elifBlock = workspace.newBlock('ast_If_elif');
      elifBlock.initSvg();
      connection.connect(elifBlock.previousConnection);
      connection = elifBlock.nextConnection;
    }
    if (this.orelse_) {
      var elseBlock = workspace.newBlock('ast_If_orelse');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function (containerBlock) {
  
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elifs_ = 0;
    this.orelse_ = false;
    var valueConnections = [null];
    var statementConnections = [null];
    //console.log("Orelse Count (after compose):", this.orelse_);
    //console.log("Elif Count (after compose):", this.elifs_);
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ast_If_elif':
          this.elifs_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'ast_If_orelse':
          this.orelse_ = true;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        default:
          throw TypeError('Unknown block type');
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elifs_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'ELIFTEST' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'ELIFBODY' + i);
    }
    Blockly.Mutator.reconnect(valueConnections[this.elifs_ + 1], this, 'ORELSETEST');
    Blockly.Mutator.reconnect(statementConnections[this.elifs_ + 1], this, 'ORELSEBODY');
  }
};


Blockly.Blocks['ast_If_If'] = {

  init: function () {
      this.appendDummyInput('IF').appendField("if"); // 只新增文字不加 input()
      this.setNextStatement(true, ['ast_If_elif', 'ast_If_orelse']);
      this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);
      this.setTooltip("如果");
  },
};
Blockly.Blocks['ast_If_elif'] = {
  init: function () {
    this.elifCount_ = 0;
    //this.appendValueInput('ELIFTEST0').appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);//block text and input()
    this.appendDummyInput('ELIFTEST0').appendField("elif"); // 只新增文字不加 input()
    //this.appendStatementInput('ELIFBODY0').setCheck(null); //添加一個陳述塊
    this.setPreviousStatement(true, 'ast_If_elif');
    this.setNextStatement(true, ['ast_If_elif', 'ast_If_orelse']);
    this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);
    this.setTooltip("或是");



    this.statementConnection_ = null;
    this.valueConnection_ = null;


    //this.appendDummyInput().appendField("elif"); //積木下方的文字


  },

  mutationToDom: function () {
    if (!this.elifCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('elif', this.elifCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.elifCount_ = parseInt(xmlElement.getAttribute('elif'), 10);
    for (var i = 1; i <= this.elifCount_; i++) {
      var inputIf = this.appendValueInput('ELIFTEST' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
        .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF' + i); // 修改此處
      var inputDo = this.appendStatementInput('ELIFDO' + i)
        .setCheck(null)
        .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF_BODY' + i) // 修改此處
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elifCount_) {
      this.appendDummyInput('TAIL')
        .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_TAIL') // 修改此處
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('ast_If_elif');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elifCount_; i++) {
      var elifBlock = workspace.newBlock('ast_If_elif');
      elifBlock.initSvg();
      connection.connect(elifBlock.previousConnection);
      connection = elifBlock.nextConnection;
    }
    
    // Remove any extra elif blocks from mutator
    var parentBlock = Blockly.Mutator.findParentContainer(this);
    while (parentBlock && parentBlock.type === 'ast_If') {
      var elifBlock = parentBlock.getInputTargetBlock('ELIFTEST' + (this.elifCount_ + 1));
      if (elifBlock) {
        elifBlock.dispose();
      }
      parentBlock = Blockly.Mutator.findParentContainer(parentBlock);
    }
    
    return containerBlock;
  },


  compose: function (containerBlock) {
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var i = this.elifCount_; i > 0; i--) {
      this.removeInput('ELIFTEST' + i);
      this.removeInput('ELIFDO' + i);
    }
    this.elifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ast_If_elif':
          this.elifCount_++;
          var ifInput = this.appendValueInput('ELIFTEST' + this.elifCount_)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
            .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF' + this.elifCount_); // 修改此處
          var doInput = this.appendStatementInput('ELIFDO' + this.elifCount_)
            .setCheck(null)
            .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELIF_BODY' + this.elifCount_) // 修改此處
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw TypeError('Unknown block type');
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    if (this.elifCount_) {
      this.appendDummyInput('TAIL')
        .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_TAIL') // 修改此處
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  },
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ast_If_elif':
          var inputIf = this.getInput('ELIFTEST' + i);
          var inputDo = this.getInput('ELIFDO' + i);
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        default:
          throw TypeError('Unknown block type');
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['ast_If_orelse'] = {
  init: function () {
    this.setTooltip("或是");
    //this.appendStatementInput('ORELSEDO').setCheck(null).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN); // 積木的形狀
    //this.appendValueInput('ORELSEDO').setCheck(null).appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF); // 積木的文字 + input()
    this.appendDummyInput('ORELSEDO').appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE); // 只新增文字不加 input()
    this.setPreviousStatement(true, 'ast_If_elif');
    this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);
    this.orelseCount_ = 0;
    this.setTooltip("");
  },

  mutationToDom: function () {
    if (!this.orelseCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('orelse', this.orelseCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.orelseCount_ = parseInt(xmlElement.getAttribute('orelse'), 10);
    for (var i = 1; i <= this.orelseCount_; i++) {
      var inputDo = this.appendStatementInput('ORELSEDO' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
        .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELSE_BODY' + i); // 修改此處
    }
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('ast_If_orelse');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;

    // Remove any extra else block from mutator
    var parentBlock = Blockly.Mutator.findParentContainer(this);
    while (parentBlock && parentBlock.type === 'ast_If') {
      var elseBlock = parentBlock.getInputTargetBlock('ORELSEBODY');
      if (elseBlock) {
        elseBlock.dispose();
      }
      parentBlock = Blockly.Mutator.findParentContainer(parentBlock);
    }

    return containerBlock;
  },


  compose: function (containerBlock) {
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var i = this.orelseCount_; i > 0; i--) {
      this.removeInput('ORELSEDO' + i);
    }
    this.orelseCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ast_If_orelse':
          this.orelseCount_++;
          var doInput = this.appendStatementInput('ORELSEDO' + this.orelseCount_)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
            .appendField(new Blockly.FieldLabel(' ', 'blocklyTextEmph'), 'LABEL_ELSE_BODY' + this.orelseCount_); // 修改此處
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw TypeError('Unknown block type');
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'ast_If_orelse':
          var inputDo = this.getInput('ORELSEDO' + i);
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        default:
          throw TypeError('Unknown block type');
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  }
  
};

Blockly.Python["ast_If"] = function (block) {
  // Test
  let test = "if " + (Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_NONE) || Blockly.Python.FALSE) + ":\n";
  // Body:
  let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
  // Elifs
  let elifs = new Array(block.elifs_);
  for (let i = 0; i < block.elifs_; i++) {
    let elif = block.elifs_[i];
    let clause = "elif " + (Blockly.Python.valueToCode(block, "ELIFTEST" + i, Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    clause += Blockly.Python.statementToCode(block, "ELIFBODY" + i) || Blockly.Python.PASS;
    elifs[i] = clause;
  }
   // Console log for debugging
  //  console.log("Test:", test);
  //  console.log("Body:", body);
  //  console.log("Elifs:", elifs);
  // Orelse:
  let orelse = "";
  if (this.orelse_) {
    orelse = "else:" + "\n" + Blockly.Python.PASS + Blockly.Python.statementToCode(block, "ORELSEBODY") || Blockly.Python.PASS;
  } 
  // console.log("Orelse:", orelse);
  return test + body + elifs.join("") + orelse;
};

BlockMirrorTextToBlocks.prototype["ast_If"] = function (node, parent) {
  let test = node.test;
  let body = node.body;
  let orelse = node.orelse;

  let hasOrelse = false;
  let elifCount = 0;

  let values = { TEST: this.convert(test, node) };
  let statements = { BODY: this.convertBody(body, node) };

  while (orelse !== undefined && orelse.length > 0) {
    if (orelse.length === 1) {
      if (orelse[0]._astname === "If") {
        // This is an ELIF
        this.heights.shift();
        values["ELIFTEST" + elifCount] = this.convert(orelse[0].test, node);
        statements["ELIFBODY" + elifCount] = this.convertBody(orelse[0].body, node);
        elifCount++;
        orelse = orelse[0].orelse; // Move to the next orelse block
      } else {
        hasOrelse = true;
        statements["ORELSEBODY"] = this.convertBody(orelse, node);
        orelse = undefined; // No more orelse block to process
      }
    } else {
      hasOrelse = true;
      statements["ORELSEBODY"] = this.convertBody(orelse, node);
      orelse = undefined; // No more orelse block to process
    }
  }

  return BlockMirrorTextToBlocks.create_block(
    "ast_If",
    node.lineno,
    {},
    values,
    {},
    {
      "@orelse": hasOrelse,
      "@elifs": elifCount,
    },
    statements
  );
};

/* let ZERO_BLOCK = BlockMirrorTextToBlocks.create_block("ast_Num", null, {
  NUM: 0,
}); */

/* BlockMirrorBlockEditor.EXTRA_TOOLS = {}; */

const TOOLBOX_CATEGORY = {};

TOOLBOX_CATEGORY.VARIABLES = {
  name: "Variables",
  colour: "VARIABLES",
  custom: "VARIABLE",
};

/* https://developers.google.com/blockly/guides/configure/web/toolbox#json_10*/
/*如何自訂圖片？*/

TOOLBOX_CATEGORY.custom = {
  CSS: "fas fa-align-justify fa-2x fa-fw",
  name: "變數",
  colour: "VARIABLES",
  custom: "VARIABLE",
};

TOOLBOX_CATEGORY.custominput = {
  CSS: "fas fa-arrow-alt-circle-right fa-2x fa-fw",
  name: "輸入/輸出",
  colour: "TEXT",
  blocks: [
    '""',
    "input()",
    "print()",
    "print(___)",
    "print(___,___)",
    "print(___,___,___)",
    "print(___,sep = '')",
    "print(___,end = '')",
    "''.format(___)",
    "___.replace('', '')",
    "___.split('')",
    "___.strip()",
    "''.join(___)",
    "___.lstrip()",
    "___.rstrip()",
    "___.upper()",
    "___.lower()",
    "___.isdigit()",
  ],
};

TOOLBOX_CATEGORY.customtype = {
  CSS: "fa fa-code fa-2x fa-fw",
  name: "型態",
  colour: "TEXT",
  blocks: ["eval(___)", "int(___)", "str(___)", "float(___)"],
};

TOOLBOX_CATEGORY.custommath = {
  CSS: "fas fa-plus-circle fa-2x fa-fw",
  name: "數學",
  colour: "MATH",
  blocks: [
    "0",
    "-___",
    "___ + ___",
    "___-___",
    "___ * ___",
    "___ / ___",
    "___ % ___",
    "___ ** ___",
    "___ // ___",
    "abs(___)",
    "round(___)",
  ],
};

TOOLBOX_CATEGORY.customiteration = {
  CSS: "fas fa-undo fa-2x fa-fw",
  name: "疊代",
  colour: "CONTROL",
  blocks: [
    "for ___ in range(___, ___, ___): pass",
    "while ___: pass",
    "range(___, ___, ___)",
    "break",
    "continue",
    "pass",
    "True",
    "False",
  ],
};

TOOLBOX_CATEGORY.custommlist = {
  CSS: "fas fa-list-ol fa-2x fa-fw",
  name: "串列",
  colour: "LIST",
  blocks: ["[]","list(___)","len(___)","*___","___[___]","___[___:___]","___[___:]","___[:___]","___[::___]", "___.append(___)", "___.clear()", "___.copy()", "___.count(___)", "___.extend(___)", "___.index(___)", "___.insert(___, ___)", "___.pop(___)", "___.remove(___)", "___.reverse()", "___.sort(reverse=False)"],


}

//元祖
TOOLBOX_CATEGORY.custommtuple = {
  CSS: "fas fa-list-ul fa-2x fa-fw",
  name: "元組",
  colour: "LIST",
  blocks: ["()","tuple(___)"],
}

//集合
TOOLBOX_CATEGORY.custommset = {
  CSS: "fas fa-object-group fa-2x fa-fw",
  name: "集合",
  colour: "LIST",
  blocks: ["set(___)","___.add(___)", "___.clear()", "___.copy()", "___.difference(___)", "___.difference_update(___)", "___.discard(___)", "___.intersection(___)", "___.intersection_update(___)", "___.isdisjoint(___)", "___.issubset(___)", "___.issuperset(___)", "___.pop()", "___.remove(___)", "___.symmetric_difference(___)", "___.symmetric_difference_update(___)", "___.union(___)", "___.update(___)", "len(___)"],
}

//字典
TOOLBOX_CATEGORY.custommdict = {
  CSS: "fas fa-list-alt fa-2x fa-fw",
  name: "字典",
  colour: "DICTIONARY",
  blocks: ["{}","dict(___)","___.clear()", "___.copy()", "___.fromkeys(___)", "___.get(___)", "___.items()", "___.keys()", "___.pop(___)", "___.popitem()", "___.setdefault(___)", "___.update(___)", "___.values()", "len(___)"],
}






/* 工具列自訂圖示 */

// (TOOLBOX_CATEGORY.TEST = {
//     CSS: "las la-exclamation-circle la-3x green",
//     name: "判斷",
//     colour: "LOGIC",
//     blocks: [
//         "if ___: pass",
//         "if ___:pass\nelif ___:pass",
//         "if ___: pass\nelse: pass",
//         "if ___: pass\nelif ___:pass\nelse: pass",
//         "___ == ___",
//         "___ != ___",
//         "___ > ___",
//         "___ < ___",

//     ],
// }),
// console.log(TOOLBOX_CATEGORY.TEST);

TOOLBOX_CATEGORY.DECISIONS = {
  name: "Decisions",
  colour: "LOGIC",
  blocks: [
    "if ___: pass",
    "if ___: pass\nelse: pass",
    "___ < ___",
    "___ and ___",
    "elif__:\n    pass",
    "else__:\n    pass",
    "___ and ___",
    "break",
    "not ___",
  ],
};

TOOLBOX_CATEGORY.CALCULATIONS = {
  name: "Calculation",
  colour: "MATH",
  blocks: ["___ + ___", "round(___)"],
};
TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING = {
  name: "Output",
  colour: "PLOTTING",
  blocks: [
    "print(___)",
    "plt.plot(___)",
    "plt.scatter(___, ___)",
    "plt.hist(___)",
    "plt.bar(___, ___, tick_label=___)",
    "plt.boxplot(___)",
    "plt.show()",
    "plt.title(___)",
    "plt.xlabel(___)",
    "plt.ylabel(___)",
    "plt.hlines(___, ___, ___)",
    "plt.vlines(___, ___, ___)",
  ],
};
TOOLBOX_CATEGORY.TURTLES = {
  name: "Turtles",
  colour: "PLOTTING",
  blocks: [
    "turtle.mainloop()",
    "turtle.forward(50)",
    "turtle.backward(50)",
    "turtle.right(90)",
    "turtle.left(90)",
    "turtle.goto(0, 0)",
    "turtle.setx(100)",
    "turtle.sety(100)",
    "turtle.setheading(270)",
    "turtle.pendown()",
    "turtle.penup()",
    "turtle.pencolor('blue')",
  ],
};
TOOLBOX_CATEGORY.INPUT = {
  name: "Input",
  colour: "TEXT",
  blocks: ["input('')"],
};
TOOLBOX_CATEGORY.VALUES = {
  name: "Values",
  colour: "TEXT",
  blocks: ['""', "0", "True"],
};
TOOLBOX_CATEGORY.SEP = "<sep></sep>";

TOOLBOX_CATEGORY.CONVERSIONS = {
  name: "Conversion",
  colour: "TEXT",
  blocks: ["int(___)", "float(___)", "str(___)", "bool(___)"],
};

TOOLBOX_CATEGORY.DICTIONARIES = {
  name: "Dictionaries",
  colour: "DICTIONARY",
  blocks: [
    "{'1st key': ___, '2nd key': ___, '3rd key': ___}",
    "{}",
    "___['key']",
  ],
};

BlockMirrorBlockEditor.prototype.TOOLBOXES = {
  //******************************************************
  empty: [{ name: "Empty Toolbox", colour: "PYTHON", blocks: [] }],
  //******************************************************
  minimal: [
    // TODO: What should live in here?

    //這裡可以使用原生的GOOGLLE BLOCKS XML
    //css-icon="fa fa-spinner fa-spin fa-3x fa-fw" 新增圖片icon

    //https://developers.google.com/blockly/guides/create-custom-blocks/xml-custom-blocks
    //colour="#A3321A" css-label="customLabel"  顏色、粗體

    '<toolboxlabel name="工具箱" colour="#A3321A" css-label="customLabel"></toolboxlabel>',
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.custom,
    TOOLBOX_CATEGORY.customtype,
    TOOLBOX_CATEGORY.custominput,
    TOOLBOX_CATEGORY.custommath,
    TOOLBOX_CATEGORY.customiteration,
    //TOOLBOX_CATEGORY.TEST,
    '<category css-icon="las la-exclamation-circle la-3x green" name="判斷" categorystyle="logic_category">',
    '<block type="controls_if"></block>', //原生的if
    //'<block type="controls_whileUntil"></block>',
    // '<block type="ast_If"></block>', //單獨使用blpckpy的if
    '<block type="ast_Compare">',
    '<field name="OP">Eq</field>',
    "</block>",
    '<block type="ast_Compare">',
    '<field name="OP">NotEq</field>',
    "</block>",
    '<block type="ast_Compare">',
    '<field name="OP">Gt</field>',
    "</block>",
    '<block type="ast_Compare">',
    '<field name="OP">Lt</field>',
    "</block>",
    '<block type="ast_BoolOp">',
    '<field name="OP">And</field>',
    "</block>",
    '<block type="ast_BoolOp">',
    '<field name="OP">Or</field>',
    "</block>",
    "</category>",
    TOOLBOX_CATEGORY.custommlist,
    TOOLBOX_CATEGORY.custommdict,
    TOOLBOX_CATEGORY.custommtuple,
    TOOLBOX_CATEGORY.custommset,
    

  ],
  //******************************************************
  normal: [
    TOOLBOX_CATEGORY.VARIABLES,
    TOOLBOX_CATEGORY.DECISIONS,
    {
      name: "Iteration",
      colour: "CONTROL",
      blocks: ["for ___ in ___: pass", "while ___: pass", "break"],
    },
    {
      name: "Functions",
      colour: "FUNCTIONS",
      blocks: [
        "def ___(___): pass",
        "def ___(___: int)->str: pass",
        "return ___",
      ],
    },
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.CALCULATIONS,
    TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING,
    TOOLBOX_CATEGORY.INPUT,
    TOOLBOX_CATEGORY.TURTLES,
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.VALUES,
    TOOLBOX_CATEGORY.CONVERSIONS,
    {
      name: "Lists",
      colour: "LIST",
      blocks: [
        "[0, 0, 0]",
        "[___, ___, ___]",
        "[]",
        "___.append(___)",
        "range(0, 10)",
      ],
    },
    TOOLBOX_CATEGORY.DICTIONARIES,
  ],
  //******************************************************
  ct: [
    TOOLBOX_CATEGORY.VARIABLES,
    TOOLBOX_CATEGORY.DECISIONS,
    { name: "Iteration", colour: "CONTROL", blocks: ["for ___ in ___: pass"] },
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.CALCULATIONS,
    TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING,
    TOOLBOX_CATEGORY.INPUT,
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.VALUES,
    TOOLBOX_CATEGORY.CONVERSIONS,
    {
      name: "Lists",
      colour: "LIST",
      blocks: ["[0, 0, 0]", "[___, ___, ___]", "[]", "___.append(___)"],
    },
  ],
  //******************************************************
  full: [
    TOOLBOX_CATEGORY.VARIABLES,
    {
      name: "Literal Values",
      colour: "LIST",
      blocks: [
        "0",
        "''",
        "True",
        "None",
        "[___, ___, ___]",
        "(___, ___, ___)",
        "{___, ___, ___}",
        "{___: ___, ___: ___, ___: ___}",
      ],
    },
    {
      name: "Calculations",
      colour: "MATH",
      blocks: ["-___", "___ + ___", "___ >> ___", "abs(___)", "round(___)"],
    },
    {
      name: "Logic",
      colour: "LOGIC",
      blocks: [
        "___ if ___ else ___",
        "___ == ___",
        "___ < ___",
        "___ in ___",
        "___ and ___",
        "not ___",
        "not ___",
      ],
    },
    TOOLBOX_CATEGORY.SEP,
    {
      name: "Classes",
      colour: "OO",
      blocks: [
        "class ___: pass",
        "class ___(___): pass",
        "___.___",
        "___: ___",
        "super()",
      ],
    },
    {
      name: "Functions",
      colour: "FUNCTIONS",
      blocks: [
        "def ___(___): pass",
        "def ___(___: int)->str: pass",
        "return ___",
        "yield ___",
        "lambda ___: ___",
      ],
    },
    {
      name: "Imports",
      colour: "PYTHON",
      blocks: [
        "import ___",
        "from ___ import ___",
        "import ___ as ___",
        "from ___ import ___ as ___",
      ],
    },
    TOOLBOX_CATEGORY.SEP,
    {
      name: "Control Flow",
      colour: "CONTROL",
      blocks: [
        "if ___: pass",
        "if ___: pass\nelse: pass",
        "for ___ in ___: pass",
        "while ___: pass",
        "break",
        "continue",
        "try: pass\nexcept ___ as ___: pass",
        "raise ___",
        "assert ___",
        "with ___ as ___: pass",
      ],
    },
    TOOLBOX_CATEGORY.SEP,
    TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING,
    TOOLBOX_CATEGORY.INPUT,
    {
      name: "Files",
      colour: "FILE",
      blocks: [
        "with open('', 'r') as ___: pass",
        "___.read()",
        "___.readlines()",
        "___.write(___)",
        "___.writelines(___)",
      ],
    },
    TOOLBOX_CATEGORY.SEP,
    {
      name: "Conversion",
      colour: "TEXT",
      blocks: [
        "int(___)",
        "float(___)",
        "str(___)",
        "chr(___)",
        "bool(___)",
        "list(___)",
        "dict(___)",
        "tuple(___)",
        "set(___)",
        "type(___)",
        "isinstance(___)",
      ],
    },
    {
      name: "Builtin Functions",
      colour: "SEQUENCES",
      blocks: [
        "len(___)",
        "sorted(___)",
        "enumerate(___)",
        "reversed(___)",
        "range(0, 10)",
        "min(___, ___)",
        "max(___, ___)",
        "sum(___)",
        "all(___)",
        "any(___)",
        "zip(___, ___)",
        "map(___, ___)",
        "filter(___, ___)",
      ],
    },
    {
      name: "List Methods",
      colour: "LIST",
      blocks: ["___.append(___)", "___.pop()", "___.clear()"],
    },
    {
      name: "String Methods",
      colour: "TEXT",
      blocks: [
        "___.startswith('')",
        "___.endswith('')",
        "___.replace('', '')",
        "___.lower('')",
        "___.upper('')",
        "___.title('')",
        "___.strip('')",
        "___.split('')",
        "''.join(___)",
        "___.format('')",
        "___.strip('')",
      ],
    },
    {
      name: "Subscripting",
      colour: "SEQUENCES",
      blocks: ["___[___]", "___[___:___]", "___[___:___:___]"],
    },
    {
      name: "Generators",
      colour: "SEQUENCES",
      blocks: [
        "[___ for ___ in ___]",
        "(___ for ___ in ___)",
        "{___ for ___ in ___}",
        "{___: ___ for ___ in ___ if ___}",
        "[___ for ___ in ___ if ___]",
        "(___ for ___ in ___ if ___)",
        "{___ for ___ in ___ if ___}",
        "{___: ___ for ___ in ___ if ___}",
      ],
    },
    { name: "Comments", colour: "PYTHON", blocks: ["# ", '"""\n"""'] } /*,
        {name: "Weird Stuff", colour: "PYTHON", blocks: [
            "delete ___",
            "global ___"
        ]}*/,
  ],
  //******************************************************
  ct3: [
    {
      name: "Memory",
      colour: "VARIABLES",
      custom: "VARIABLE",
      hideGettersSetters: true,
    },
    TOOLBOX_CATEGORY.SEP,

    '<category name="Expressions" expanded="true">',
    {
      name: "Constants",
      colour: "TEXT",
      blocks: ['""', "0", "True", "[0, 0, 0]", "[___, ___, ___]", "[]"],
    },
    { name: "Variables", colour: "VARIABLES", blocks: ["VARIABLE"] },
    TOOLBOX_CATEGORY.CALCULATIONS,
    TOOLBOX_CATEGORY.CONVERSIONS,
    {
      name: "Conditions",
      colour: "LOGIC",
      blocks: ["___ == ___", "___ and ___", "not ___"],
    },
    TOOLBOX_CATEGORY.INPUT,
    "</category>",
    TOOLBOX_CATEGORY.SEP,

    '<category name="Operations" expanded="true">',
    {
      name: "Assignment",
      colour: "VARIABLES",
      blocks: ["VARIABLE = ___", "___.append(___)"],
    },
    TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING,
    "</category>",
    TOOLBOX_CATEGORY.SEP,

    '<category name="Control" expanded="true">',
    {
      name: "Decision",
      colour: "CONTROL",
      blocks: ["if ___: pass", "if ___: pass\nelse: pass"],
    },
    { name: "Iteration", colour: "CONTROL", blocks: ["for ___ in ___: pass"] },
    "</category>",
  ],

  ct2: [
    {
      name: "Memory",
      colour: "VARIABLES",
      custom: "VARIABLE",
      hideGettersSetters: true,
    },

    '<category name="Expressions" expanded="true">',
    {
      name: "Decision",
      colour: "CONTROL",
      blocks: ["if ___: pass", "if ___: pass\nelse: pass"],
    },
    "</category>",
  ],
};

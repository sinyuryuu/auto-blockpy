"use strict";
(Blockly.Python = new Blockly.Generator("Python")),
  Blockly.Python.addReservedWords(
    "False,None,True,and,as,assert,break,class,continue,def,del,elif,else,except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,or,pass,print,raise,return,try,while,with,yield,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,ArithmeticError,AssertionError,AttributeError,BaseException,BlockingIOError,BrokenPipeError,BufferError,BytesWarning,ChildProcessError,ConnectionAbortedError,ConnectionError,ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,ImportWarning,IndentationError,IndexError,InterruptedError,IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,PermissionError,ProcessLookupError,RecursionError,ReferenceError,ResourceWarning,RuntimeError,RuntimeWarning,StandardError,StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,UnicodeDecodeError,UnicodeEncodeError,UnicodeError,UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,sum,super,tuple,type,unichr,unicode,vars,xrange,zip"
  ),
  (Blockly.Python.ORDER_ATOMIC = 0),
  (Blockly.Python.ORDER_COLLECTION = 1),
  (Blockly.Python.ORDER_STRING_CONVERSION = 1),
  (Blockly.Python.ORDER_MEMBER = 2.1),
  (Blockly.Python.ORDER_FUNCTION_CALL = 2.2),
  (Blockly.Python.ORDER_EXPONENTIATION = 3),
  (Blockly.Python.ORDER_UNARY_SIGN = 4),
  (Blockly.Python.ORDER_BITWISE_NOT = 4),
  (Blockly.Python.ORDER_MULTIPLICATIVE = 5),
  (Blockly.Python.ORDER_ADDITIVE = 6),
  (Blockly.Python.ORDER_BITWISE_SHIFT = 7),
  (Blockly.Python.ORDER_BITWISE_AND = 8),
  (Blockly.Python.ORDER_BITWISE_XOR = 9),
  (Blockly.Python.ORDER_BITWISE_OR = 10),
  (Blockly.Python.ORDER_RELATIONAL = 11),
  (Blockly.Python.ORDER_LOGICAL_NOT = 12),
  (Blockly.Python.ORDER_LOGICAL_AND = 13),
  (Blockly.Python.ORDER_LOGICAL_OR = 14),
  (Blockly.Python.ORDER_CONDITIONAL = 15),
  (Blockly.Python.ORDER_LAMBDA = 16),
  (Blockly.Python.ORDER_NONE = 99),
  (Blockly.Python.ORDER_OVERRIDES = [
    [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_MEMBER],
    [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_FUNCTION_CALL],
    [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_MEMBER],
    [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_FUNCTION_CALL],
    [Blockly.Python.ORDER_LOGICAL_NOT, Blockly.Python.ORDER_LOGICAL_NOT],
    [Blockly.Python.ORDER_LOGICAL_AND, Blockly.Python.ORDER_LOGICAL_AND],
    [Blockly.Python.ORDER_LOGICAL_OR, Blockly.Python.ORDER_LOGICAL_OR],
  ]),
  (Blockly.Python.init = function (o) {
    (Blockly.Python.PASS = this.INDENT + "pass\n"),
      (Blockly.Python.definitions_ = Object.create(null)),
      (Blockly.Python.functionNames_ = Object.create(null)),
      Blockly.Python.variableDB_
        ? Blockly.Python.variableDB_.reset()
        : (Blockly.Python.variableDB_ = new Blockly.Names(
            Blockly.Python.RESERVED_WORDS_
          )),
      Blockly.Python.variableDB_.setVariableMap(o.getVariableMap());
    for (
      var t = [], l = Blockly.Variables.allDeveloperVariables(o), n = 0;
      n < l.length;
      n++
    )
      t.push(
        Blockly.Python.variableDB_.getName(
          l[n],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE
        ) + " = None"
      );
    for (o = Blockly.Variables.allUsedVarModels(o), n = 0; n < o.length; n++)
      t.push(
        Blockly.Python.variableDB_.getName(
          o[n].getId(),
          Blockly.VARIABLE_CATEGORY_NAME
        ) + " = None"
      );
    Blockly.Python.definitions_.variables = t.join("\n");
  }),
  (Blockly.Python.finish = function (o) {
    return o;
  }),
  (Blockly.Python.scrubNakedValue = function (o) {
    return o + "\n";
  }),
  (Blockly.Python.quote_ = function (o) {
    o = o.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n");
    var t = "'";
    return (
      -1 !== o.indexOf("'") &&
        (-1 === o.indexOf('"') ? (t = '"') : (o = o.replace(/'/g, "\\'"))),
      t + o + t
    );
  }),
  (Blockly.Python.multiline_quote_ = function (o) {
    return (o = o.replace(/'''/g, "\\'\\'\\'")), "'''" + o + "'''";
  }),
  (Blockly.Python.scrub_ = function (o, t, l) {
    var n = "";
    if (!o.outputConnection || !o.outputConnection.targetConnection) {
      var e = o.getCommentText();
      e &&
        ((e = Blockly.utils.string.wrap(e, Blockly.Python.COMMENT_WRAP - 3)),
        (n += Blockly.Python.prefixLines(e + "\n", "# ")));
      for (var y = 0; y < o.inputList.length; y++)
        o.inputList[y].type == Blockly.INPUT_VALUE &&
          (e = o.inputList[y].connection.targetBlock()) &&
          (e = Blockly.Python.allNestedComments(e)) &&
          (n += Blockly.Python.prefixLines(e, "# "));
    }
    return (
      (o = o.nextConnection && o.nextConnection.targetBlock()),
      (l = l ? "" : Blockly.Python.blockToCode(o)),
      n + t + l
    );
  }),
  (Blockly.Python.getAdjustedInt = function (o, t, l, n) {
    (l = l || 0), o.workspace.options.oneBasedIndex && l--;
    var e = o.workspace.options.oneBasedIndex ? "1" : "0";
    return (
      (o =
        Blockly.Python.valueToCode(
          o,
          t,
          l ? Blockly.Python.ORDER_ADDITIVE : Blockly.Python.ORDER_NONE
        ) || e),
      Blockly.isNumber(o)
        ? ((o = parseInt(o, 10) + l), n && (o = -o))
        : ((o =
            0 < l
              ? "int(" + o + " + " + l + ")"
              : 0 > l
              ? "int(" + o + " - " + -l + ")"
              : "int(" + o + ")"),
          n && (o = "-" + o)),
      o
    );
  }),
  (Blockly.Python.colour = {}),
  (Blockly.Python.colour_picker = function (o) {
    return [
      Blockly.Python.quote_(o.getFieldValue("COLOUR")),
      Blockly.Python.ORDER_ATOMIC,
    ];
  }),
  (Blockly.Python.colour_random = function (o) {
    return (
      (Blockly.Python.definitions_.import_random = "import random"),
      [
        "'#%06x' % random.randint(0, 2**24 - 1)",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.colour_rgb = function (o) {
    var t = Blockly.Python.provideFunction_("colour_rgb", [
        "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(r, g, b):",
        "  r = round(min(100, max(0, r)) * 2.55)",
        "  g = round(min(100, max(0, g)) * 2.55)",
        "  b = round(min(100, max(0, b)) * 2.55)",
        "  return '#%02x%02x%02x' % (r, g, b)",
      ]),
      l = Blockly.Python.valueToCode(o, "RED", Blockly.Python.ORDER_NONE) || 0,
      n =
        Blockly.Python.valueToCode(o, "GREEN", Blockly.Python.ORDER_NONE) || 0;
    return (
      (o =
        Blockly.Python.valueToCode(o, "BLUE", Blockly.Python.ORDER_NONE) || 0),
      [
        t + "(" + l + ", " + n + ", " + o + ")",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.colour_blend = function (o) {
    var t = Blockly.Python.provideFunction_("colour_blend", [
        "def " +
          Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
          "(colour1, colour2, ratio):",
        "  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)",
        "  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)",
        "  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)",
        "  ratio = min(1, max(0, ratio))",
        "  r = round(r1 * (1 - ratio) + r2 * ratio)",
        "  g = round(g1 * (1 - ratio) + g2 * ratio)",
        "  b = round(b1 * (1 - ratio) + b2 * ratio)",
        "  return '#%02x%02x%02x' % (r, g, b)",
      ]),
      l =
        Blockly.Python.valueToCode(o, "COLOUR1", Blockly.Python.ORDER_NONE) ||
        "'#000000'",
      n =
        Blockly.Python.valueToCode(o, "COLOUR2", Blockly.Python.ORDER_NONE) ||
        "'#000000'";
    return (
      (o =
        Blockly.Python.valueToCode(o, "RATIO", Blockly.Python.ORDER_NONE) || 0),
      [
        t + "(" + l + ", " + n + ", " + o + ")",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.lists = {}),
  (Blockly.Python.lists_create_empty = function (o) {
    return ["[]", Blockly.Python.ORDER_ATOMIC];
  }),
  (Blockly.Python.lists_create_with = function (o) {
    for (var t = Array(o.itemCount_), l = 0; l < o.itemCount_; l++)
      t[l] =
        Blockly.Python.valueToCode(o, "ADD" + l, Blockly.Python.ORDER_NONE) ||
        "None";
    return ["[" + t.join(", ") + "]", Blockly.Python.ORDER_ATOMIC];
  }),
  (Blockly.Python.lists_repeat = function (o) {
    var t =
      Blockly.Python.valueToCode(o, "ITEM", Blockly.Python.ORDER_NONE) ||
      "None";
    return (
      (o =
        Blockly.Python.valueToCode(
          o,
          "NUM",
          Blockly.Python.ORDER_MULTIPLICATIVE
        ) || "0"),
      ["[" + t + "] * " + o, Blockly.Python.ORDER_MULTIPLICATIVE]
    );
  }),
  (Blockly.Python.lists_length = function (o) {
    return [
      "len(" +
        (Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
          "[]") +
        ")",
      Blockly.Python.ORDER_FUNCTION_CALL,
    ];
  }),
  (Blockly.Python.lists_isEmpty = function (o) {
    return [
      "not len(" +
        (Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
          "[]") +
        ")",
      Blockly.Python.ORDER_LOGICAL_NOT,
    ];
  }),
  (Blockly.Python.lists_indexOf = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "FIND", Blockly.Python.ORDER_NONE) ||
        "[]",
      l =
        Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
        "''";
    if (o.workspace.options.oneBasedIndex)
      var n = " 0",
        e = " + 1",
        y = "";
    else (n = " -1"), (e = ""), (y = " - 1");
    return "FIRST" == o.getFieldValue("END")
      ? ((o = Blockly.Python.provideFunction_("first_index", [
          "def " +
            Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            "(my_list, elem):",
          "  try: index = my_list.index(elem)" + e,
          "  except: index =" + n,
          "  return index",
        ])),
        [o + "(" + l + ", " + t + ")", Blockly.Python.ORDER_FUNCTION_CALL])
      : ((o = Blockly.Python.provideFunction_("last_index", [
          "def " +
            Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            "(my_list, elem):",
          "  try: index = len(my_list) - my_list[::-1].index(elem)" + y,
          "  except: index =" + n,
          "  return index",
        ])),
        [o + "(" + l + ", " + t + ")", Blockly.Python.ORDER_FUNCTION_CALL]);
  }),
  (Blockly.Python.lists_getIndex = function (o) {
    var t = o.getFieldValue("MODE") || "GET",
      l = o.getFieldValue("WHERE") || "FROM_START",
      n =
        Blockly.Python.valueToCode(
          o,
          "VALUE",
          "RANDOM" == l
            ? Blockly.Python.ORDER_NONE
            : Blockly.Python.ORDER_MEMBER
        ) || "[]";
    switch (l) {
      case "FIRST":
        if ("GET" == t) return [n + "[0]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == t)
          return [n + ".pop(0)", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == t) return n + ".pop(0)\n";
        break;
      case "LAST":
        if ("GET" == t) return [n + "[-1]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == t)
          return [n + ".pop()", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == t) return n + ".pop()\n";
        break;
      case "FROM_START":
        if (((o = Blockly.Python.getAdjustedInt(o, "AT")), "GET" == t))
          return [n + "[" + o + "]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == t)
          return [n + ".pop(" + o + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == t) return n + ".pop(" + o + ")\n";
        break;
      case "FROM_END":
        if (((o = Blockly.Python.getAdjustedInt(o, "AT", 1, !0)), "GET" == t))
          return [n + "[" + o + "]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == t)
          return [n + ".pop(" + o + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == t) return n + ".pop(" + o + ")\n";
        break;
      case "RANDOM":
        if (
          ((Blockly.Python.definitions_.import_random = "import random"),
          "GET" == t)
        )
          return [
            "random.choice(" + n + ")",
            Blockly.Python.ORDER_FUNCTION_CALL,
          ];
        if (
          ((n =
            Blockly.Python.provideFunction_("lists_remove_random_item", [
              "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(myList):",
              "  x = int(random.random() * len(myList))",
              "  return myList.pop(x)",
            ]) +
            "(" +
            n +
            ")"),
          "GET_REMOVE" == t)
        )
          return [n, Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == t) return n + "\n";
    }
    throw Error("Unhandled combination (lists_getIndex).");
  }),
  (Blockly.Python.lists_setIndex = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "LIST", Blockly.Python.ORDER_MEMBER) ||
        "[]",
      l = o.getFieldValue("MODE") || "GET",
      n = o.getFieldValue("WHERE") || "FROM_START",
      e =
        Blockly.Python.valueToCode(o, "TO", Blockly.Python.ORDER_NONE) ||
        "None";
    switch (n) {
      case "FIRST":
        if ("SET" == l) return t + "[0] = " + e + "\n";
        if ("INSERT" == l) return t + ".insert(0, " + e + ")\n";
        break;
      case "LAST":
        if ("SET" == l) return t + "[-1] = " + e + "\n";
        if ("INSERT" == l) return t + ".append(" + e + ")\n";
        break;
      case "FROM_START":
        if (((o = Blockly.Python.getAdjustedInt(o, "AT")), "SET" == l))
          return t + "[" + o + "] = " + e + "\n";
        if ("INSERT" == l) return t + ".insert(" + o + ", " + e + ")\n";
        break;
      case "FROM_END":
        if (((o = Blockly.Python.getAdjustedInt(o, "AT", 1, !0)), "SET" == l))
          return t + "[" + o + "] = " + e + "\n";
        if ("INSERT" == l) return t + ".insert(" + o + ", " + e + ")\n";
        break;
      case "RANDOM":
        if (
          ((Blockly.Python.definitions_.import_random = "import random"),
          t.match(/^\w+$/)
            ? (o = "")
            : ((o = Blockly.Python.variableDB_.getDistinctName(
                "tmp_list",
                Blockly.VARIABLE_CATEGORY_NAME
              )),
              (n = o + " = " + t + "\n"),
              (t = o),
              (o = n)),
          (n = Blockly.Python.variableDB_.getDistinctName(
            "tmp_x",
            Blockly.VARIABLE_CATEGORY_NAME
          )),
          (o += n + " = int(random.random() * len(" + t + "))\n"),
          "SET" == l)
        )
          return o + (t + "[") + n + "] = " + e + "\n";
        if ("INSERT" == l) return o + (t + ".insert(") + n + ", " + e + ")\n";
    }
    throw Error("Unhandled combination (lists_setIndex).");
  }),
  (Blockly.Python.lists_getSublist = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "LIST", Blockly.Python.ORDER_MEMBER) ||
        "[]",
      l = o.getFieldValue("WHERE1"),
      n = o.getFieldValue("WHERE2");
    switch (l) {
      case "FROM_START":
        (l = Blockly.Python.getAdjustedInt(o, "AT1")), "0" == l && (l = "");
        break;
      case "FROM_END":
        l = Blockly.Python.getAdjustedInt(o, "AT1", 1, !0);
        break;
      case "FIRST":
        l = "";
        break;
      default:
        throw Error("Unhandled option (lists_getSublist)");
    }
    switch (n) {
      case "FROM_START":
        o = Blockly.Python.getAdjustedInt(o, "AT2", 1);
        break;
      case "FROM_END":
        (o = Blockly.Python.getAdjustedInt(o, "AT2", 0, !0)),
          Blockly.isNumber(String(o))
            ? "0" == o && (o = "")
            : ((Blockly.Python.definitions_.import_sys = "import sys"),
              (o += " or sys.maxsize"));
        break;
      case "LAST":
        o = "";
        break;
      default:
        throw Error("Unhandled option (lists_getSublist)");
    }
    return [t + "[" + l + " : " + o + "]", Blockly.Python.ORDER_MEMBER];
  }),
  (Blockly.Python.lists_sort = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "LIST", Blockly.Python.ORDER_NONE) ||
        "[]",
      l = o.getFieldValue("TYPE");
    return (
      (o = "1" === o.getFieldValue("DIRECTION") ? "False" : "True"),
      [
        Blockly.Python.provideFunction_("lists_sort", [
          "def " +
            Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            "(my_list, type, reverse):",
          "  def try_float(s):",
          "    try:",
          "      return float(s)",
          "    except:",
          "      return 0",
          "  key_funcs = {",
          '    "NUMERIC": try_float,',
          '    "TEXT": str,',
          '    "IGNORE_CASE": lambda s: str(s).lower()',
          "  }",
          "  key_func = key_funcs[type]",
          "  list_cpy = list(my_list)",
          "  return sorted(list_cpy, key=key_func, reverse=reverse)",
        ]) +
          "(" +
          t +
          ', "' +
          l +
          '", ' +
          o +
          ")",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.lists_split = function (o) {
    var t = o.getFieldValue("MODE");
    if ("SPLIT" == t)
      (t =
        Blockly.Python.valueToCode(o, "INPUT", Blockly.Python.ORDER_MEMBER) ||
        "''"),
        (o = Blockly.Python.valueToCode(o, "DELIM", Blockly.Python.ORDER_NONE)),
        (o = t + ".split(" + o + ")");
    else {
      if ("JOIN" != t) throw Error("Unknown mode: " + t);
      (t =
        Blockly.Python.valueToCode(o, "INPUT", Blockly.Python.ORDER_NONE) ||
        "[]"),
        (o =
          Blockly.Python.valueToCode(o, "DELIM", Blockly.Python.ORDER_MEMBER) ||
          "''"),
        (o = o + ".join(" + t + ")");
    }
    return [o, Blockly.Python.ORDER_FUNCTION_CALL];
  }),
  (Blockly.Python.lists_reverse = function (o) {
    return [
      "list(reversed(" +
        (Blockly.Python.valueToCode(o, "LIST", Blockly.Python.ORDER_NONE) ||
          "[]") +
        "))",
      Blockly.Python.ORDER_FUNCTION_CALL,
    ];
  }),
  (Blockly.Python.logic = {}),
  (Blockly.Python.controls_if = function (o) {
    var t = 0,
      l = "";
    Blockly.Python.STATEMENT_PREFIX &&
      (l += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, o));
    do {
      var n =
          Blockly.Python.valueToCode(o, "IF" + t, Blockly.Python.ORDER_NONE) ||
          "False",
        e = Blockly.Python.statementToCode(o, "DO" + t) || Blockly.Python.PASS;
      Blockly.Python.STATEMENT_SUFFIX &&
        (e =
          Blockly.Python.prefixLines(
            Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, o),
            Blockly.Python.INDENT
          ) + e),
        (l += (0 == t ? "if " : "elif ") + n + ":\n" + e),
        ++t;
    } while (o.getInput("IF" + t));
    return (
      (o.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) &&
        ((e = Blockly.Python.statementToCode(o, "ELSE") || Blockly.Python.PASS),
        Blockly.Python.STATEMENT_SUFFIX &&
          (e =
            Blockly.Python.prefixLines(
              Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, o),
              Blockly.Python.INDENT
            ) + e),
        (l += "else:\n" + e)),
      l
    );
  }),
  (Blockly.Python.controls_ifelse = Blockly.Python.controls_if),
  (Blockly.Python.logic_compare = function (o) {
    var t = { EQ: "==", NEQ: "!=", LT: "<", LTE: "<=", GT: ">", GTE: ">=" }[
        o.getFieldValue("OP")
      ],
      l = Blockly.Python.ORDER_RELATIONAL,
      n = Blockly.Python.valueToCode(o, "A", l) || "0";
    return (
      (o = Blockly.Python.valueToCode(o, "B", l) || "0"),
      [n + " " + t + " " + o, l]
    );
  }),
  (Blockly.Python.logic_operation = function (o) {
    var t = "AND" == o.getFieldValue("OP") ? "and" : "or",
      l =
        "and" == t
          ? Blockly.Python.ORDER_LOGICAL_AND
          : Blockly.Python.ORDER_LOGICAL_OR,
      n = Blockly.Python.valueToCode(o, "A", l);
    if (((o = Blockly.Python.valueToCode(o, "B", l)), n || o)) {
      var e = "and" == t ? "True" : "False";
      n || (n = e), o || (o = e);
    } else o = n = "False";
    return [n + " " + t + " " + o, l];
  }),
  (Blockly.Python.logic_negate = function (o) {
    return [
      "not " +
        (Blockly.Python.valueToCode(
          o,
          "BOOL",
          Blockly.Python.ORDER_LOGICAL_NOT
        ) || "True"),
      Blockly.Python.ORDER_LOGICAL_NOT,
    ];
  }),
  (Blockly.Python.logic_boolean = function (o) {
    return [
      "TRUE" == o.getFieldValue("BOOL") ? "True" : "False",
      Blockly.Python.ORDER_ATOMIC,
    ];
  }),
  (Blockly.Python.logic_null = function (o) {
    return ["None", Blockly.Python.ORDER_ATOMIC];
  }),
  (Blockly.Python.logic_ternary = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "IF", Blockly.Python.ORDER_CONDITIONAL) ||
        "False",
      l =
        Blockly.Python.valueToCode(
          o,
          "THEN",
          Blockly.Python.ORDER_CONDITIONAL
        ) || "None";
    return (
      (o =
        Blockly.Python.valueToCode(
          o,
          "ELSE",
          Blockly.Python.ORDER_CONDITIONAL
        ) || "None"),
      [l + " if " + t + " else " + o, Blockly.Python.ORDER_CONDITIONAL]
    );
  }),
  (Blockly.Python.loops = {}),
  (Blockly.Python.controls_repeat_ext = function (o) {
    var t = o.getField("TIMES")
      ? String(parseInt(o.getFieldValue("TIMES"), 10))
      : Blockly.Python.valueToCode(o, "TIMES", Blockly.Python.ORDER_NONE) ||
        "0";
    t = Blockly.isNumber(t) ? parseInt(t, 10) : "int(" + t + ")";
    var l = Blockly.Python.statementToCode(o, "DO");
    return (
      (l = Blockly.Python.addLoopTrap(l, o) || Blockly.Python.PASS),
      "for " +
        Blockly.Python.variableDB_.getDistinctName(
          "count",
          Blockly.Variables.NAME_TYPE
        ) +
        " in range(" +
        t +
        "):\n" +
        l
    );
  }),
  (Blockly.Python.controls_repeat = Blockly.Python.controls_repeat_ext),
  (Blockly.Python.controls_whileUntil = function (o) {
    var t = "UNTIL" == o.getFieldValue("MODE"),
      l =
        Blockly.Python.valueToCode(
          o,
          "BOOL",
          t ? Blockly.Python.ORDER_LOGICAL_NOT : Blockly.Python.ORDER_NONE
        ) || "False",
      n = Blockly.Python.statementToCode(o, "DO");
    return (
      (n = Blockly.Python.addLoopTrap(n, o) || Blockly.Python.PASS),
      t && (l = "not " + l),
      "while " + l + ":\n" + n
    );
  }),
  (Blockly.Python.controls_for = function (o) {
    var t = Blockly.Python.variableDB_.getName(
        o.getField("VAR").getText(),
        Blockly.Variables.NAME_TYPE
      ),
      l =
        Blockly.Python.valueToCode(o, "FROM", Blockly.Python.ORDER_NONE) || "0",
      n = Blockly.Python.valueToCode(o, "TO", Blockly.Python.ORDER_NONE) || "0",
      e = Blockly.Python.valueToCode(o, "BY", Blockly.Python.ORDER_NONE) || "1",
      y = Blockly.Python.statementToCode(o, "DO");
    y = Blockly.Python.addLoopTrap(y, o) || Blockly.Python.PASS;
    var r = "",
      c = function () {
        return Blockly.Python.provideFunction_("upRange", [
          "def " +
            Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            "(start, stop, step):",
          "  while start <= stop:",
          "    yield start",
          "    start += abs(step)",
        ]);
      },
      a = function () {
        return Blockly.Python.provideFunction_("downRange", [
          "def " +
            Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            "(start, stop, step):",
          "  while start >= stop:",
          "    yield start",
          "    start -= abs(step)",
        ]);
      };
    if (
      ((o = function (o, t, l) {
        return (
          "(" +
          o +
          " <= " +
          t +
          ") and " +
          c() +
          "(" +
          o +
          ", " +
          t +
          ", " +
          l +
          ") or " +
          a() +
          "(" +
          o +
          ", " +
          t +
          ", " +
          l +
          ")"
        );
      }),
      Blockly.isNumber(l) && Blockly.isNumber(n) && Blockly.isNumber(e))
    )
      (l = parseFloat(l)),
        (n = parseFloat(n)),
        (e = Math.abs(parseFloat(e))),
        0 === l % 1 && 0 === n % 1 && 0 === e % 1
          ? (l <= n
              ? (n++,
                (o = 0 == l && 1 == e ? n : l + ", " + n),
                1 != e && (o += ", " + e))
              : (n--, (o = l + ", " + n + ", -" + e)),
            (o = "range(" + o + ")"))
          : ((o = l < n ? c() : a()),
            (o += "(" + l + ", " + n + ", " + e + ")"));
    else {
      var i = function (o, l) {
        return (
          Blockly.isNumber(o)
            ? (o = parseFloat(o))
            : o.match(/^\w+$/)
            ? (o = "float(" + o + ")")
            : ((l = Blockly.Python.variableDB_.getDistinctName(
                t + l,
                Blockly.Variables.NAME_TYPE
              )),
              (r += l + " = float(" + o + ")\n"),
              (o = l)),
          o
        );
      };
      (l = i(l, "_start")),
        (n = i(n, "_end")),
        i(e, "_inc"),
        (o =
          "number" == typeof l && "number" == typeof n
            ? l < n
              ? c(l, n, e)
              : a(l, n, e)
            : o(l, n, e));
    }
    return (r += "for " + t + " in " + o + ":\n" + y);
  }),
  (Blockly.Python.controls_forEach = function (o) {
    var t = Blockly.Python.variableDB_.getName(
        o.getField("VAR").getText(),
        Blockly.Variables.NAME_TYPE
      ),
      l =
        Blockly.Python.valueToCode(
          o,
          "LIST",
          Blockly.Python.ORDER_RELATIONAL
        ) || "[]",
      n = Blockly.Python.statementToCode(o, "DO");
    return (
      (n = Blockly.Python.addLoopTrap(n, o) || Blockly.Python.PASS),
      "for " + t + " in " + l + ":\n" + n
    );
  }),
  (Blockly.Python.controls_flow_statements = function (o) {
    var t = "";
    if (
      (Blockly.Python.STATEMENT_PREFIX &&
        (t += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, o)),
      Blockly.Python.STATEMENT_SUFFIX &&
        (t += Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, o)),
      Blockly.Python.STATEMENT_PREFIX)
    ) {
      var l =
        Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(
          o
        );
      l &&
        !l.suppressPrefixSuffix &&
        (t += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, l));
    }
    switch (o.getFieldValue("FLOW")) {
      case "BREAK":
        return t + "break\n";
      case "CONTINUE":
        return t + "continue\n";
    }
    throw Error("Unknown flow statement.");
  }),
  (Blockly.Python.math = {}),
  Blockly.Python.addReservedWords("math,random,Number"),
  (Blockly.Python.math_number = function (o) {
    if (((o = parseFloat(o.getFieldValue("NUM"))), 1 / 0 == o)) {
      o = 'float("inf")';
      var t = Blockly.Python.ORDER_FUNCTION_CALL;
    } else
      -1 / 0 == o
        ? ((o = '-float("inf")'), (t = Blockly.Python.ORDER_UNARY_SIGN))
        : (t =
            0 > o
              ? Blockly.Python.ORDER_UNARY_SIGN
              : Blockly.Python.ORDER_ATOMIC);
    return [o, t];
  }),
  (Blockly.Python.math_arithmetic = function (o) {
    var t = {
        ADD: [" + ", Blockly.Python.ORDER_ADDITIVE],
        MINUS: [" - ", Blockly.Python.ORDER_ADDITIVE],
        MULTIPLY: [" * ", Blockly.Python.ORDER_MULTIPLICATIVE],
        DIVIDE: [" / ", Blockly.Python.ORDER_MULTIPLICATIVE],
        POWER: [" ** ", Blockly.Python.ORDER_EXPONENTIATION],
      }[o.getFieldValue("OP")],
      l = t[0];
    t = t[1];
    var n = Blockly.Python.valueToCode(o, "A", t) || "0";
    return (o = Blockly.Python.valueToCode(o, "B", t) || "0"), [n + l + o, t];
  }),
  (Blockly.Python.math_single = function (o) {
    var t = o.getFieldValue("OP");
    if ("NEG" == t) {
      var l =
        Blockly.Python.valueToCode(o, "NUM", Blockly.Python.ORDER_UNARY_SIGN) ||
        "0";
      return ["-" + l, Blockly.Python.ORDER_UNARY_SIGN];
    }
    switch (
      ((Blockly.Python.definitions_.import_math = "import math"),
      (o =
        "SIN" == t || "COS" == t || "TAN" == t
          ? Blockly.Python.valueToCode(
              o,
              "NUM",
              Blockly.Python.ORDER_MULTIPLICATIVE
            ) || "0"
          : Blockly.Python.valueToCode(o, "NUM", Blockly.Python.ORDER_NONE) ||
            "0"),
      t)
    ) {
      case "ABS":
        l = "math.fabs(" + o + ")";
        break;
      case "ROOT":
        l = "math.sqrt(" + o + ")";
        break;
      case "LN":
        l = "math.log(" + o + ")";
        break;
      case "LOG10":
        l = "math.log10(" + o + ")";
        break;
      case "EXP":
        l = "math.exp(" + o + ")";
        break;
      case "POW10":
        l = "math.pow(10," + o + ")";
        break;
      case "ROUND":
        l = "round(" + o + ")";
        break;
      case "ROUNDUP":
        l = "math.ceil(" + o + ")";
        break;
      case "ROUNDDOWN":
        l = "math.floor(" + o + ")";
        break;
      case "SIN":
        l = "math.sin(" + o + " / 180.0 * math.pi)";
        break;
      case "COS":
        l = "math.cos(" + o + " / 180.0 * math.pi)";
        break;
      case "TAN":
        l = "math.tan(" + o + " / 180.0 * math.pi)";
    }
    if (l) return [l, Blockly.Python.ORDER_FUNCTION_CALL];
    switch (t) {
      case "ASIN":
        l = "math.asin(" + o + ") / math.pi * 180";
        break;
      case "ACOS":
        l = "math.acos(" + o + ") / math.pi * 180";
        break;
      case "ATAN":
        l = "math.atan(" + o + ") / math.pi * 180";
        break;
      default:
        throw Error("Unknown math operator: " + t);
    }
    return [l, Blockly.Python.ORDER_MULTIPLICATIVE];
  }),
  (Blockly.Python.math_constant = function (o) {
    var t = {
      PI: ["math.pi", Blockly.Python.ORDER_MEMBER],
      E: ["math.e", Blockly.Python.ORDER_MEMBER],
      GOLDEN_RATIO: [
        "(1 + math.sqrt(5)) / 2",
        Blockly.Python.ORDER_MULTIPLICATIVE,
      ],
      SQRT2: ["math.sqrt(2)", Blockly.Python.ORDER_MEMBER],
      SQRT1_2: ["math.sqrt(1.0 / 2)", Blockly.Python.ORDER_MEMBER],
      INFINITY: ["float('inf')", Blockly.Python.ORDER_ATOMIC],
    };
    return (
      (o = o.getFieldValue("CONSTANT")),
      "INFINITY" != o &&
        (Blockly.Python.definitions_.import_math = "import math"),
      t[o]
    );
  }),
  (Blockly.Python.math_number_property = function (o) {
    var t =
        Blockly.Python.valueToCode(
          o,
          "NUMBER_TO_CHECK",
          Blockly.Python.ORDER_MULTIPLICATIVE
        ) || "0",
      l = o.getFieldValue("PROPERTY");
    if ("PRIME" == l)
      return (
        (Blockly.Python.definitions_.import_math = "import math"),
        (Blockly.Python.definitions_.from_numbers_import_Number =
          "from numbers import Number"),
        [
          Blockly.Python.provideFunction_("math_isPrime", [
            "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(n):",
            "  # https://en.wikipedia.org/wiki/Primality_test#Naive_methods",
            "  # If n is not a number but a string, try parsing it.",
            "  if not isinstance(n, Number):",
            "    try:",
            "      n = float(n)",
            "    except:",
            "      return False",
            "  if n == 2 or n == 3:",
            "    return True",
            "  # False if n is negative, is 1, or not whole, or if n is divisible by 2 or 3.",
            "  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:",
            "    return False",
            "  # Check all the numbers of form 6k +/- 1, up to sqrt(n).",
            "  for x in range(6, int(math.sqrt(n)) + 2, 6):",
            "    if n % (x - 1) == 0 or n % (x + 1) == 0:",
            "      return False",
            "  return True",
          ]) +
            "(" +
            t +
            ")",
          Blockly.Python.ORDER_FUNCTION_CALL,
        ]
      );
    switch (l) {
      case "EVEN":
        var n = t + " % 2 == 0";
        break;
      case "ODD":
        n = t + " % 2 == 1";
        break;
      case "WHOLE":
        n = t + " % 1 == 0";
        break;
      case "POSITIVE":
        n = t + " > 0";
        break;
      case "NEGATIVE":
        n = t + " < 0";
        break;
      case "DIVISIBLE_BY":
        if (
          ((o = Blockly.Python.valueToCode(
            o,
            "DIVISOR",
            Blockly.Python.ORDER_MULTIPLICATIVE
          )),
          !o || "0" == o)
        )
          return ["False", Blockly.Python.ORDER_ATOMIC];
        n = t + " % " + o + " == 0";
    }
    return [n, Blockly.Python.ORDER_RELATIONAL];
  }),
  (Blockly.Python.math_change = function (o) {
    Blockly.Python.definitions_.from_numbers_import_Number =
      "from numbers import Number";
    var t =
      Blockly.Python.valueToCode(o, "DELTA", Blockly.Python.ORDER_ADDITIVE) ||
      "0";
    return (
      (o = Blockly.Python.variableDB_.getName(
        o.getField("VAR").getText(),
        Blockly.Variables.NAME_TYPE
      )),
      o + " = (" + o + " if isinstance(" + o + ", Number) else 0) + " + t + "\n"
    );
  }),
  (Blockly.Python.math_round = Blockly.Python.math_single),
  (Blockly.Python.math_trig = Blockly.Python.math_single),
  (Blockly.Python.math_on_list = function (o) {
    var t = o.getFieldValue("OP");
    switch (
      ((o =
        Blockly.Python.valueToCode(o, "LIST", Blockly.Python.ORDER_NONE) ||
        "[]"),
      t)
    ) {
      case "SUM":
        t = "sum(" + o + ")";
        break;
      case "MIN":
        t = "min(" + o + ")";
        break;
      case "MAX":
        t = "max(" + o + ")";
        break;
      case "AVERAGE":
        (Blockly.Python.definitions_.from_numbers_import_Number =
          "from numbers import Number"),
          (t = Blockly.Python.provideFunction_("math_mean", [
            "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(myList):",
            "  localList = [e for e in myList if isinstance(e, Number)]",
            "  if not localList: return",
            "  return float(sum(localList)) / len(localList)",
          ])),
          (t = t + "(" + o + ")");
        break;
      case "MEDIAN":
        (Blockly.Python.definitions_.from_numbers_import_Number =
          "from numbers import Number"),
          (t = Blockly.Python.provideFunction_("math_median", [
            "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(myList):",
            "  localList = sorted([e for e in myList if isinstance(e, Number)])",
            "  if not localList: return",
            "  if len(localList) % 2 == 0:",
            "    return (localList[len(localList) // 2 - 1] + localList[len(localList) // 2]) / 2.0",
            "  else:",
            "    return localList[(len(localList) - 1) // 2]",
          ])),
          (t = t + "(" + o + ")");
        break;
      case "MODE":
        (t = Blockly.Python.provideFunction_("math_modes", [
          "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(some_list):",
          "  modes = []",
          "  # Using a lists of [item, count] to keep count rather than dict",
          '  # to avoid "unhashable" errors when the counted item is itself a list or dict.',
          "  counts = []",
          "  maxCount = 1",
          "  for item in some_list:",
          "    found = False",
          "    for count in counts:",
          "      if count[0] == item:",
          "        count[1] += 1",
          "        maxCount = max(maxCount, count[1])",
          "        found = True",
          "    if not found:",
          "      counts.append([item, 1])",
          "  for counted_item, item_count in counts:",
          "    if item_count == maxCount:",
          "      modes.append(counted_item)",
          "  return modes",
        ])),
          (t = t + "(" + o + ")");
        break;
      case "STD_DEV":
        (Blockly.Python.definitions_.import_math = "import math"),
          (t = Blockly.Python.provideFunction_("math_standard_deviation", [
            "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(numbers):",
            "  n = len(numbers)",
            "  if n == 0: return",
            "  mean = float(sum(numbers)) / n",
            "  variance = sum((x - mean) ** 2 for x in numbers) / n",
            "  return math.sqrt(variance)",
          ])),
          (t = t + "(" + o + ")");
        break;
      case "RANDOM":
        (Blockly.Python.definitions_.import_random = "import random"),
          (t = "random.choice(" + o + ")");
        break;
      default:
        throw Error("Unknown operator: " + t);
    }
    return [t, Blockly.Python.ORDER_FUNCTION_CALL];
  }),
  (Blockly.Python.math_modulo = function (o) {
    var t =
      Blockly.Python.valueToCode(
        o,
        "DIVIDEND",
        Blockly.Python.ORDER_MULTIPLICATIVE
      ) || "0";
    return (
      (o =
        Blockly.Python.valueToCode(
          o,
          "DIVISOR",
          Blockly.Python.ORDER_MULTIPLICATIVE
        ) || "0"),
      [t + " % " + o, Blockly.Python.ORDER_MULTIPLICATIVE]
    );
  }),
  (Blockly.Python.math_constrain = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
        "0",
      l =
        Blockly.Python.valueToCode(o, "LOW", Blockly.Python.ORDER_NONE) || "0";
    return (
      (o =
        Blockly.Python.valueToCode(o, "HIGH", Blockly.Python.ORDER_NONE) ||
        "float('inf')"),
      [
        "min(max(" + t + ", " + l + "), " + o + ")",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.math_random_int = function (o) {
    Blockly.Python.definitions_.import_random = "import random";
    var t =
      Blockly.Python.valueToCode(o, "FROM", Blockly.Python.ORDER_NONE) || "0";
    return (
      (o =
        Blockly.Python.valueToCode(o, "TO", Blockly.Python.ORDER_NONE) || "0"),
      [
        "random.randint(" + t + ", " + o + ")",
        Blockly.Python.ORDER_FUNCTION_CALL,
      ]
    );
  }),
  (Blockly.Python.math_random_float = function (o) {
    return (
      (Blockly.Python.definitions_.import_random = "import random"),
      ["random.random()", Blockly.Python.ORDER_FUNCTION_CALL]
    );
  }),
  (Blockly.Python.math_atan2 = function (o) {
    Blockly.Python.definitions_.import_math = "import math";
    var t =
      Blockly.Python.valueToCode(o, "X", Blockly.Python.ORDER_NONE) || "0";
    return [
      "math.atan2(" +
        (Blockly.Python.valueToCode(o, "Y", Blockly.Python.ORDER_NONE) || "0") +
        ", " +
        t +
        ") / math.pi * 180",
      Blockly.Python.ORDER_MULTIPLICATIVE,
    ];
  }),
  (Blockly.Python.procedures = {}),
  (Blockly.Python.procedures_defreturn = function (o) {
    for (
      var t,
        l = [],
        n = o.workspace,
        e = Blockly.Variables.allUsedVarModels(n) || [],
        y = 0;
      (t = e[y]);
      y++
    )
      (t = t.name),
        -1 == o.arguments_.indexOf(t) &&
          l.push(
            Blockly.Python.variableDB_.getName(
              t,
              Blockly.VARIABLE_CATEGORY_NAME
            )
          );
    for (
      n = Blockly.Variables.allDeveloperVariables(n), y = 0;
      y < n.length;
      y++
    )
      l.push(
        Blockly.Python.variableDB_.getName(
          n[y],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE
        )
      );
    (l = l.length
      ? Blockly.Python.INDENT + "global " + l.join(", ") + "\n"
      : ""),
      (n = Blockly.Python.variableDB_.getName(
        o.getFieldValue("NAME"),
        Blockly.PROCEDURE_CATEGORY_NAME
      )),
      (e = ""),
      Blockly.Python.STATEMENT_PREFIX &&
        (e += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, o)),
      Blockly.Python.STATEMENT_SUFFIX &&
        (e += Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, o)),
      e && (e = Blockly.Python.prefixLines(e, Blockly.Python.INDENT)),
      (t = ""),
      Blockly.Python.INFINITE_LOOP_TRAP &&
        (t = Blockly.Python.prefixLines(
          Blockly.Python.injectId(Blockly.Python.INFINITE_LOOP_TRAP, o),
          Blockly.Python.INDENT
        ));
    var r = Blockly.Python.statementToCode(o, "STACK"),
      c =
        Blockly.Python.valueToCode(o, "RETURN", Blockly.Python.ORDER_NONE) ||
        "",
      a = "";
    r && c && (a = e),
      c
        ? (c = Blockly.Python.INDENT + "return " + c + "\n")
        : r || (r = Blockly.Python.PASS);
    var i = [];
    for (y = 0; y < o.arguments_.length; y++)
      i[y] = Blockly.Python.variableDB_.getName(
        o.arguments_[y],
        Blockly.VARIABLE_CATEGORY_NAME
      );
    return (
      (l = "def " + n + "(" + i.join(", ") + "):\n" + l + e + t + r + a + c),
      (l = Blockly.Python.scrub_(o, l)),
      (Blockly.Python.definitions_["%" + n] = l),
      null
    );
  }),
  (Blockly.Python.procedures_defnoreturn = Blockly.Python.procedures_defreturn),
  (Blockly.Python.procedures_callreturn = function (o) {
    for (
      var t = Blockly.Python.variableDB_.getName(
          o.getFieldValue("NAME"),
          Blockly.PROCEDURE_CATEGORY_NAME
        ),
        l = [],
        n = 0;
      n < o.arguments_.length;
      n++
    )
      l[n] =
        Blockly.Python.valueToCode(o, "ARG" + n, Blockly.Python.ORDER_NONE) ||
        "None";
    return [t + "(" + l.join(", ") + ")", Blockly.Python.ORDER_FUNCTION_CALL];
  }),
  (Blockly.Python.procedures_callnoreturn = function (o) {
    return Blockly.Python.procedures_callreturn(o)[0] + "\n";
  }),
  (Blockly.Python.procedures_ifreturn = function (o) {
    var t =
      "if " +
      (Blockly.Python.valueToCode(o, "CONDITION", Blockly.Python.ORDER_NONE) ||
        "False") +
      ":\n";
    return (
      Blockly.Python.STATEMENT_SUFFIX &&
        (t += Blockly.Python.prefixLines(
          Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, o),
          Blockly.Python.INDENT
        )),
      o.hasReturnValue_
        ? ((o =
            Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
            "None"),
          (t += Blockly.Python.INDENT + "return " + o + "\n"))
        : (t += Blockly.Python.INDENT + "return\n"),
      t
    );
  }),
  (Blockly.Python.texts = {}),
  (Blockly.Python.text = function (o) {
    return [
      Blockly.Python.quote_(o.getFieldValue("TEXT")),
      Blockly.Python.ORDER_ATOMIC,
    ];
  }),
  (Blockly.Python.text.forceString_ = function (o) {
    return Blockly.Python.text.forceString_.strRegExp.test(o)
      ? o
      : "str(" + o + ")";
  }),
  (Blockly.Python.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/),
  (Blockly.Python.text_join = function (o) {
    switch (o.itemCount_) {
      case 0:
        return ["''", Blockly.Python.ORDER_ATOMIC];
      case 1:
        return (
          (o =
            Blockly.Python.valueToCode(o, "ADD0", Blockly.Python.ORDER_NONE) ||
            "''"),
          (o = Blockly.Python.text.forceString_(o)),
          [o, Blockly.Python.ORDER_FUNCTION_CALL]
        );
      case 2:
        var t =
          Blockly.Python.valueToCode(o, "ADD0", Blockly.Python.ORDER_NONE) ||
          "''";
        return (
          (o =
            Blockly.Python.valueToCode(o, "ADD1", Blockly.Python.ORDER_NONE) ||
            "''"),
          (o =
            Blockly.Python.text.forceString_(t) +
            " + " +
            Blockly.Python.text.forceString_(o)),
          [o, Blockly.Python.ORDER_ADDITIVE]
        );
      default:
        t = [];
        for (var l = 0; l < o.itemCount_; l++)
          t[l] =
            Blockly.Python.valueToCode(
              o,
              "ADD" + l,
              Blockly.Python.ORDER_NONE
            ) || "''";
        return (
          (o = Blockly.Python.variableDB_.getDistinctName(
            "x",
            Blockly.Variables.NAME_TYPE
          )),
          (o =
            "''.join([str(" +
            o +
            ") for " +
            o +
            " in [" +
            t.join(", ") +
            "]])"),
          [o, Blockly.Python.ORDER_FUNCTION_CALL]
        );
    }
  }),
  (Blockly.Python.text_append = function (o) {
    var t = Blockly.Python.variableDB_.getName(
      o.getField("VAR").getText(),
      Blockly.Variables.NAME_TYPE
    );
    return (
      (o =
        Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_NONE) ||
        "''"),
      t + " = str(" + t + ") + " + Blockly.Python.text.forceString_(o) + "\n"
    );
  }),
  (Blockly.Python.text_length = function (o) {
    return [
      "len(" +
        (Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
          "''") +
        ")",
      Blockly.Python.ORDER_FUNCTION_CALL,
    ];
  }),
  (Blockly.Python.text_isEmpty = function (o) {
    return [
      "not len(" +
        (Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) ||
          "''") +
        ")",
      Blockly.Python.ORDER_LOGICAL_NOT,
    ];
  }),
  (Blockly.Python.text_indexOf = function (o) {
    var t = "FIRST" == o.getFieldValue("END") ? "find" : "rfind",
      l =
        Blockly.Python.valueToCode(o, "FIND", Blockly.Python.ORDER_NONE) ||
        "''";
    return (
      (t =
        (Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_MEMBER) ||
          "''") +
        "." +
        t +
        "(" +
        l +
        ")"),
      o.workspace.options.oneBasedIndex
        ? [t + " + 1", Blockly.Python.ORDER_ADDITIVE]
        : [t, Blockly.Python.ORDER_FUNCTION_CALL]
    );
  }),
  (Blockly.Python.text_charAt = function (o) {
    var t = o.getFieldValue("WHERE") || "FROM_START",
      l =
        Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_MEMBER) ||
        "''";
    switch (t) {
      case "FIRST":
        return [l + "[0]", Blockly.Python.ORDER_MEMBER];
      case "LAST":
        return [l + "[-1]", Blockly.Python.ORDER_MEMBER];
      case "FROM_START":
        return (
          (o = Blockly.Python.getAdjustedInt(o, "AT")),
          [l + "[" + o + "]", Blockly.Python.ORDER_MEMBER]
        );
      case "FROM_END":
        return (
          (o = Blockly.Python.getAdjustedInt(o, "AT", 1, !0)),
          [l + "[" + o + "]", Blockly.Python.ORDER_MEMBER]
        );
      case "RANDOM":
        return (
          (Blockly.Python.definitions_.import_random = "import random"),
          [
            Blockly.Python.provideFunction_("text_random_letter", [
              "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(text):",
              "  x = int(random.random() * len(text))",
              "  return text[x];",
            ]) +
              "(" +
              l +
              ")",
            Blockly.Python.ORDER_FUNCTION_CALL,
          ]
        );
    }
    throw Error("Unhandled option (text_charAt).");
  }),
  (Blockly.Python.text_getSubstring = function (o) {
    var t = o.getFieldValue("WHERE1"),
      l = o.getFieldValue("WHERE2"),
      n =
        Blockly.Python.valueToCode(o, "STRING", Blockly.Python.ORDER_MEMBER) ||
        "''";
    switch (t) {
      case "FROM_START":
        (t = Blockly.Python.getAdjustedInt(o, "AT1")), "0" == t && (t = "");
        break;
      case "FROM_END":
        t = Blockly.Python.getAdjustedInt(o, "AT1", 1, !0);
        break;
      case "FIRST":
        t = "";
        break;
      default:
        throw Error("Unhandled option (text_getSubstring)");
    }
    switch (l) {
      case "FROM_START":
        o = Blockly.Python.getAdjustedInt(o, "AT2", 1);
        break;
      case "FROM_END":
        (o = Blockly.Python.getAdjustedInt(o, "AT2", 0, !0)),
          Blockly.isNumber(String(o))
            ? "0" == o && (o = "")
            : ((Blockly.Python.definitions_.import_sys = "import sys"),
              (o += " or sys.maxsize"));
        break;
      case "LAST":
        o = "";
        break;
      default:
        throw Error("Unhandled option (text_getSubstring)");
    }
    return [n + "[" + t + " : " + o + "]", Blockly.Python.ORDER_MEMBER];
  }),
  (Blockly.Python.text_changeCase = function (o) {
    var t = {
      UPPERCASE: ".upper()",
      LOWERCASE: ".lower()",
      TITLECASE: ".title()",
    }[o.getFieldValue("CASE")];
    return [
      (Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_MEMBER) ||
        "''") + t,
      Blockly.Python.ORDER_FUNCTION_CALL,
    ];
  }),
  (Blockly.Python.text_trim = function (o) {
    var t = { LEFT: ".lstrip()", RIGHT: ".rstrip()", BOTH: ".strip()" }[
      o.getFieldValue("MODE")
    ];
    return [
      (Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_MEMBER) ||
        "''") + t,
      Blockly.Python.ORDER_FUNCTION_CALL,
    ];
  }),
  (Blockly.Python.text_print = function (o) {
    return (
      "print(" +
      (Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_NONE) ||
        "''") +
      ")\n"
    );
  }),
  (Blockly.Python.text_prompt_ext = function (o) {
    var t = Blockly.Python.provideFunction_("text_prompt", [
        "def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(msg):",
        "  try:",
        "    return raw_input(msg)",
        "  except NameError:",
        "    return input(msg)",
      ]),
      l = o.getField("TEXT")
        ? Blockly.Python.quote_(o.getFieldValue("TEXT"))
        : Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_NONE) ||
          "''";
    return (
      (t = t + "(" + l + ")"),
      "NUMBER" == o.getFieldValue("TYPE") && (t = "float(" + t + ")"),
      [t, Blockly.Python.ORDER_FUNCTION_CALL]
    );
  }),
  (Blockly.Python.text_prompt = Blockly.Python.text_prompt_ext),
  (Blockly.Python.text_count = function (o) {
    var t =
      Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_MEMBER) ||
      "''";
    return (
      (o =
        Blockly.Python.valueToCode(o, "SUB", Blockly.Python.ORDER_NONE) ||
        "''"),
      [t + ".count(" + o + ")", Blockly.Python.ORDER_MEMBER]
    );
  }),
  (Blockly.Python.text_replace = function (o) {
    var t =
        Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_MEMBER) ||
        "''",
      l =
        Blockly.Python.valueToCode(o, "FROM", Blockly.Python.ORDER_NONE) ||
        "''";
    return (
      (o =
        Blockly.Python.valueToCode(o, "TO", Blockly.Python.ORDER_NONE) || "''"),
      [t + ".replace(" + l + ", " + o + ")", Blockly.Python.ORDER_MEMBER]
    );
  }),
  (Blockly.Python.text_reverse = function (o) {
    return [
      (Blockly.Python.valueToCode(o, "TEXT", Blockly.Python.ORDER_MEMBER) ||
        "''") + "[::-1]",
      Blockly.Python.ORDER_MEMBER,
    ];
  }),
  (Blockly.Python.variables = {}),
  (Blockly.Python.variables_get = function (o) {
    return [
      Blockly.Python.variableDB_.getName(
        o.getField("VAR").getText(),
        Blockly.Variables.NAME_TYPE
      ),
      Blockly.Python.ORDER_ATOMIC,
    ];
  }),
  (Blockly.Python.variables_set = function (o) {
    var t =
      Blockly.Python.valueToCode(o, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return (
      Blockly.Python.variableDB_.getName(
        o.getField("VAR").getText(),
        Blockly.Variables.NAME_TYPE
      ) +
      " = " +
      t +
      "\n"
    );
  }),
  (Blockly.Python.variablesDynamic = {}),
  (Blockly.Python.variables_get_dynamic = Blockly.Python.variables_get),
  (Blockly.Python.variables_set_dynamic = Blockly.Python.variables_set);

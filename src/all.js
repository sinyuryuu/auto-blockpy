$(document).ready(function () {

  
  $("#input-xml" ).hide();
  $("#output-xml" ).hide()
  $("#change-tool").hide()
  $("#change-bar").hide()

  function changeTheme() {
    var theme = document.getElementById("themeChanger");
    Blockly.getMainWorkspace().setTheme(Blockly.Themes.Dark);
  }

  /**
   * Define blocks from an array of JSON block definitions, as might be generated
   * https://github.com/google/blockly/issues/1760
   * by the Blockly Developer Tools.
   * @param {!Array.<!Object>} jsonArray An array of JSON block definitions.
   */
  Blockly.defineBlocksWithJsonArray = function (jsonArray) {
    for (var i = 0, elem; (elem = jsonArray[i]); i++) {
      var typename = elem.type;
      if (typename == null || typename === "") {
        console.warn("Block 定義 #" + i + " JSON 數組中缺少類型屬性。跳過。");
      } else {
        if (Blockly.Blocks[typename]) {
          /* console.warn("Block 定義 #" +i +' 在 JSON 數組中覆蓋之前的定義 "' +typename +'".'); */
        }
        Blockly.Blocks[typename] = {
          init: Blockly.jsonInitFactory_(elem),
        };
      }
    }
  };

  const blockmirror = document.getElementById("blockmirror-editor");
  // const toolBarList = ["full", "minimal", "ct2", "normal", "empty"];
  const toolBarList = ["minimal", "full"]; //顯示不同工具箱
  let toolBarMode = 0;
  let editor = null;
  const initBM = (toolBox) => {
    blockmirror.replaceChildren();
    editor = new BlockMirror({
      container: blockmirror,
      blocklyMediaPath: "media/",
      skipSkulpt: false,
      toolbox: toolBox,
      height: 500,
    });
  };
  initBM(toolBarList[toolBarMode]);
  $("#change-bar").click(function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "確定嗎?",
        text: "修改工具箱後，您的程式碼將會清除",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "修改",
        cancelButtonText: "取消",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire("已修改!", "修改工具箱完成", "success");
          toolBarMode += 1;
          toolBarMode %= toolBarList.length;
          initBM(toolBarList[toolBarMode]);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("取消", "已保留工具箱 :)", "info");
        }
      });
  });

  /*    */

  /* 設定預設Python程式碼 */
  editor.setCode("");

  $("#go").click(function () {
    var code = editor.getCode();
    console.log(code);
    //alert(code);
    if (code === "") {
      Swal.fire("您的程式碼為空", "請輸入程式碼", "info");
    } else {
      Swal.fire("您的程式碼", code, "info");
    }
  });

  $("#run").click(function () {
    editor.blockEditor.setCode(
      'class X:\n    """こんにちは"""\ndef add(self, a, b):\n        a = 0\n        return a\n\nx = X()\nx.add(5,3)'
    );
  });

  $("#reset").click(function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "確定嗎?",
        text: "您將無法還原此內容!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "清除",
        cancelButtonText: "取消",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "已清除!",
            "您的程式碼已全部清除",
            "success"
          );
          editor.blockEditor.setCode("");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("取消", "您的程式碼已保留 :)", "info");
        }
      });
  });

  $("#changetheme").click(function () {
    Blockly.getMainWorkspace().setTheme(Blockly.Themes.Dark);
  });

  /* 在警示視窗輸入名稱並下載副檔名為.py */
  $("#download").click(function () {
    var code = editor.getCode();
    swal.fire({
      showCancelButton: true,
      title: "請輸入檔案名稱",
      inputAttributes: {
        autocapitalize: "off",
      },
      confirmButtonText: "確定",
      cancelButtonText: "取消",

      html: `<input class="input-file-text" id="input1" type="text">`,

      preConfirm: function () {
        filename = $("#input1").val();
        console.log(filename); // use user input value freely

        if (filename === "") {
          Swal.fire("尚未輸入檔名", "請再輸入一次檔案名稱", "question");
        } else {
          var pom = document.createElement("a");
          pom.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(code)
          );
          if (filename) {
            pom.setAttribute("download", filename + ".py");
          }
          pom.click();

          /* 清空filename */
          filename = "";
        }
      },
    }); // end of swal;
  });

  function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
  }
  function builtinRead(x) {
    if (
      Sk.builtinFiles === undefined ||
      Sk.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }

  // Here's everything you need to run a python program in skulpt
  // grab the code from your textarea
  // get a reference to your pre element for output
  // configure the output function
  // call Sk.importMainWithBody()
  function runit() {
    var prog = editor.getCode();
    var mypre = document.getElementById("output");
    mypre.innerHTML = "";
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
    var myPromise = Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(
      function (mod) {
        console.log("success");
      },
      function (err) {
        console.log(err.toString());
      }
    );
  }

  /* 讀取檔案 */

  $("#upload").click(function () {
    var file = $("#file")[0].files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      /* 去除contents 空白段落 */
      contents = contents.replace(/\n\s*\n/g, "\n");
      editor.blockEditor.setCode(contents);
    };
    reader.readAsText(file);
  });

  $("#change-tool").click(function () {
    $(".customLabel").html("修改成功!!!");
    $(".customLabel").css("color", "green");
    $(".customLabel").css("font-size", "20px");
    $(".customLabel").css("font-weight", "bold");
    $(".customLabel").css("text-align", "center");
    $(".customLabel").css("margin-top", "10px");
    $(".customLabel").css("margin-bottom", "10px");
    $(".customLabel").css("margin-left", "10px");
    $(".customLabel").css("margin-right", "10px");
    $(".customLabel").css("border-radius", "10px");
    $(".customLabel").css("background-color", "#f2f2f2");
    $(".customLabel").css("padding", "10px");
  });

  $("#block").click(function () {
    editor.setMode("block");
  });

  $("#split").click(function () {
    editor.setMode("split");
  });

  $("#text").click(function () {
    editor.setMode("text");
  });


  /* https://groups.google.com/g/blockly/c/IeSzg4DQ1TM
  
  techplex...@gmail.com
  匯出、匯入xml檔案 
   */

  $("#output-xml").click(function () {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    console.log(xml_text);
    $("#myOutputTextarea").val(xml_text).focus();
  });

  $("#input-xml").click(function () {
    editor.blockEditor.setCode("");
    var xml_text = $("#myOutputTextarea").val();
    var xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
  });

  $("#debug").click(function () {

    $("#input-xml" ).toggle(1500);
    $("#output-xml" ).toggle(1500);
    $("#change-tool").toggle(1500);
    $("#change-bar").toggle(1500);
  

  });


});

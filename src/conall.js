$(document).ready(function () {
   $("#detailed").hide();






  const $navbarBurgers = $(".navbar-burger");

  // Add a click event on each of thems
  $navbarBurgers.click(function () {
    // Get the target from the "data-target" attribute
    const target = $(this).data("target");
    const $target = $(`#${target}`);

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(this).toggleClass("is-active");
    $target.toggleClass("is-active");
  });

  //Timer
  function makeTimerRequest() {
    var qssid = $(".qssid").attr("name");

    $.ajax({
      type: "Post",
      sync: true,
      url: "/Exam/Timer",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      data: { para1: "strtime", para2: qssid },
      success: function (res) {
        console.log(res);
        //是否第一次執行?
        var firstrun = true;

        //設定模式 block split text

        //editor.setMode("split");

        if (firstrun == true && res.exammod == "無限制") {
          if (res.mod == "blockly") {
            editor.setMode("block");
          } else if (res.mod == "dual") {
            editor.setMode("split");
          } else if (res.mod == "text") {
            editor.setMode("text");
          }
        } else if (firstrun == true && res.exammod != "無限制") {
          console.log(res.exammod); //積木 雙重 文字
          if (res.exammod == "積木") {
            editor.setMode("block");
          } else if (res.exammod == "雙重") {
            editor.setMode("split");
          } else if (res.exammod == "文字") {
            editor.setMode("text");
          }
        }

        var firstrun = false;

        //沒答過題
        if (res.code == 0) {
          /* 設定預設Python程式碼 
         是否以後能用xml檔案方式匯入?
         (保留積木方塊的座標以及程式碼)
      */
          editor.setCode("");
        } else {
          //若有答題過清空作答區，設定作答區

          var usercode = res.res;

          //設定預設Python程式碼
          editor.setCode(usercode);
        }
      },
      error: function () {
        console.log("連線失敗");
      },
      beforeSend: function () {
        //lottiefiles
      },
      error: function () {
        console.log("連線失敗");
      },
      complete: function () {
        // 關閉進度條
      },
    });
  }

  makeTimerRequest();

  // function setOnClickHandler(func) {
  //   if (typeof func === "function" || func === null) {
  //     // Add code here to handle the onClick event
  //     //https://developers.google.com/blockly/reference/js/blockly.fieldimage_class.setonclickhandler_1_method.md?authuser=8&hl=zh-tw
  //     //https://groups.google.com/g/blockly/c/rzcpN8iIrRU
  //   }
  // }

  $("#input-xml").hide();
  $("#output-xml").hide();
  $("#change-tool").hide();
  $("#change-bar").hide();
  $("#debugconsole").hide();

  function changeTheme() {
    var theme = document.getElementById("themeChanger");
    Blockly.getMainWorkspace().setTheme(Blockly.Themes.Dark);
  }

  const fileInput = document.querySelector("#file-js-example input[type=file]");
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector("#file-js-example .file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };

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

  const $blockmirror = $("#blockmirror-editor");
  const toolBarList = ["minimal", "full"]; //顯示不同工具箱
  let toolBarMode = 0;
  let editor = null;
  const initBM = (toolBox) => {
    $blockmirror.empty();
    editor = new BlockMirror({
      container: $blockmirror[0],
      blocklyMediaPath: "media/",
      skipSkulpt: false,
      toolbox: toolBox,
      height: 750,
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
        text: "您將無法還原此內容!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "清除",
        cancelButtonText: "取消",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
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

  $("#go").click(function () {
    var code = editor.getCode();
    console.log(code);
    //alert(code);
    if (code === "") {
      Swal.fire("您的程式碼為空", "請輸入程式碼", "info");
    } else {
      Swal.fire("您的程式碼", code, "info");
    }
    $.ajax({
      type: "post",
      url: "/Home/Code",
      data: { para1: "code", para2: code },
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      success: function (res) {
        console.log(res);
        //res to utf-8

        if (res.code == 0 && res.respone == "答案正確") {
          re = res.msg;

          //顯示在textarea
          document.getElementById("Outcmd").value = re;
          //document.getElementById("myOutputTextarea").value = re;

          Swal.fire("您的結果", res.msg, "success");

          //code ==3
        } else if (res.code == 3 && res.respone == "答案錯誤") {
          {
            re = res.msg;

            //顯示在textarea
            document.getElementById("Outcmd").value = re;
            //document.getElementById("myOutputTextarea").value = re;

            Swal.fire("您的結果", res.respone, "error");
          }
          //code ==4
        } else if (res.code == 4 && res.respone == "程式錯誤") {
          {
            re = res.msg;

            //顯示在textarea
            document.getElementById("Outcmd").value = re;
            //document.getElementById("myOutputTextarea").value = re;

            Swal.fire("您的結果", res.msg, "error");
          }
        } else {
          Swal.fire("錯誤", res.msg, "error");
        }
      },
      error: function () {
        alert("error");
      },
      beforeSend: function () {
        //進度條
      },
      complete: function () {
        // 關閉進度條
      },
    });
  });

  $("#testgo").click(function () {
    var code = editor.getCode();
    console.log(code);
    //alert(code);
    localStorage.setItem("code", editor.getCode());

    //取得目前模式
    var mode = editor.getMode();

    var qssid = $(".qssid").attr("name");
    var cqssid = $("#qssid").attr("name");
    var CourseId = $(".CourseId").attr("name");

    //console.log(qssid);
    //console.log(cqssid);
    //console.log(mode);
    if (code === "") {
      Swal.fire("您的程式碼為空", "請輸入程式碼", "info");

      return;
    }

    //  移除所有空白行
    //code = code.replace(/(^\s*)|(\s*$)/g, "");

    /*     else {
      Swal.fire("您的程式碼", code, "info");
    } */
    $.ajax({
      type: "post",
      url: "/Home/Checkcode",
      data: {
        para1: "code",
        para2: code,
        para3: qssid,
        para4: CourseId,
        para5: mode,
      },
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      success: function (res) {
        console.log(res);
        //res to utf-8

        if (res.code == 0 && res.respone == "答案正確") {
          re = res.msg;

          next = res.next;

          //顯示在textarea
          document.getElementById("Outcmd").value = re;
          //隱藏顯示div 顯示詳細結果
          $("#detailed").hide();



       

          //清空＃code
          $("#code").text("");
          $("#code").text(re);

          makeTimerRequest();

          if (next != "null") {
            Swal.fire({
              title: "答案正確",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "下一題",
              cancelButtonText: "取消",
              preConfirm: function () {
                return new Promise(function (resolve) {
                  $.ajax({
                    type: "POST",
                    url: "/Exam/Nextblockly",
                    async: true,
                    data: { name: next },
                    success: function (result) {
                      $("#con").html("");
                      $(".con").html("");
                      $(".con").append(result);
                      console.log(result);
                      resolve();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                      Swal.fire({
                        title: "作業失敗", //標題
                        html: "發生錯誤:" + xhr.status, //訊息內容(可省略)
                        icon: "error", //圖示(可省略) success/info/warning/error/question
                      });
                    },
                  });
                });
              },
              allowOutsideClick: false, //執行時是否允許外部點擊
            }).then(function (choose) {
              if (choose.dismiss != "cancel") {
                swal.close();
              }
            });
          } else {
            Swal.fire("答案正確", "此題目為最後一題", "success");
            //解除考試模式
          }

          //code ==3
        } else if (res.code == 1 && res.msg == "可能包含惡意程式碼") {
          Swal.fire("您的結果", res.msg, "error");
          makeTimerRequest();
        } else if (res.code == 1 && res.msg == "超出輸入範圍") {
          Swal.fire("您的結果", res.msg, "error");
          //Timer
          makeTimerRequest();
        } else if (res.code == 3 && res.respone == "答案錯誤") {
          {
            re = res.msg;

            temp = re;

            temp = temp.replace(/\n/g, " "); //去/n

            console.log(temp);

            //檢查是否為空值或是空字串
            if (
              temp == null ||
              temp == undefined ||
              temp == " " ||
              temp == ""
            ) {
              document.getElementById("Outcmd").value = "沒有輸出結果";
             
              $("#code").text("");
              $("#code").text("沒有輸出結果");

              $("#detailed").hide();


              Swal.fire("您的結果", "沒有輸出結果", "info");
              makeTimerRequest();
            } else {
              //顯示在textarea
              document.getElementById("Outcmd").value = re;

              reans = res.ans;
              reinput = res.input;
              //document.getElementById("myOutputTextarea").value = re;
              $("#code").text("");
              $("#detailed").show();

              $("#code").text(re);
              $('#tinput').text(reinput);
              $("#tans").text(reans);

              Swal.fire("您的結果", res.respone, "error");
            }

            //Timer
            makeTimerRequest();
          }
          //code ==4
        } else if (res.code == 4 && res.respone == "程式錯誤") {
          {
            re = res.msg;

            reans = res.ans;
            reinput = res.input;

            //顯示在textarea
            document.getElementById("Outcmd").value = re;
            //document.getElementById("myOutputTextarea").value = re;
            $("#code").text("");
            //$("#tans").text("");
            $("#detailed").show();

            $("#code").text(re);
             $("#tinput").text(reinput);
            $("#tans").text(reans);
            //document.querySelector("code").textContent = re;

            Swal.fire("您的結果", res.msg, "error");

            makeTimerRequest();
          }
        } else if (res.code == 5 && res.respone == "執行逾時或輸出值超過範圍") {
          re = res.msg;

           $("#detailed").hide();

          Swal.fire("您的結果", res.msg, "error");
          makeTimerRequest();
        } else {
          $("#detailed").hide();

          Swal.fire("錯誤", "未知錯誤", "error");
          makeTimerRequest();
        }
      },
      error: function () {
        Swal.fire("錯誤", "與伺服器連線中斷", "error");
        makeTimerRequest();
      },
      beforeSend: function () {
        //lottiefiles
        Swal.fire({
          title: "執行中",
          //css左右兩邊10px lottie-player置中對齊
          html: '<div style="margin:0 auto; width: 250px;"><lottie-player src="/lib/blcokpy-new/src/lf30_3jasaad5.json"  background="transparent"  speed="1"  style="width: 250px; height: 250px;"  loop  autoplay></lottie-player></div>',

          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: false,
        });
      },
      complete: function () {
        // 關閉進度條
      },
    });
  });

  $("#run").click(function () {
    // get id= "qssid" name
    var qssid = $("#qssid").attr("name");

    $.ajax({
      type: "Post",
      sync: true,
      url: "/Home/Getans",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      data: { para1: qssid },
      success: function (res) {
        console.log(res);
        //res to utf-8
        //程式碼到編輯區
        //editor.blockEditor.setCode();
        editor.setCode(res.msg);
        Swal.close();
      },
      error: function () {},
      beforeSend: function () {
        //lottiefiles
        Swal.fire({
          title: "執行中",
          //css左右兩邊10px lottie-player置中對齊
          html: '<div style="margin:0 auto; width: 250px;"><lottie-player src="/lib/blcokpy-new/src/lf20_gbfwtkzw.json"  background="transparent"  speed="1"  style="width: 250px; height: 250px;"  loop  autoplay></lottie-player></div>',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: false,
        });
      },
      error: function () {
        Swal.fire("錯誤", "與伺服器連線中斷", "error");
      },
      complete: function () {
        // 關閉進度條
      },
    });
  });

  $("#reset").click(function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
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
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "已清除!",
            "您的程式碼已全部清除",
            "success"
          );
          //editor.blockEditor.setCode("");
          editor.setCode("");
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

    Swal.fire({
      title: "匯出檔案",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "建立",
      cancelButtonText: "取消",
      html: `<input id="input1" type="text">`,
      preConfirm: function () {
        return new Promise(function (resolve) {
          filename = $("#input1").val();
          console.log(filename); // use user input value freely

          resolve();

          if (filename != "") {
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
          } else {
            console.log("空值"); // use user input value freely
          }
        });
      },
      allowOutsideClick: false, //執行時是否允許外部點擊
    }).then(function (choose) {
      if (choose.dismiss != "cancel") {
        swal.close();
      }
    });
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

  var styles = {
    color: "green",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    borderRadius: "10px",
    backgroundColor: "#f2f2f2",
    padding: "10px",
  };

  $("#change-tool").click(function () {
    $(".customLabel").html("修改成功!!!").css(styles);
  });

  $("#block").click(function () {
    editor.setMode("block");

    var qssid = $(".qssid").attr("name");
    var cqssid = $("#qssid").attr("name");
    var CourseId = $(".CourseId").attr("name");
    var code = editor.getCode();

    //紀錄目前時間
    var now = new Date();
    //將時間轉換成字串
    var time = now.toLocaleString();
    console.log(time);

    //ajax
    $.ajax({
      type: "Post",
      sync: true,
      url: "/ModelState/GetModeState",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      data: {
        qssid: qssid,
        CourseId: CourseId,
        time: time,
        mode: "blockly",
        code: code,
      },
      success: function (data) {
        console.log(data);
      },
    });

    Toast.fire({
      icon: "success",
      title: "積木模式",
    });
  });

  $("#split").click(function () {
    editor.setMode("split");
    var qssid = $(".qssid").attr("name");
    var cqssid = $("#qssid").attr("name");
    var CourseId = $(".CourseId").attr("name");
    var code = editor.getCode();

    //紀錄目前時間
    var now = new Date();
    //將時間轉換成字串
    var time = now.toLocaleString();
    console.log(time);

    //ajax
    $.ajax({
      type: "Post",
      sync: true,
      url: "/ModelState/GetModeState",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      data: {
        qssid: qssid,
        CourseId: CourseId,
        time: time,
        mode: "dual",
        code: code,
      },
      success: function (data) {
        console.log(data);
      },
    });

    Toast.fire({
      icon: "success",
      title: "雙重模式",
    });
  });

  $("#text").click(function () {
    editor.setMode("text");
    var qssid = $(".qssid").attr("name");
    var cqssid = $("#qssid").attr("name");
    var CourseId = $(".CourseId").attr("name");
    var code = editor.getCode();

    //紀錄目前時間
    var now = new Date();
    //將時間轉換成字串
    var time = now.toLocaleString();
    console.log(time);

    //ajax
    $.ajax({
      type: "Post",
      sync: true,
      url: "/ModelState/GetModeState",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json", // 類型
      data: {
        qssid: qssid,
        CourseId: CourseId,
        time: time,
        mode: "text",
        code: code,
      },
      success: function (data) {
        console.log(data);
      },
    });

    Toast.fire({
      icon: "success",
      title: "文字模式",
    });
  });

  /* https://groups.google.com/g/blockly/c/IeSzg4DQ1TM
  
  techplex...@gmail.com
  匯出、匯入xml檔案 
   */

  $("#output-xml").click(function () {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    console.log(xml_text);
    $("#Outcmd").val(xml_text).focus();
  });

  $("#input-xml").click(function () {
    editor.blockEditor.setCode("");
    var xml_text = $("#Outcmd").val();
    var xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
  });

  $("#debug").click(function () {
    $("#input-xml").toggle(1500);
    $("#output-xml").toggle(1500);
    $("#change-tool").toggle(1500);
    $("#change-bar").toggle(1500);
    $("#debugconsole").toggle(1500);
  });

  /* goexam */
  $("#goexam").click(function () {
    /* 取得value值 */
  });




connection.on("Send", function (message) {
      console.log(message);
      //set 
      console.log("set");
      editor.setCode(message);
});



  //被控操模式


  connection.on("CheckControl", function (message,uid) {
    console.log(message);
    console.log(uid);
    if (message == 1) {
      console.log("被控操模式");
      
    // 偵測事件
      editor.addChangeListener(function () {
          var qssid = $(".qssid").attr("name");
          var cqssid = $("#qssid").attr("name");
          var CourseId = $(".CourseId").attr("name");

          var code = editor.getCode();
          console.log(code);
          
          connection.invoke('Send', code);


    
  });

    }
    else if (message == 0) {
      console.log("正常模式");

    }
  });











  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    icon: "success",
    timer: 1500,
  });


 



});







$(function () {
    /*显示时间*/
    let now = new Date();
    let myDate = document.getElementById("myDate")
    myDate.value = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();

    /*文件树开关*/
    $(".main div").click(
        function () {
            $(this).next().slideToggle("fast");
        }
    );

    /*图标变换*/
    $(".picture1").on("click", function () {
        if ($(this).hasClass('picture1')) {
            $(this).addClass('picture2').removeClass('picture1');
        } else {
            $(this).addClass('picture1').removeClass('picture2');
        }
    });


    /*上传图片*/
    let fileDom = document.getElementById("inputLogo");
    let previewDom = document.getElementById("preview");
    fileDom.addEventListener("change", e => {
        let file = fileDom.files[0];
        if (!file || file.type.indexOf("image/") < 0) {
            fileDom.value = "";
            previewDom.src = "";
            return;
        }

        let fileReader = new FileReader();
        fileReader.onload = e => {
            previewDom.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
    });

    /*清除图片*/
    $(".clearLogo").on("click", function () {
        let blank_preview = document.getElementById("preview");
        blank_preview.src = ""
    });

    /*缩放按钮*/
    /*let count = 5;
     $(".change_up").on("click", function () {
         if (count < 10) {
             $(".right div").removeClass("change" + count).addClass("change" + ++count);
         }
     });

     $(".change_down").on("click", function () {
         if (count > 0 && count <= 10) {
             $(".right div").removeClass("change" + count).addClass("change" + --count);
         }
     });*/

    /*缩放滚轮*/
    let count = 5;
    let MouseWheelHandler = function (e) {
        var e = e || event;
        if (event.altKey) {
            if (e.wheelDelta > 0) {
                if (count < 10) {
                    $(".right div").removeClass("change" + count).addClass("change" + ++count);
                }
            } else if (e.wheelDelta < 0) {
                if (count > 0 && count <= 10) {
                    $(".right div").removeClass("change" + count).addClass("change" + --count);
                }
            }

        }
    };

    document.addEventListener("wheel", MouseWheelHandler)

});




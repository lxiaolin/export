$(function () {
    // 显示时间
    function updateData() {
        let now = new Date();
        let myDate = document.getElementById("myDate")
        myDate.value = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
    }

    // 文件树开关
    $(".main").on("click", "div", function () {

        $(this).next().slideToggle("fast");

        // 图标变换
        if ($(this).hasClass('expand')) {
            $(this).addClass('collapse').removeClass('expand');
        } else {
            $(this).addClass('expand').removeClass('collapse');
        }
    });


    // 上传图片
    /*let fileDom = document.getElementById("inputLogo");
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
        updateData();
    });

    // 清除图片
    $(".clearLogo").on("click", function () {
        let blank_preview = document.getElementById("preview");
        blank_preview.src = ""
        updateData();
    });*/

    // 按钮缩放
    let count = 5;
    $(".change_up").on("click", function () {
        if (count < 10) {
            $(".right").children("div").removeClass().addClass("change" + (++count));
        }
    });

    $(".change_down").on("click", function () {
        if (count > 0 && count <= 10) {
            $(".right").children("div").removeClass().addClass("change" + (--count));
        }
    });

    // 滚轮缩放
    let keyCtrlDowning = false;
    $(".right").on("mousewheel DOMMouseScroll", function (e, delta) {
        delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1))
        if (keyCtrlDowning) {
            e.preventDefault();
            if (delta > 0) {
                if (count < 10) {
                    $(this).children("div").removeClass().addClass("change" + (++count));
                }
            } else if (delta < 0) {
                if (count > 0 && count <= 10) {
                    $(this).children("div").removeClass().addClass("change" + (--count));
                }
            }
        }
    });
    document.addEventListener("keydown", e => (e.key === "Control") && (keyCtrlDowning = true));
    document.addEventListener("keyup", () => keyCtrlDowning = false);



});




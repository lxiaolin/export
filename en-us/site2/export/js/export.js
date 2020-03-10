$(function () {
    /*显示时间*/
    var now = new Date();
    var myDate = document.getElementById("myDate")
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
    var fileDom = document.getElementById("inputLogo");
    var previewDom = document.getElementById("preview");
    fileDom.addEventListener("change", e => {
        var file = fileDom.files[0];
        if (!file || file.type.indexOf("image/") < 0) {
            fileDom.value = "";
            previewDom.src = "";
            return;
        }

        var fileReader = new FileReader();
        fileReader.onload = e => {
            previewDom.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
    });

    /*清除图片*/
    $(".clearLogo").on("click", function () {
        var blank_preview = document.getElementById("preview");
        blank_preview.src = ""
    })
});

/*缩放*/
window.onload = function () {
    var myScale = document.getElementById('scale');
    myScale.onmousewheel = mouseScale;  //给div添加鼠标滚轮事件
    function mouseScale(e) {
        var flag = true;  //设置鼠标向上还是向下滚动的变量
        // flag = e.wheelDelta > 0 ? true : false;
        flag = e.wheelDelta > 0;
        if (flag) { //如果滚轮向上
            this.style.height = this.offsetHeight + 28 + 'px';
            this.style.width = this.offsetWidth + 20 + 'px';
        } else {
            this.style.height = this.offsetHeight - 28+ 'px';
            this.style.width = this.offsetWidth - 20 + 'px';
        }
        return false;
    }
}


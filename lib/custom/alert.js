+function ($) {
    "use strict";
    $(document.body).append("<aside id='alert' class='myAlert'><div style='height: 80px;'><p></p><img class='imgClose' alt='' onclick='$(this).parent().parent().fadeOut(\"fast\")' src='data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA0LTE3VDExOjE1OjUyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA0LTE3VDExOjE1OjUyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0xN1QxMToxNTo1MiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkOTI0OTQ4Ny1jN2E3LWQxNDUtOTJjNi05M2I1ZGYzMmQ2ZDYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozMDNjMmY5Yy0yMDljLWUyNDItYjViZC0xM2ExZWM5MmY4ZGUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1MGJlOTQxMC1kYjc5LTMyNDYtYTc5YS05NzlkOTU5MWE0MjAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MGJlOTQxMC1kYjc5LTMyNDYtYTc5YS05NzlkOTU5MWE0MjAiIHN0RXZ0OndoZW49IjIwMTktMDQtMTdUMTE6MTU6NTIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDkyNDk0ODctYzdhNy1kMTQ1LTkyYzYtOTNiNWRmMzJkNmQ2IiBzdEV2dDp3aGVuPSIyMDE5LTA0LTE3VDExOjE1OjUyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R5GWZwAAAL9JREFUKJHFk8ENwjAMRV9RpU4QZkDqhRU6Q1FYgUPHQaIrEMEMXYELEjOQCSohlYsjBcenXvApjv2+k6+kWpaFtbFZTQJ1WnjvAU7AHYhGrwN6YAwhFJMH4AJM0qjBSeqDdewAPIFWCSSwlfrVgt9ApwR2CuzyK9X8RpSGBDyAxgL15FzgAMwCzpIXJlqwA24Z2EiuTSxgbc4e28QC3lKa86I00Vmwx3Y1KoFjAnK3z8AH+4UlgR4Y02b1t4/xBZ70OdD3VC9PAAAAAElFTkSuQmCC'></div></aside>")
}(jQuery);

/**
 * custom alert
 * @param msg {string} 输出内容
 * @param timeout {number} 指定时间后关闭
 */
function alert(msg, timeout = 0) {
    let $alert = $("#alert"),
        $pAlert = $alert.find("p").eq(0),
        pAlert = $pAlert[0];
    pAlert.innerText = msg;
    $alert.fadeIn("fast");
    $pAlert.parent()[0].style.height = `${$pAlert.height() + 54}px`;
    if (timeout !== 0) {
        setTimeout(() => $alert.fadeOut("fast"), timeout);
    }
}

/**
 * 自定义 alert 消失
 * @param time {string|number}
 */
function alertFadeOut(time = "fast") {
    $("#alert").fadeOut(time);
}
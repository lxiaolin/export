/**
 * @Author ssc
 */
class Canvas {
    constructor(id, obj = {}) {
        if (id !== undefined && typeof (id) === "string") {
            this.canvas = document.getElementById(id);
            this.context = this.canvas.getContext("2d");
            this.widthPercent = 1;
            this.heightPercent = 1;
            this.widthOffset = 0;
            this.heightOffset = 0;
            this.autoSizeResult = {};
            this.eventListener = {};
            this.titleTop = "";     // 上 标题
            this.titleRight = "";   // 右 标题
            this.titleBottom = "";  // 下 标题
            this.titleLeft = "";    // 左 标题
            this.titleTopColor = "#000";     // 上 标题颜色
            this.titleRightColor = "#000";   // 右 标题颜色
            this.titleBottomColor = "#000";  // 下 标题颜色
            this.titleLeftColor = "#000";    // 左 标题颜色
            this.titleTopFont = "normal 1.2em Arial";     // 上 标题颜色
            this.titleRightFont = "normal 1.2em Arial";   // 右 标题颜色
            this.titleBottomFont = "normal 1.2em Arial";  // 下 标题颜色
            this.titleLeftFont = "normal 1.2em Arial";    // 左 标题颜色
            this.titleTopPadding = 0;   // 上 距内
            this.titleRightPadding = 0; // 右 距内
            this.titleBottomPadding = 0;    // 下 距内
            this.titleLeftPadding = 0;  // 左 距内
            this.legandFont = "normal 12px Arial";
            this.infoFont = "normal 12px Arial";
            this.paddingTop = "";       // 坐标轴距 上 边距
            this.paddingRight = "";     // 坐标轴距 右 边距
            this.paddingBottom = "";    // 坐标轴距 下 边距
            this.paddingLeft = "";      // 坐标轴距 左 边距
            this.dataPaddingTop = 20;       // 绘图距 坐标轴 的 上 边距
            this.dataPaddingRight = 20;     // 绘图距 坐标轴 的 右 边距
            this.dataPaddingBottom = 20;    // 绘图距 坐标轴 的 下 边距
            this.dataPaddingLeft = 20;      // 绘图距 坐标轴 的 左 边距
            this.contentWidth = 0;  // 坐标轴宽度
            this.contentHeight = 0; // 坐标轴高度
            this.axesStyle = "solid";   // 坐标轴线型
            this.axesLineWidth = "2";  // 坐标轴线宽
            this.axesColor = "#000";    // 坐标轴颜色
            this.axesType = "square";   // 坐标轴类型
            this.boundaryLineWidth = 1;  // 分割线线宽
            this.boundaryLineStyle = "dashed";  // 分割线线型
            this.boundaryColor = "#999";        // 分割线颜色
            this.boundaryLengthX = 10;           // 分割线 - 竖线个数
            this.boundaryLengthY = 5;           // 分割线 - 横线个数
            this.indexFont = "normal 12px Arial";   // 坐标颜色
            this.indexColor = "#000";   // 坐标颜色
            this.fillColor = "#000";    // 绘图线颜色
            this.lineColor = "#000";    // 绘图线颜色
            this.lineWidth = 1;         // 绘图线线宽
            this.lineColorAction = "#f00";  // 高亮线颜色
            this.lineWidthAction = 5;       // 高亮线线宽
            this.distanceOfCatchLine = 5;   // 捕捉线距离
            this.textColor = "#000";    // 文本颜色
            this.fullScreen = false;
            this.fillBackground = false;
            this.m = {xMin: -Infinity, xMax: Infinity, yMin: -Infinity, yMax: Infinity};
            this.autoSizeStyle = "window";
            this.scale = 1;

            for (let item in obj)
                if (obj.hasOwnProperty(item) && this.hasOwnProperty(item))
                    this[item] = obj[item];

            if (this.paddingTop === "")
                this.paddingTop = this.titleTop === "" ? 5 : 25;
            if (this.paddingRight === "")
                this.paddingRight = this.titleRight === "" ? 5 : 25;
            if (this.paddingBottom === "")
                this.paddingBottom = this.titleBottom === "" ? 35 : 45;
            if (this.paddingLeft === "")
                this.paddingLeft = this.titleLeft === "" ? 55 : 70;

            this.contentWidth = this.canvas.width - this.paddingLeft - this.paddingRight;
            this.contentHeight = this.canvas.height - this.paddingTop - this.paddingBottom;
        } else {
            console.warn("id is not defined or is not a string type.");
        }
    }

    /**
     * 更新宽高属性
     */
    updateWH() {
        this.contentWidth = this.canvas.width - this.paddingLeft - this.paddingRight;
        this.contentHeight = this.canvas.height - this.paddingTop - this.paddingBottom;

        return this;
    }

    /**
     * 修改 Title 属性
     * @param obj
     */
    changeTitle(obj) {
        this.changeProperty(obj);

        this.paddingTop = this.titleTop === "" ? 5 : 25;
        this.paddingRight = this.titleRight === "" ? 5 : 25;
        this.paddingBottom = this.titleBottom === "" ? 35 : 45;
        this.paddingLeft = this.titleLeft === "" ? 55 : 75;

        this.updateWH();
    }

    /**
     * 修改属性
     * @param obj
     */
    changeProperty(obj) {
        for (let item in obj)
            if (obj.hasOwnProperty(item) && this.hasOwnProperty(item))
                this[item] = obj[item];
        return this;
    }

    /**
     *  修改宽高百分比
     * @param wh    {{}}  必需
     * @param callback  {...Function}   在 change 大小之后的 callback
     * @param flagExecute   {...Boolean}    修改 callback 是否立即执行，默认执行
     */
    changeWHPercent(wh = {}, callback = this.autoSizeResult.callback, flagExecute) {
        this.widthPercent = wh.widthPercent || this.widthPercent;
        this.heightPercent = wh.heightPercent || this.heightPercent;
        this.widthOffset = wh.widthOffset || this.widthOffset;
        this.heightOffset = wh.heightOffset || this.heightOffset;
        Canvas.autoSizeRemoveEventListener(this.autoSizeResult.eventListener);
        this.autoSizeResult = this.autoSize({
            widthPercent: this.widthPercent,
            heightPercent: this.heightPercent,
            widthOffset: this.widthOffset,
            heightOffset: this.heightOffset,
            width: wh.width,
            height: wh.height
        }, callback, flagExecute);
        this.updateWH();

        return this;
    }

    /**
     *  更新最值
     * @param xMax  {Number}
     * @param xMin  {Number}
     * @param yMax  {Number}
     * @param yMin  {Number}
     * @param flag  {...Boolean | undefined}
     */
    changeM(xMax = this.m.xMax, xMin = this.m.xMin, yMax = this.m.yMax, yMin = this.m.yMin, flag) {
        [xMax, xMin] = Canvas.getAxesM_X(xMax, xMin);
        if (!flag)
            [yMax, yMin] = Canvas.getAxesM_Y(yMax, yMin);
        this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};

        return this;
    }

    /**
     *  更新最值
     * @param xMax  {Number}
     * @param xMin  {Number}
     * @param yMax  {Number}
     * @param yMin  {Number}
     */
    changeM_normal(xMax = this.m.xMax, xMin = this.m.xMin, yMax = this.m.yMax, yMin = this.m.yMin) {
        this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
        return this;
    }

    /**
     * 返回最值对象
     * @return {{xMax:Number, xMin:Number, yMax:Number, yMin:Number}}
     */
    getM() {
        return this.m;
    }

    /**
     * 清空画布
     * @param x 左上角点x
     * @param y 左上角点y
     * @param w 宽
     * @param h 高
     */
    clear(x = 0, y = 0, w = this.canvas.width, h = this.canvas.height) {
        this.context.clearRect(x, y, w, h);

        return this;
    }

    /**
     * 填充
     * @param color
     * @param x
     * @param y
     * @param w
     * @param h
     */
    fill(color = "#fff", x = 0, y = 0, w = this.canvas.width, h = this.canvas.height) {
        let context = this.context;
        context.fillStyle = color;
        context.fillRect(x, y, w, h);

        return this;
    }

    /**
     * 写 title
     */
    drawTitle() {
        let context = this.context, width = this.canvas.width, height = this.canvas.height,
            paddingLeft = this.paddingLeft, paddingRight = this.paddingRight,
            titleTop = this.titleTop, titleRight = this.titleRight, titleBottom = this.titleBottom,
            titleLeft = this.titleLeft;
        if (titleTop !== "") {
            context.font = this.titleTopFont;
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillStyle = this.titleTopColor;
            this.titleTopTextMetrics = context.measureText(titleTop);
            context.fillText(titleTop, (width + (paddingLeft - paddingRight)) / 2, 5 + this.titleTopPadding);
        }
        if (titleRight !== "") {
            context.font = this.titleRightFont;
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillStyle = this.titleRightColor;
            this.titleRightTextMetrics = context.measureText(titleRight);
            context.translate(width, height / 2);
            context.rotate(Math.PI / 2);
            context.fillText(titleRight, 0, 5 + this.titleRightPadding);
            context.rotate(-Math.PI / 2);
            context.translate(-width, -height / 2);
        }
        if (titleBottom !== "") {
            context.font = this.titleBottomFont;
            context.textBaseline = "bottom";
            context.textAlign = "center";
            context.fillStyle = this.titleBottomColor;
            this.titleBottomTextMetrics = context.measureText(titleBottom);
            context.fillText(titleBottom, (width + (paddingLeft - paddingRight)) / 2, height - 2 - this.titleBottomPadding);
        }
        if (titleLeft !== "") {
            context.font = this.titleLeftFont;
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillStyle = this.titleLeftColor;
            this.titleLeftTextMetrics = context.measureText(titleLeft);
            context.translate(0, height / 2);
            context.rotate(-Math.PI / 2);
            context.fillText(titleLeft, 0, 5 + this.titleLeftPadding);
            context.rotate(Math.PI / 2);
            context.translate(0, -height / 2);
        }

        return this;
    }

    /**
     * 画图 - 坐标轴
     */
    drawAxes() {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            paddingLeft = this.paddingLeft, paddingTop = this.paddingTop, axesLineWidth = this.axesLineWidth;
        context.strokeStyle = this.axesColor;
        context.lineWidth = axesLineWidth;
        let halfAxesLineWidth = axesLineWidth / 2;
        switch (this.axesType) {
            case "square":
                switch (this.axesStyle) {
                    case "solid":
                        context.beginPath();
                        context.moveTo(paddingLeft, paddingTop);
                        context.lineTo(paddingLeft + contentWidth, paddingTop);
                        context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight);
                        context.lineTo(paddingLeft, paddingTop + contentHeight);
                        context.closePath();
                        context.stroke();
                        break;
                    case "dotted":
                        context.beginPath();
                        // 左
                        for (let i = 0; i < contentHeight; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft, paddingTop + contentHeight - i, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        // 下
                        for (let i = 0; i < contentWidth; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft + i, paddingTop + contentHeight, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        // 右
                        for (let i = 0; i < contentHeight; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft + contentWidth, paddingTop + contentHeight - i, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        // 上
                        for (let i = 0; i < contentWidth; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft + i, paddingTop, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        break;
                    case "dashed":
                        context.beginPath();
                        // 左
                        for (let i = 0; i < contentHeight - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft, paddingTop + contentHeight - i + halfAxesLineWidth);
                            context.lineTo(paddingLeft, paddingTop + contentHeight - (i + 3 * axesLineWidth) + halfAxesLineWidth);
                        }
                        // 下
                        for (let i = 0; i < contentWidth - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft + i - halfAxesLineWidth, paddingTop + contentHeight);
                            context.lineTo(paddingLeft + i - halfAxesLineWidth + 3 * axesLineWidth, paddingTop + contentHeight);
                        }
                        // 右
                        for (let i = 0; i < contentHeight - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft + contentWidth, paddingTop + contentHeight - i + halfAxesLineWidth);
                            context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight - (i + 3 * axesLineWidth) + halfAxesLineWidth);
                        }
                        // 上
                        for (let i = 0; i < contentWidth - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft + i - halfAxesLineWidth, paddingTop);
                            context.lineTo(paddingLeft + i - halfAxesLineWidth + 3 * axesLineWidth, paddingTop);
                        }
                        context.stroke();
                        break;
                }
                break;
            case "normal":
                switch (this.axesStyle) {
                    case "solid":
                        context.beginPath();
                        context.moveTo(paddingLeft - 5, paddingTop + 5);
                        context.lineTo(paddingLeft, paddingTop);
                        context.lineTo(paddingLeft + 5, paddingTop + 5);
                        context.stroke();
                        context.beginPath();
                        context.moveTo(paddingLeft, paddingTop);
                        context.lineTo(paddingLeft, paddingTop + contentHeight);
                        context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight);
                        context.stroke();
                        context.beginPath();
                        context.moveTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight - 5);
                        context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight);
                        context.lineTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight + 5);
                        context.stroke();
                        break;
                    case "dotted":
                        context.beginPath();
                        context.moveTo(paddingLeft - 5, paddingTop + 5);
                        context.lineTo(paddingLeft, paddingTop);
                        context.lineTo(paddingLeft + 5, paddingTop + 5);
                        context.stroke();
                        context.beginPath();
                        for (let i = 0; i < contentWidth; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft + i, paddingTop + contentHeight, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        for (let i = 0; i < contentHeight; i += 5 * axesLineWidth) {
                            context.arc(paddingLeft, paddingTop + contentHeight - i, halfAxesLineWidth, 0, 2 * Math.PI);
                            context.stroke();
                            context.beginPath();
                        }
                        context.beginPath();
                        context.moveTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight - 5);
                        context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight);
                        context.lineTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight + 5);
                        context.stroke();
                        break;
                    case "dashed":
                        context.beginPath();
                        context.moveTo(paddingLeft - 5, paddingTop + 5);
                        context.lineTo(paddingLeft, paddingTop);
                        context.lineTo(paddingLeft + 5, paddingTop + 5);
                        context.stroke();
                        context.beginPath();
                        for (let i = 0; i < contentWidth - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft + i - halfAxesLineWidth, paddingTop + contentHeight);
                            context.lineTo(paddingLeft + i - halfAxesLineWidth + 3 * axesLineWidth, paddingTop + contentHeight);
                        }
                        for (let i = 0; i < contentHeight - 2 * axesLineWidth; i += 5 * axesLineWidth) {
                            context.moveTo(paddingLeft, paddingTop + contentHeight - i + halfAxesLineWidth);
                            context.lineTo(paddingLeft, paddingTop + contentHeight - (i + 3 * axesLineWidth) + halfAxesLineWidth);
                        }
                        context.stroke();
                        context.beginPath();
                        context.moveTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight - 5);
                        context.lineTo(paddingLeft + contentWidth, paddingTop + contentHeight);
                        context.lineTo(paddingLeft + contentWidth - 5, paddingTop + contentHeight + 5);
                        context.stroke();
                        break;
                }
                break;
        }

        return this;
    }

    /**
     * 画分割线，入参可空，但必须先调用 drawLine 方法，或 changeM 方法
     * @param data {...Array | undefined}
     */
    drawBoundary(data) {
        let xMin, xMax, yMin, yMax;
        if (data === undefined) {
            [xMin, xMax, yMin, yMax] = [this.m.xMin, this.m.xMax, this.m.yMin, this.m.yMax];
        } else {
            xMin = xMax = data[0].x;
            yMin = yMax = data[0].y;
            for (let i in data) {
                if (xMin > data[i].x) xMin = data[i].x;
                if (xMax < data[i].x) xMax = data[i].x;
                if (yMin > data[i].y) yMin = data[i].y;
                if (yMax < data[i].y) yMax = data[i].y;
            }
            [xMax, xMin] = Canvas.getAxesM_X(xMax, xMin);
            [yMax, yMin] = Canvas.getAxesM_Y(yMax, yMin);
            this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
        }
        if (xMin === -Infinity || xMin === Infinity || xMax === Infinity || xMax === -Infinity || yMin === -Infinity || yMin === Infinity || yMax === Infinity || yMax === -Infinity) return this;
        let context = this.context, lineWidth = this.boundaryLineWidth,
            paddingTop = this.paddingTop, dataPaddingTop = this.dataPaddingTop,
            dataPaddingRight = this.dataPaddingRight, dataPaddingBottom = this.dataPaddingBottom,
            paddingLeft = this.paddingLeft, dataPaddingLeft = this.dataPaddingLeft,
            contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            coeX = (contentWidth - dataPaddingRight - dataPaddingLeft) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingTop - dataPaddingBottom) / (yMax - yMin);
        for (let i = 10; i > 2; i--)
            if ((xMax - xMin) % i === 0) {
                this.boundaryLengthX = i;
                break;
            }
        let boundaryLengthX = this.boundaryLengthX, boundaryLengthY = this.boundaryLengthY;
        context.strokeStyle = this.boundaryColor;
        context.lineWidth = lineWidth;
        switch (this.boundaryLineStyle) {
            default:
            case "dashed": {
                let yTemp = (yMax - yMin) / boundaryLengthY, xTemp = (xMax - xMin) / boundaryLengthX, to;
                for (let i = 0; i <= boundaryLengthY; i++) {
                    let y = paddingTop + contentHeight - dataPaddingBottom - (yMax - yMin - yTemp * i) * coeY;
                    for (let j = 0; j < contentWidth; j += 8 * lineWidth) {
                        to = paddingLeft + j + 5 * lineWidth;
                        if (to > paddingLeft + contentWidth) to = paddingLeft + contentWidth;
                        context.moveTo(paddingLeft + j, y);
                        context.lineTo(to, y);
                    }
                }
                for (let i = 0; i <= boundaryLengthX; i++) {
                    let x = paddingLeft + dataPaddingLeft + (xMax - xMin - xTemp * i) * coeX;
                    for (let j = 0; j < contentHeight; j += 8 * lineWidth) {
                        to = paddingTop + contentHeight - (j + 5 * lineWidth);
                        if (to < paddingTop) to = paddingTop;
                        context.moveTo(x, paddingTop + contentHeight - j);
                        context.lineTo(x, to);
                    }
                }
                context.stroke();
            }
                break;
            case "solid": {
                let yTemp = (yMax - yMin) / boundaryLengthY, xTemp = (xMax - xMin) / boundaryLengthX;
                for (let i = 0; i <= boundaryLengthY; i++) {
                    let y = paddingTop + contentHeight - dataPaddingBottom - (yMax - yMin - yTemp * i) * coeY;
                    context.moveTo(paddingLeft, y);
                    context.lineTo(paddingLeft + contentWidth, y);
                }
                for (let i = 0; i <= boundaryLengthX; i++) {
                    let x = paddingLeft + dataPaddingLeft + (xMax - xMin - xTemp * i) * coeX;
                    context.moveTo(x, paddingTop + contentHeight);
                    context.lineTo(x, paddingTop);
                }
                context.stroke();
            }
                break;
            case "dotted": {
                let yTemp = (yMax - yMin) / boundaryLengthY, xTemp = (xMax - xMin) / boundaryLengthX, to;
                for (let i = 0; i <= boundaryLengthY; i++) {
                    let y = paddingTop + contentHeight - dataPaddingBottom - (yMax - yMin - yTemp * i) * coeY;
                    for (let j = 0; j < contentWidth; j += 8 * lineWidth) {
                        to = paddingLeft + j + 5 * lineWidth;
                        if (to > paddingLeft + contentWidth) to = paddingLeft + contentWidth;
                        context.beginPath();
                        context.arc(paddingLeft + j, y, lineWidth, 0, 2 * Math.PI);
                        context.fill();
                    }
                }
                for (let i = 0; i <= boundaryLengthX; i++) {
                    let x = paddingLeft + dataPaddingLeft + (xMax - xMin - xTemp * i) * coeX;
                    for (let j = 0; j < contentHeight; j += 8 * lineWidth) {
                        to = paddingTop + contentHeight - (j + 5 * lineWidth);
                        if (to < paddingTop) to = paddingTop;
                        context.beginPath();
                        context.arc(x, paddingTop + contentHeight - j, lineWidth, 0, 2 * Math.PI);
                        context.fill();
                    }
                }
            }
                break;
        }

        return this;
    }

    /**
     * 画坐标
     * @param toFixed   {{x:Number,y:Number}}
     * @param data  {...Array | undefined}
     */
    drawIndex(toFixed = {x: 0, y: 0}, data) {
        let xMin, xMax, yMin, yMax;
        if (data === undefined) {
            [xMin, xMax, yMin, yMax] = [this.m.xMin, this.m.xMax, this.m.yMin, this.m.yMax];
        } else {
            xMin = xMax = data[0].x;
            yMin = yMax = data[0].y;
            for (let i in data) {
                if (xMin > data[i].x) xMin = data[i].x;
                if (xMax < data[i].x) xMax = data[i].x;
                if (yMin > data[i].y) yMin = data[i].y;
                if (yMax < data[i].y) yMax = data[i].y;
            }
            [xMax, xMin] = Canvas.getAxesM_X(xMax, xMin);
            [yMax, yMin] = Canvas.getAxesM_Y(yMax, yMin);
            this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
        }
        if (xMin === -Infinity || xMin === Infinity || xMax === Infinity || xMax === -Infinity || yMin === -Infinity || yMin === Infinity || yMax === Infinity || yMax === -Infinity) return this;
        let context = this.context,
            paddingTop = this.paddingTop, dataPaddingTop = this.dataPaddingTop,
            dataPaddingRight = this.dataPaddingRight, dataPaddingBottom = this.dataPaddingBottom,
            paddingLeft = this.paddingLeft, dataPaddingLeft = this.dataPaddingLeft,
            contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            coeX = (contentWidth - dataPaddingRight - dataPaddingLeft) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingTop - dataPaddingBottom) / (yMax - yMin);
        for (let i = 10; i > 2; i--)
            if (xMax - xMin % i === 0) {
                this.boundaryLengthX = i;
                break;
            }
        let boundaryLengthX = this.boundaryLengthX, boundaryLengthY = this.boundaryLengthY;
        context.fillStyle = this.indexColor;
        context.textBaseline = "middle";
        context.font = this.indexFont;
        let yTemp = (yMax - yMin) / boundaryLengthY, xTemp = (xMax - xMin) / boundaryLengthX;

        context.textAlign = "end";
        for (let i = 0; i <= boundaryLengthY; i++) {
            let y = paddingTop + contentHeight - dataPaddingBottom - (yMax - yMin - yTemp * i) * coeY;
            context.fillText((yMax - yTemp * i).toFixed(toFixed.y || 0), paddingLeft - 5, y);
        }

        context.textAlign = "center";
        for (let i = 0; i <= boundaryLengthX; i++) {
            let x = paddingLeft + dataPaddingLeft + (xMax - xMin - xTemp * i) * coeX;
            context.fillText((xMax - xTemp * i).toFixed(toFixed.x || 0), x, paddingTop + contentHeight + 10);
        }

        return this;
    }

    /**
     * 通过 数据 画图 - 画一条线
     * @param data {Array | ArrayLike} 数组
     * @param lineColor {String} 线的颜色
     * @param lineWidth {Number} 线宽
     * @return Array 图上坐标
     */
    drawLine(data, lineColor = this.lineColor, lineWidth = this.lineWidth) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            paddingLeft = this.paddingLeft, paddingTop = this.paddingTop,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax;
        if (xMin === -Infinity || xMax === Infinity || yMin === -Infinity || yMax === Infinity) {
            xMin = xMax = data[0].x;
            yMin = yMax = data[0].y;
            for (let i = 0; i < data.length; i++) {
                if (xMin > data[i].x) xMin = data[i].x;
                if (xMax < data[i].x) xMax = data[i].x;
                if (yMin > data[i].y) yMin = data[i].y;
                if (yMax < data[i].y) yMax = data[i].y;
            }
            [xMax, xMin] = Canvas.getAxesM_X(xMax, xMin);
            [yMax, yMin] = Canvas.getAxesM_Y(yMax, yMin);
            this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
        }
        let coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = [];
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        xy[xy.length] = {
            x: paddingLeft + dataPaddingLeft + (data[0].x - xMin) * coeX,
            y: contentHeight + paddingTop - dataPaddingBottom - (data[0].y - yMin < 0 ? 0 : (data[0].y - yMax > 0 ? yMax - yMin : data[0].y - yMin)) * coeY
        };
        context.moveTo(xy[0].x, xy[0].y);
        for (let i = 0; i < data.length; i++) {
            if (i === 0) continue;
            xy[xy.length] = {
                x: paddingLeft + dataPaddingLeft + (data[i].x - xMin) * coeX,
                y: contentHeight + paddingTop - dataPaddingBottom - (data[i].y - yMin < 0 ? 0 : (data[i].y - yMax > 0 ? yMax - yMin : data[i].y - yMin)) * coeY
            };
            context.lineTo(xy[i].x, xy[i].y);
        }
        context.stroke();
        return xy;
    }

    /**
     * 画照相机图标
     * @param x 中心点 x 值
     * @param y 中心点 y 值
     * @param size 大小，倍数
     * @param color 颜色
     */
    drawCamera(x, y, size = 1, color = "#0f0") {
        let context = this.context, halfWidth = 8 * size, halfHeight = 8 * size;
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = 1;
        // 画边框
        context.beginPath();
        context.moveTo(x - halfWidth, y - halfHeight);
        context.lineTo(x + halfWidth, y - halfHeight);
        context.arc(x + halfWidth, y, halfHeight, -0.5 * Math.PI, 0.5 * Math.PI);
        context.lineTo(x - halfWidth, y + halfHeight);
        context.arc(x - halfWidth, y, halfHeight, 0.5 * Math.PI, -0.5 * Math.PI);
        context.stroke();
        // 画主体
        context.beginPath();
        context.moveTo(x - halfWidth * 1.2, y - halfHeight * 0.5);
        context.lineTo(x - halfWidth * 0.75, y - halfHeight * 0.5);
        context.lineTo(x - halfWidth * 0.75, y - halfHeight * 0.75);
        context.lineTo(x + halfWidth * 0.75, y - halfHeight * 0.75);
        context.lineTo(x + halfWidth * 0.75, y - halfHeight * 0.5);
        context.lineTo(x + halfWidth * 1.2, y - halfHeight * 0.5);
        context.lineTo(x + halfWidth * 1.2, y + halfHeight * 0.75);
        context.lineTo(x - halfWidth * 1.2, y + halfHeight * 0.75);
        context.closePath();
        context.fill();
        // 画中心圆 - 底
        context.beginPath();
        context.arc(x, y, halfHeight * 0.5, 0, 2 * Math.PI);
        context.fillStyle = "#fff";
        context.fill();
        // 画中心圆 - 顶
        context.beginPath();
        context.arc(x, y, halfHeight * 0.3, 0, 2 * Math.PI);
        context.fillStyle = "#0f0";
        context.fill();
    }

    /**
     * 画圆角方框
     * @param x 中心点 x 值
     * @param y 中心点 y 值
     * @param width 方框宽度
     * @param height 方框高度
     * @param radius 圆角方框的圆角半径
     * @param lineColor 方框线色
     * @param lineWidth 方框宽度
     */
    drawSquare(x, y, width, height, radius = 0, lineColor = this.lineColor, lineWidth = this.lineWidth) {
        let context = this.context;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        context.moveTo(x - width * 0.5 + radius, y - height * 0.5);
        context.lineTo(x + width * 0.5 - radius, y - height * 0.5); // 上线
        context.arc(x + width * 0.5 - radius, y - height * 0.5 + radius, radius, -0.5 * Math.PI, 0);    // 右上角
        context.lineTo(x + width * 0.5, y + height * 0.5 - radius); // 右线
        context.arc(x + width * 0.5 - radius, y + height * 0.5 - radius, radius, 0, 0.5 * Math.PI);    // 右下角
        context.lineTo(x - width * 0.5 + radius, y + height * 0.5); // 下线
        context.arc(x - width * 0.5 + radius, y + height * 0.5 - radius, radius, 0.5 * Math.PI, Math.PI);    // 左下角
        context.lineTo(x - width * 0.5, y - height * 0.5 + radius); // 左线
        context.arc(x - width * 0.5 + radius, y - height * 0.5 + radius, radius, Math.PI, 1.5 * Math.PI);    // 左上角
        context.closePath();
        context.stroke();
    }

    fillSquare(x, y, width, height, radius = 0, fillColor = this.fillColor) {
        let context = this.context;
        context.beginPath();
        context.fillStyle = fillColor;
        context.moveTo(x - width * 0.5 + radius, y - height * 0.5);
        context.lineTo(x + width * 0.5 - radius, y - height * 0.5); // 上线
        context.arc(x + width * 0.5 - radius, y - height * 0.5 + radius, radius, -0.5 * Math.PI, 0);    // 右上角
        context.lineTo(x + width * 0.5, y + height * 0.5 - radius); // 右线
        context.arc(x + width * 0.5 - radius, y + height * 0.5 - radius, radius, 0, 0.5 * Math.PI);    // 右下角
        context.lineTo(x - width * 0.5 + radius, y + height * 0.5); // 下线
        context.arc(x - width * 0.5 + radius, y + height * 0.5 - radius, radius, 0.5 * Math.PI, Math.PI);    // 左下角
        context.lineTo(x - width * 0.5, y - height * 0.5 + radius); // 左线
        context.arc(x - width * 0.5 + radius, y - height * 0.5 + radius, radius, Math.PI, 1.5 * Math.PI);    // 左下角
        context.closePath();
        context.fill();
    }

    fillLinearGradient(x0, y0, x1, y1, colors, flagCustomPath, x, y, width, height, radius = 0, lineColor = this.lineColor, lineWidth = this.lineWidth) {
        let context = this.context;
        let linearGradient = context.createLinearGradient(x0, y0, x1, y1);
        colors.forEach((color, i) => linearGradient.addColorStop(i / (colors.length - 1), color));
        context.fillStyle = linearGradient;
        if (flagCustomPath) {
            context.beginPath();
            context.lineWidth = lineWidth;
            context.strokeStyle = lineColor;
            context.moveTo(x - width * 0.5 + radius, y - height * 0.5);
            context.lineTo(x + width * 0.5 - radius, y - height * 0.5); // 上线
            context.arc(x + width * 0.5 - radius, y - height * 0.5 + radius, radius, -0.5 * Math.PI, 0);    // 右上角
            context.lineTo(x + width * 0.5, y + height * 0.5 - radius); // 右线
            context.arc(x + width * 0.5 - radius, y + height * 0.5 - radius, radius, 0, 0.5 * Math.PI);    // 右下角
            context.lineTo(x - width * 0.5 + radius, y + height * 0.5); // 下线
            context.arc(x - width * 0.5 + radius, y + height * 0.5 - radius, radius, 0.5 * Math.PI, Math.PI);    // 左下角
            context.lineTo(x - width * 0.5, y - height * 0.5 + radius); // 左线
            context.arc(x - width * 0.5 + radius, y - height * 0.5 + radius, radius, Math.PI, 1.5 * Math.PI);    // 左上角
            context.closePath();
            context.fillRect(x, y, width, height);
        } else {
            context.fill();
        }
    }

    /**
     * 通过 数据 画图 - 画一条线
     * @param data {Number}
     * @param lineColor {String} 线的颜色
     * @param lineWidth {Number} 线宽
     * @return Number 图上坐标
     */
    drawCqLine(data, lineColor = this.lineColor, lineWidth = this.lineWidth) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            paddingLeft = this.paddingLeft, paddingTop = this.paddingTop, dataPaddingRight = this.dataPaddingRight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let yMin = this.m.yMin, yMax = this.m.yMax;
        let coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin);
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        let result = contentHeight + paddingTop - dataPaddingBottom - (data - yMin) * coeY;
        context.moveTo(paddingLeft + dataPaddingLeft, result);
        context.lineTo(paddingLeft + contentWidth - dataPaddingRight, result);
        context.stroke();
        return result;
    }

    /**
     * 通过 数据 画图 - 画一条线
     * @param data {Number}
     * @param lineColor {String} 线的颜色
     * @param lineWidth {Number} 线宽
     * @return Number 图上坐标
     */
    drawCqLineInCanvas(data, lineColor = this.lineColor, lineWidth = this.lineWidth) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            paddingLeft = this.paddingLeft, paddingTop = this.paddingTop, dataPaddingRight = this.dataPaddingRight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let yMin = this.m.yMin, yMax = this.m.yMax;
        let coeY_DaoShu = (yMax - yMin) / (contentHeight - dataPaddingBottom - this.dataPaddingTop);
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        // let result = contentHeight + paddingTop - dataPaddingBottom - (data - yMin) / coeY_DaoShu;
        let result = (contentHeight + paddingTop - dataPaddingBottom - data) * coeY_DaoShu + yMin;
        context.moveTo(paddingLeft + dataPaddingLeft, data);
        context.lineTo(paddingLeft + contentWidth - dataPaddingRight, data);
        context.stroke();
        return result;
    }

    /**
     * 通过像素值获取在 Canvas 上真实的值 - x
     * coeX_DaoShu coeX的倒数
     * @param data  {Number}
     * @return {Number}
     */
    getXFromCanvas(data) {
        let contentWidth = this.contentWidth, paddingLeft = this.paddingLeft, dataPaddingLeft = this.dataPaddingLeft,
            dataPaddingRight = this.dataPaddingRight,
            xMin = this.m.xMin, xMax = this.m.xMax,
            coeX_DaoShu = (xMax - xMin) / (contentWidth - dataPaddingLeft - dataPaddingRight);
        return (data - paddingLeft - dataPaddingLeft) * coeX_DaoShu + xMin;
    }

    /**
     * 通过像素值获取在 Canvas 上真实的值 - y
     * coeY_DaoShu coeY 的倒数
     * @param data  {Number}
     * @return {Number}
     */
    getYFromCanvas(data) {
        let contentHeight = this.contentHeight, paddingTop = this.paddingTop,
            dataPaddingBottom = this.dataPaddingBottom, dataPaddingTop = this.dataPaddingTop,
            yMin = this.m.yMin, yMax = this.m.yMax,
            coeY_DaoShu = (yMax - yMin) / (contentHeight - dataPaddingBottom - dataPaddingTop);
        return (contentHeight + paddingTop - dataPaddingBottom - data) * coeY_DaoShu + yMin;
    }

    /**
     * 通过 数据 画图 - 高亮 - 画一条线
     * @param data {Array}
     */
    drawActionLine(data) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            paddingLeft = this.paddingLeft, paddingTop = this.paddingTop,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax;
        if (xMin === -Infinity || xMax === Infinity || yMin === -Infinity || yMax === Infinity) {
            xMin = xMax = data[0].x;
            yMin = yMax = data[0].y;
            for (let i in data) {
                if (xMin > data[i].x) xMin = data[i].x;
                if (xMax < data[i].x) xMax = data[i].x;
                if (yMin > data[i].y) yMin = data[i].y;
                if (yMax < data[i].y) yMax = data[i].y;
            }
            [xMax, xMin] = Canvas.getAxesM_X(xMax, xMin);
            [yMax, yMin] = Canvas.getAxesM_Y(yMax, yMin);
            this.m = {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
        }
        let coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = [];
        context.beginPath();
        context.lineWidth = this.lineWidthAction;
        context.strokeStyle = this.lineColor;
        xy[xy.length] = {
            x: paddingLeft + dataPaddingLeft + (data[0].x - xMin) * coeX,
            y: contentHeight + paddingTop - dataPaddingBottom - (data[0].y - yMin < 0 ? 0 : (data[0].y - yMax > 0 ? yMax - yMin : data[0].y - yMin)) * coeY
        };
        context.moveTo(xy[0].x, xy[0].y);
        for (let i in data) {
            if (i === "0") continue;
            xy[xy.length] = {
                x: paddingLeft + dataPaddingLeft + (data[i].x - xMin) * coeX,
                y: contentHeight + paddingTop - dataPaddingBottom - (data[i].y - yMin < 0 ? 0 : (data[i].y - yMax > 0 ? yMax - yMin : data[i].y - yMin)) * coeY
            };
            context.lineTo(xy[i].x, xy[i].y);
        }
        context.stroke();
        return xy;
    }

    /**
     * 画圆圈
     * @param data {{x:Number,y:Number}}
     * @param radius {Number}
     */
    drawCircle(data, radius = 5) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax,
            coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = {
                x: this.paddingLeft + dataPaddingLeft + (data.x - xMin) * coeX,
                y: contentHeight + this.paddingTop - dataPaddingBottom - (data.y - yMin) * coeY
            };

        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.lineColor;
        context.arc(xy.x, xy.y, radius, 0, 2 * Math.PI);
        context.stroke();

        return xy;
    }

    /**
     * 画圆圈 - 高亮
     * @param data {{x:Number,y:Number}}
     * @param radius {Number}
     */
    drawActionCircle(data, radius = 10) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax,
            coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = {
                x: this.paddingLeft + dataPaddingLeft + (data.x - xMin) * coeX,
                y: contentHeight + this.paddingTop - dataPaddingBottom - (data.y - yMin) * coeY
            };

        context.beginPath();
        context.lineWidth = this.lineWidthAction;
        context.strokeStyle = this.lineColor;
        context.arc(xy.x, xy.y, radius, 0, 2 * Math.PI);
        context.stroke();

        return xy;
    }

    /**
     * 画圆圈
     * @param data {{x:Number,y:Number}}
     * @param length {Number}
     */
    drawCross(data, length = 5) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax,
            coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = {
                x: this.paddingLeft + dataPaddingLeft + (data.x - xMin) * coeX,
                y: contentHeight + this.paddingTop - dataPaddingBottom - (data.y - yMin) * coeY
            };

        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.lineColor;

        context.beginPath();
        context.moveTo(xy.x - length, xy.y - length);
        context.lineTo(xy.x + length, xy.y + length);
        context.stroke();

        context.beginPath();
        context.moveTo(xy.x + length, xy.y - length);
        context.lineTo(xy.x - length, xy.y + length);
        context.stroke();

        return xy;
    }

    /**
     * 画圆圈 - 高亮
     * @param data {{x:Number,y:Number}}
     * @param length {Number}
     */
    drawActionCross(data, length = 10) {
        let context = this.context, contentWidth = this.contentWidth, contentHeight = this.contentHeight,
            dataPaddingLeft = this.dataPaddingLeft, dataPaddingBottom = this.dataPaddingBottom;
        let xMin = this.m.xMin, xMax = this.m.xMax, yMin = this.m.yMin, yMax = this.m.yMax,
            coeX = (contentWidth - dataPaddingLeft - this.dataPaddingRight) / (xMax - xMin),
            coeY = (contentHeight - dataPaddingBottom - this.dataPaddingTop) / (yMax - yMin),
            xy = {
                x: this.paddingLeft + dataPaddingLeft + (data.x - xMin) * coeX,
                y: contentHeight + this.paddingTop - dataPaddingBottom - (data.y - yMin) * coeY
            };

        context.lineWidth = this.lineWidthAction;
        context.strokeStyle = this.lineColor;

        context.beginPath();
        context.moveTo(xy.x - length, xy.y - length);
        context.lineTo(xy.x + length, xy.y + length);
        context.stroke();

        context.beginPath();
        context.moveTo(xy.x + length, xy.y - length);
        context.lineTo(xy.x - length, xy.y + length);
        context.stroke();

        return xy;
    }

    drawLegend(dataPadding = 5, width = 100, height = 50) {
        let context = this.context, legandFont = this.legandFont,
            [x, y] = [this.canvas.width - this.paddingRight - dataPadding - width, this.paddingTop + dataPadding];
        this.clear(x, y, width, height);
        this.fill("#ddd", x, y, width, height);
        // 画边框
        context.beginPath();
        this.lineWidth = 1;
        context.strokeStyle = "#000";
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.lineTo(x + width, y + height);
        context.lineTo(x, y + height);
        context.closePath();
        context.stroke();
        // 设置图例文字样式
        context.fillStyle = "#000";
        context.font = legandFont;
        context.textAlign = "start";
        context.textBaseline = "middle";
        // 画 ⚪
        context.beginPath();
        context.arc(x + 20, y + 17, 5, 0, 2 * Math.PI);
        context.stroke();
        // 写 Standard
        context.fillText("Standard", x + 32, y + 18);
        // 画 ×
        context.beginPath();
        context.moveTo(x + 15, y + 31);
        context.lineTo(x + 25, y + 41);
        context.moveTo(x + 15, y + 41);
        context.lineTo(x + 25, y + 31);
        context.stroke();
        // 写 Unknown
        context.fillText("Unknown", x + 32, y + 37);

        return this;
    }

    drawInfo(dataList, dataPadding = 5) {
        let context = this.context, infoFont = this.infoFont, textList = [];
        dataList.forEach(data => {
            let targetName = data.targetName, k = data.k, b = data.b, r2 = data.r2, E = 10 ** (-1 / k) - 1;
            textList[textList.length] = `${targetName}\tE=${(E * 100).toFixed(1)}%\tR^2=${r2.toFixed(3)}\ty=${k.toFixed(3)}x+${b.toFixed(2)}`;
        });
        let width = Math.max(...textList.map(text => context.measureText(text).width)) + 50,
            height = textList.length * 18 + 12,
            [x, y] = [this.paddingLeft + dataPadding, this.canvas.height - this.paddingBottom - dataPadding - height];
        this.clear(x, y, width, height);
        this.fill("#ddd", x, y, width, height);
        // 画边框
        context.beginPath();
        this.lineWidth = 1;
        context.strokeStyle = "#000";
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.lineTo(x + width, y + height);
        context.lineTo(x, y + height);
        context.closePath();
        context.stroke();

        // 设置文字样式
        context.fillStyle = "#000";
        context.font = infoFont;
        context.textAlign = "start";
        context.textBaseline = "middle";
        dataList.forEach((data, index) => {
            // 画短横线
            context.beginPath();
            context.strokeStyle = data.lineColor;
            context.moveTo(x + 10, y + 18 * index + 16);
            context.lineTo(x + 25, y + 18 * index + 16);
            context.stroke();
            // 写文字
            context.fillText(textList[index], x + 35, y + 18 * index + 16);
        });
    }

    /**
     * 画工字
     * @param x0 左边 x 值
     * @param x1 右边 x 值
     * @param y 基准 y 值
     * @param SEM 向上画的高度
     * @param cSEM 向下画的高度
     */
    drawSEM(x0, x1, y, SEM, cSEM) {
        let context = this.context;
        context.beginPath();
        context.moveTo(x0 + 5, y + SEM);
        context.lineTo(x1 - 5, y + SEM);
        context.moveTo(x0 + (x1 - x0) / 2, y);
        context.lineTo(x0 + (x1 - x0) / 2, y + SEM);
        context.stroke();
        context.beginPath();
        context.moveTo(x0 + 5, y - cSEM);
        context.lineTo(x1 - 5, y - cSEM);
        context.moveTo(x0 + (x1 - x0) / 2, y);
        context.lineTo(x0 + (x1 - x0) / 2, y - cSEM);
        context.stroke();
    }

    /**
     * 淡出消失
     * @param speed {Number | String | undefined}   速度
     */
    fadeOut(speed = "normal") {
        if (this.canvas !== undefined) {
            let style = this.canvas.style;
            if (style.display === "none") return;
            switch (speed) {
                case "fast":
                    speed = 200;
                    break;
                case "normal":
                    speed = 400;
                    break;
                case "slow":
                    speed = 600;
                    break;
            }
            style.opacity = "1";
            let i = setInterval(() => {
                if (style.opacity <= 0) {
                    style.display = "none";
                    style.opacity = "";
                    clearInterval(i);
                }
                style.opacity = parseFloat(style.opacity) - 0.01 + "";
            }, speed / 100);
        } else {
            console.warn("Canvas is not defined.");
        }
    }

    /**
     * 淡入出现
     * @param speed {Number | String | undefined}   速度
     */
    fadeIn(speed = "normal") {
        if (this.canvas !== undefined) {
            let style = this.canvas.style;
            if (style.display !== "none") return;
            switch (speed) {
                case "fast":
                    speed = 200;
                    break;
                case "normal":
                    speed = 400;
                    break;
                case "slow":
                    speed = 600;
                    break;
            }
            style.opacity = "0";
            style.display = "";
            let i = setInterval(() => {
                if (style.opacity - 1 >= 0) {
                    style.opacity = "";
                    clearInterval(i);
                }
                style.opacity = parseFloat(style.opacity) + 0.01 + "";
            }, speed / 100);
        } else {
            console.warn("Data table content is not defined.");
        }
    }

    static autoSizeRemoveEventListener(listener) {
        if (listener !== undefined) {
            window.removeEventListener("load", listener, false);
            window.removeEventListener("resize", listener, false);
        }
    }

    autoSize(wh, callback = () => undefined, flagExecute = true) {
        let t = this,
            canvas = t.canvas;

        function canvasEventListener() {
            let c;
            if (t.autoSizeStyle.includes("window")) {
                c = Canvas.client();
            } else if (t.autoSizeStyle.includes("parent")) {
                let style = getComputedStyle(canvas.parentElement);
                c = {width: parseFloat(style.width), height: parseFloat(style.height)};
            } else {
                c = {width: 0, height: 0};
            }
            switch (t.autoSizeStyle) {
                case "window":
                case "parent":
                    canvas.setAttribute("width", wh.widthPercent * c.width - wh.widthOffset + "");
                    canvas.setAttribute("height", wh.heightPercent * c.height - wh.heightOffset + "");
                    callback();
                    return;
                case "wh-px":
                    canvas.setAttribute("width", wh.width + "");
                    canvas.setAttribute("height", wh.height + "");
                    callback();
                    return;
                case "w-px_h-window":
                    canvas.setAttribute("width", wh.width + "");
                    canvas.setAttribute("height", wh.heightPercent * c.height - wh.heightOffset + "");
                    callback();
                    return;
                case "w-window_h-px":
                    canvas.setAttribute("width", wh.widthPercent * c.width - wh.widthOffset + "");
                    canvas.setAttribute("height", wh.height + "");
                    callback();
                    return;
                case "w-px_h-parent":
                    canvas.setAttribute("width", wh.width + "");
                    canvas.setAttribute("height", wh.heightPercent * c.height - wh.heightOffset + "");
                    callback();
                    return;
                case "w-parent_h-px":
                    canvas.setAttribute("width", wh.widthPercent * c.width - wh.widthOffset + "");
                    canvas.setAttribute("height", wh.height + "");
                    callback();
                    return;
                default:
                    canvas.setAttribute("width", "");
                    canvas.setAttribute("height", "");
                    callback();
                    break;
            }
        }

        if (flagExecute) canvasEventListener();

        window.addEventListener("load", canvasEventListener, false);
        window.addEventListener("resize", canvasEventListener, false);

        return {
            eventListener: canvasEventListener,
            callback: callback,
            widthPercent: wh.widthPercent,
            heightPercent: wh.heightPercent,
            widthOffset: wh.widthOffset,
            heightOffset: wh.heightOffset
        };
    }

    removeEventListener(type, listener = this.eventListener[type], options = false) {
        if (listener !== undefined) {
            this.canvas.removeEventListener(type, listener, options);
            delete this.eventListener[type];
        }
        return this;
    }

    addEventListener(type, listener, options = false) {
        if (listener !== undefined) {
            this.canvas.addEventListener(type, listener, options);
            this.eventListener[type] = listener;
        }
        return this;
    }

    /**
     * tools
     */
    static getAxesM_X(max, min, length) {
        let number = max - min;
        if (number === Infinity || number === -Infinity || Number.isNaN(number))
            return [max, min, (max - min) / length];
        if (number / 10 % 1 !== 0 || number / 9 % 1 !== 0 || number / 8 % 1 !== 0 || number / 7 % 1 !== 0 || number / 6 % 1 !== 0 || number / 5 % 1 !== 0 || number / 4 % 1 !== 0 || number / 3 % 1 !== 0) {
            if (number % 1 !== 0) {
                let temp = Math.ceil(number);
                max += temp - number;
                number = temp;
            }

            let t1 = number + 1;
            if (!(t1 / 10 % 1 !== 0 && t1 / 9 % 1 !== 0 && t1 / 8 % 1 !== 0 && t1 / 7 % 1 !== 0 && t1 / 6 % 1 !== 0 && t1 / 5 % 1 !== 0 && t1 / 4 % 1 !== 0 && t1 / 3 % 1 !== 0)) {
                return [max + 1, min, (max - min) / length];
            }
            let t2 = number + 2;
            if (!(t2 / 10 % 1 !== 0 && t2 / 9 % 1 !== 0 && t2 / 8 % 1 !== 0 && t2 / 7 % 1 !== 0 && t2 / 6 % 1 !== 0 && t2 / 5 % 1 !== 0 && t2 / 4 % 1 !== 0 && t2 / 3 % 1 !== 0)) {
                return [max + 2, min, (max - min) / length];
            }
            let t22 = number + 3;
            if (!(t22 / 10 % 1 !== 0 && t22 / 9 % 1 !== 0 && t22 / 8 % 1 !== 0 && t22 / 7 % 1 !== 0 && t22 / 6 % 1 !== 0 && t22 / 5 % 1 !== 0 && t22 / 4 % 1 !== 0 && t22 / 3 % 1 !== 0)) {
                return [max + 3, min, (max - min) / length];
            }
            let t3 = number - 1;
            if (!(t3 / 10 % 1 !== 0 && t3 / 9 % 1 !== 0 && t3 / 8 % 1 !== 0 && t3 / 7 % 1 !== 0 && t3 / 6 % 1 !== 0 && t3 / 5 % 1 !== 0 && t3 / 4 % 1 !== 0 && t3 / 3 % 1 !== 0)) {
                return [max - 1, min, (max - min) / length];
            }
            let t4 = number - 2;
            if (!(t4 / 10 % 1 !== 0 && t4 / 9 % 1 !== 0 && t4 / 8 % 1 !== 0 && t4 / 7 % 1 !== 0 && t4 / 6 % 1 !== 0 && t4 / 5 % 1 !== 0 && t4 / 4 % 1 !== 0 && t4 / 3 % 1 !== 0)) {
                return [max - 1, min + 1, (max - min) / length];
            }
            while (number / 10 % 1 !== 0 && number / 9 % 1 !== 0 && number / 8 % 1 !== 0 && number / 7 % 1 !== 0 && number / 6 % 1 !== 0 && number / 5 % 1 !== 0 && number / 4 % 1 !== 0 && number / 3 % 1 !== 0) {
                number++;
                max++;
            }
        }
        return [max, min, (max - min) / length];
    }

    static getAxesM_Y(max, min, length) {
        let t = 1;
        switch (Math.ceil(Math.log10(Math.abs(max - min)))) {
            case 2:
                t = 2;
                break;
            case 1:
                t = 3;
                break;
            case 0:
                t = 4;
                break;
        }
        let _max, _min, log,
            log1 = min !== 0 ? Math.floor(Math.log10(Math.abs(min))) - t : 0,
            log2 = max !== 0 ? Math.floor(Math.log10(Math.abs(max))) - t : 0;

        log = log1 > log2 ? log1 : log2;
        // _min = Math.floor(min);
        _min = min !== 0 ? Math.floor(min / (10 ** log)) * (10 ** log) : 0;
        // _max = max !== 0 ? Math.ceil(max / (10 ** log)) * (10 ** log) : 0;
        _max = Math.ceil(max);
        return [_max, _min, (_max - _min) / length];
    }

    //获取屏幕可视区域的宽高
    static client() {
        if (window.innerHeight !== undefined) {
            return {
                "width": window.innerWidth,
                "height": window.innerHeight
            }
        } else if (document.compatMode === "CSS1Compat") {
            return {
                "width": document.documentElement.clientWidth,
                "height": document.documentElement.clientHeight
            }
        } else {
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }
        }
    }

    /**
     * 计算斜率和截距
     * @param data {Array}
     * @return {number[]}
     */
    static calKB(data) {
        let [a, b, c, d, len] = [0, 0, 0, 0, 0];
        data.forEach(val => {
            if (val.x === -1 || val.y === -1) return;
            a += val.x * val.y; // xy 乘积的累加和
            b += val.x;     // x 累加和
            c += val.y;     // y 累加和
            d += val.x ** 2;    // x 平方的累加和
            len++;
        });
        let [x, y] = [len * a - b * c, len * d - b ** 2],
            [kReturn, bReturn] = [x / y, c / len - x / y * b / len],
            [bAverage, cAverage] = [b / len, c / len];

        let [ssr, sst] = [0, 0];
        data.forEach(val => {
            if (val.x === -1 || val.y === -1) return;
            ssr += (kReturn * val.x + bReturn - cAverage) ** 2;
            sst += (val.y - cAverage) ** 2;
        });
        let R2 = ssr / sst;

        // [a, b, c] = [0, 0, 0];
        // for (let i = 0; i < len; i++) {
        //     let logSQ = data[i].x;
        //     a += (logSQ - bAverage) * (data[i].y - cAverage);
        //     b += (logSQ - bAverage) ** 2;
        //     c += (data[i].y - cAverage) ** 2;
        // }
        // let R2 = (a / (Math.sqrt(b) * Math.sqrt(c)) ** 2;

        return [kReturn, bReturn, R2];
    }
}
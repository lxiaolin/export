class PlateTable {
    /**
     * @constructor
     * @param ids {...{idContent: String, idTop: String, idLeft: String}}
     * @param row {...Number}  必需，生成行数
     * @param col {...Number}  必需，生成列数
     * @param type  {...{top: String, left: String} | undefined} 非必需，标题序号类型
     */
    constructor(ids, row = 0, col = 0, type) {
        this.eventListener = {};
        this.row = row;
        this.col = col;

        if (ids.idTop !== undefined) {
            this.tableTop = document.getElementById(ids.idTop);
        } else {
            console.warn("idTop is not defined");
        }
        if (ids.idLeft !== undefined) {
            this.tableLeft = document.getElementById(ids.idLeft);
        } else {
            console.warn("tableLeft is not defined");
        }
        if (ids.idContent !== undefined) {
            this.tableContent = document.getElementById(ids.idContent);
        } else {
            console.warn("tableContent is not defined");
        }
        this.table = {
            tableTop: this.tableTop,
            tableLeft: this.tableLeft,
            tableContent: this.tableContent
        };
        // this.init(row, col, type);
        this.tds = this.find("td"); // 取出所有 td
    }

    /**
     *  生成表格元素
     * @param row {Number}  必需，生成行数
     * @param col {Number}  必需，生成列数
     * @param type  {...{top: String, left: String} | undefined} 非必需，标题序号类型
     * @return {PlateTable}
     */
    init(row, col, type = {top: "Number", left: "UpperCase"}) {
        let tableTop = this.tableTop, tableLeft = this.tableLeft, tableContent = this.tableContent;
        if (tableTop !== undefined) {
            let children = tableTop.children;
            if (children.length === 0) tableTop.innerHTML = "<thead></thead>";
            Array.from(children).forEach(child => {
                let str = "<tr>";
                for (let j = 0; j < col; j++) {
                    switch (child.tagName.toLowerCase()) {
                        case "thead":
                            switch (type.top) {
                                case "Number":
                                    str += `<th>${j + 1}</th>`;
                                    break;
                                case "UpperCase":
                                    str += `<th>${String.fromCharCode(j + 65)}</th>`;
                                    break;
                                case "LowerCase":
                                    str += `<th>${String.fromCharCode(j + 97)}</th>`;
                                    break;
                                default:
                                    str += `<th></th>`;
                                    break;
                            }
                            break;
                        case "tbody":
                            switch (type.top) {
                                case "Number":
                                    str += `<td>${j + 1}</td>`;
                                    break;
                                case "UpperCase":
                                    str += `<td>${String.fromCharCode(j + 65)}</td>`;
                                    break;
                                case "LowerCase":
                                    str += `<td>${String.fromCharCode(j + 97)}</td>`;
                                    break;
                                default:
                                    str += `<td></td>`;
                                    break;
                            }
                            break;
                    }
                }
                str += "</tr>";
                child.innerHTML = str;
            });
        }
        if (tableLeft !== undefined) {
            let children = tableLeft.children;
            if (children.length === 0) tableLeft.innerHTML = "<thead></thead>";
            Array.from(children).forEach(child => {
                let str = "";
                for (let j = 0; j < row; j++) {
                    switch (child.tagName.toLowerCase()) {
                        case "thead":
                            switch (type.left) {
                                case "Number":
                                    str += `<tr><th>${j + 1}</th></tr>`;
                                    break;
                                case "UpperCase":
                                    str += `<tr><th>${String.fromCharCode(j + 65)}</th></tr>`;
                                    break;
                                case "LowerCase":
                                    str += `<tr><th>${String.fromCharCode(j + 97)}</th></tr>`;
                                    break;
                                default:
                                    str += `<tr><th></th></tr>`;
                                    break;
                            }
                            break;
                        case "tbody":
                            switch (type.left) {
                                case "Number":
                                    str += `<tr><td>${j + 1}</td></tr>`;
                                    break;
                                case "UpperCase":
                                    str += `<tr><td>${String.fromCharCode(j + 65)}</td></tr>`;
                                    break;
                                case "LowerCase":
                                    str += `<tr><td>${String.fromCharCode(j + 97)}</td></tr>`;
                                    break;
                                default:
                                    str += `<tr><td></td></tr>`;
                                    break;
                            }
                            break;
                    }
                }
                child.innerHTML = str;
            });
        }
        if (tableContent !== undefined) {
            let children = tableContent.children;
            if (children.length === 0) tableContent.innerHTML = "<tbody></tbody>";

            Array.from(children).forEach(child => {
                let str = "";
                for (let j = 0; j < row; j++) {
                    str += "<tr>";
                    for (let k = 0; k < col; k++)
                        str += `<td><div>
<!--                                    <p></p>-->
<!--                                    <p><img src="../../images/blank.png" alt><img src="../../images/blank.png" alt><img src="../../images/blank.png" alt></p>-->
<!--                                    <p><img src="../../images/blank.png" alt><img src="../../images/blank.png" alt><img src="../../images/blank.png" alt></p>-->
<!--                                    <p><img src="../../images/blank.png" alt><img src="../../images/blank.png" alt></p>-->
                                </div></td>`;
                    str += "</tr>";
                }
                child.innerHTML = str;
            });
        }

        return this;
    }

    /**
     *  给表格的一个单元格插入内容或批量插入
     * @param item {Array} 必需，@param index 为 undefined 时，@param item 应该是个三维数组，否则应为一维数组。
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    insertData(item, index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    Array.from(trs).forEach((tr, j) => {
                        let tds = tr.children;
                        Array.from(tds).forEach((td, k) => {
                            if (item.hasOwnProperty(j) && item[j].hasOwnProperty(k)) {
                                let len = 4,
                                    div = td.firstElementChild,
                                    ps = div.children;
                                Array.from(ps).some((p, index) => {
                                    if (index === 0) {
                                        if (item[j][k][0] !== undefined && item[j][k][0] !== null)
                                            p.title = p.innerText = item[j][k][0];
                                        return item[j][k].length === 4;
                                    } else {
                                        return Array.from(p.children).some(img => {
                                            if (item.hasOwnProperty(len)) {
                                                img.style.backgroundColor = item[j][k][len].color;
                                                img.title = item[j][k][len].name;
                                            }
                                            return item[j][k].length === ++len;
                                        });
                                    }
                                });
                                switch (item[j][k][1]) {
                                    case Task.STD:
                                        div.style.borderColor = Task.colorSTD;
                                        break;
                                    case Task.UNK:
                                        div.style.borderColor = Task.colorUNK;
                                        break;
                                    case Task.NTC:
                                        div.style.borderColor = Task.colorNTC;
                                        break;
                                    case Task.NEG:
                                        div.style.borderColor = Task.colorNEG;
                                        break;
                                    case Task.POS:
                                        div.style.borderColor = Task.colorPOS;
                                        break;
                                }
                                if (item[j][k][2]) ps[3].firstElementChild.src = "../../images/control.png";
                                if (item[j][k][3]) ps[3].lastElementChild.src = "../../images/reference.png";
                            }
                        });
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col)) {
                            let len = 4,
                                div = tds[col].firstElementChild,
                                ps = div.children;
                            Array.from(ps).some((p, index) => {
                                if (index === 0) {
                                    if (item[0] !== undefined && item[0] !== null)
                                        p.title = p.innerText = item[0];
                                    return item.length === 4;
                                } else {
                                    return Array.from(p.children).some(img => {
                                        if (item.hasOwnProperty(len)) {
                                            img.style.backgroundColor = item[len].color;
                                            img.title = item[len].name;
                                        }
                                        return item.length === ++len;
                                    });
                                }
                            });
                            switch (item[1]) {
                                case Task.STD:
                                    div.style.borderColor = Task.colorSTD;
                                    break;
                                case Task.UNK:
                                    div.style.borderColor = Task.colorUNK;
                                    break;
                                case Task.NTC:
                                    div.style.borderColor = Task.colorNTC;
                                    break;
                                case Task.NEG:
                                    div.style.borderColor = Task.colorNEG;
                                    break;
                                case Task.POS:
                                    div.style.borderColor = Task.colorPOS;
                                    break;
                            }
                            if (item[2]) ps[3].firstElementChild.src = "../../images/control.png";
                            if (item[3]) ps[3].lastElementChild.src = "../../images/reference.png";
                        }
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  判断表格的一个单元格是否有 innerText
     * @param index {{row:Number,col:Number}}  必需
     * @return {boolean}
     */
    hasInnerText(index) {
        let result = false;
        if (this.tableContent !== undefined && this.tableContent !== null) {
            let row = index.row, col = index.col;
            let trs = this.tableContent.firstElementChild.children;
            if (trs.hasOwnProperty(row)) {
                let tds = trs[row].children;
                if (tds.hasOwnProperty(col))
                    result = tds[col].firstElementChild.firstElementChild.innerText !== "";
            }
        } else {
            console.warn("Plate table content is not defined.");
        }
        return result;
    }

    /**
     *  判断表格的一个单元格是否有 innerHTML
     * @param index {{row:Number,col:Number}}  必需
     * @return {boolean}
     */
    hasInnerHTML(index) {
        let result = false;
        if (this.tableContent !== undefined && this.tableContent !== null) {
            let row = index.row, col = index.col;
            Array.from(this.tableContent.children).forEach(child => {
                let trs = child.children;
                if (trs.hasOwnProperty(row)) {
                    let tds = trs[row].children;
                    if (tds.hasOwnProperty(col))
                        result = tds[col].firstElementChild.firstElementChild.innerHTML !== "";
                }
            });
        } else {
            console.warn("Plate table content is not defined.");
        }
        return result;
    }

    /**
     *  清空全部表格元素内容
     * @return {PlateTable}
     */
    clear() {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            Array.from(this.tableContent.firstElementChild.children).forEach(tr =>
                Array.from(tr.children).forEach(td => {
                    td.style.backgroundColor = "";
                    let div = td.firstElementChild;
                    div.style.borderColor = "";
                    Array.from(div.children).forEach((p, index) => {
                        switch (index) {
                            case 0:
                                p.innerText = "";
                                break;
                            case 3:
                                Array.from(p.children).forEach(img => img.src = "../../images/blank.png");
                                break;
                            default:
                                Array.from(p.children).forEach(img => img.style.backgroundColor = "");
                                break;
                        }
                    });
                })
            );
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  给表格的一个或全部单元格增加类
     * @param className {String} 必需
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    addClass(className, index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    Array.from(child.children).forEach(tr => {
                        Array.from(tr.children).forEach(td => {
                            if (!td.classList.contains(className))
                                td.classList.add(className);
                        });
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col)) {
                            let td = tds[col];
                            if (!td.classList.contains(className))
                                td.classList.add(className);
                        }
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  给表格的一个或全部单元格移除类
     * @param className {String} 必需
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    removeClass(className, index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    Array.from(child.children).forEach(tr => {
                        Array.from(tr.children).forEach(td => {
                            if (td.classList.contains(className))
                                td.classList.remove(className);
                        });
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col)) {
                            let td = tds[col];
                            if (td.classList.contains(className))
                                td.classList.remove(className);
                        }
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  给表格的一个或全部单元格增加或移除类
     * @param className {String} 必需
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    toggleClass(className, index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    Array.from(child.children).forEach(tr => {
                        Array.from(tr.children).forEach(td => td.classList.toggle(className));
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col))
                            tds[col].classList.toggle(className);
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  给表格的一个或全部单元格移除全部类
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    clearClass(index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    Array.from(child.children).forEach(tr => {
                        Array.from(tr.children).forEach(td => td.classList.value = "");
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col)) {
                            tds[col].classList.value = "";
                        }
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     *  判断表格的一个单元格是否有类
     * @param index {{row:Number,col:Number}}  必需
     * @param className {String}    必需
     * @return {boolean}
     */
    hasClass(className, index) {
        let result = false;
        if (this.tableContent !== undefined && this.tableContent !== null) {
            let row = index.row, col = index.col;
            Array.from(this.tableContent.children).forEach(child => {
                let trs = child.children;
                if (trs.hasOwnProperty(row)) {
                    let tds = trs[row].children;
                    if (tds.hasOwnProperty(col))
                        result = tds[col].classList.contains(className);
                }
            });
        } else {
            console.warn("Plate table content is not defined.");
        }

        return result;
    }

    /**
     *  给表格的一个或全部单元格修改 css 样式
     * @param cssName {String} 必需
     * @param cssValue {String} 必需
     * @param index {...{row:Number,col:Number} | undefined}  非必需
     * @return {PlateTable}
     */
    css(cssName, cssValue, index) {
        if (this.tableContent !== undefined && this.tableContent !== null) {
            if (index === undefined) {
                Array.from(this.tableContent.children).forEach(child => {
                    Array.from(child.children).forEach(tr => {
                        Array.from(tr.children).forEach(td => td.style[cssName] = cssValue);
                    });
                });
            } else {
                let row = index.row, col = index.col;
                Array.from(this.tableContent.children).forEach(child => {
                    let trs = child.children;
                    if (trs.hasOwnProperty(row)) {
                        let tds = trs[row].children;
                        if (tds.hasOwnProperty(col)) {
                            tds[col].style[cssName] = cssValue;
                        }
                    }
                });
            }
        } else {
            console.warn("Plate table content is not defined.");
        }

        return this;
    }

    /**
     * 返回 tableContent 的全部 tagName 标签的 DOM 元素
     * @param tagName
     * @returns {[]}
     */
    find(tagName = "") {
        let result = [];
        if (this.tableContent !== undefined && this.tableContent !== null) {
            PlateTable._find(result, tagName, this.tableContent);
        } else {
            console.warn("Plate table content is not defined.");
        }
        return result;
    }

    /**
     * private function 递归调用
     * @param result {Array}    传入数组，并将查找结果存入该数组
     * @param tagName {String}  要查找的标签名，不区分大小写
     * @param parentElem {Element}  首次调用，传入根节点
     */
    static _find(result, tagName, parentElem) {
        Array.from(parentElem.children).forEach(child => {
            if (child.tagName.toLowerCase() === tagName.toLowerCase()) result[result.length] = child;
            PlateTable._find(result, tagName, child);
        });
    }

    children(tagName = "") {
        let result = [];
        if (this.tableContent !== undefined && this.tableContent !== null) {
            Array.from(this.tableContent.children).forEach(child => child.tagName.toLowerCase() === tagName.toLowerCase() ? result[result.length] = child : undefined);
        } else {
            console.warn("Plate table content is not defined.");
        }
        return result;
    }

    removeEventListener(type, listener = this.eventListener[type], options = false) {
        if (this.tableContent !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableContent.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.removeEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableContent.removeEventListener(type, listener, options);
                    break;
            }
            delete this.eventListener[type];
        }

        return this;
    }

    addEventListener(type, listener, options = false) {
        if (this.tableContent !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableContent.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.addEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableContent.addEventListener(type, listener, options);
                    break;
            }
            this.eventListener[type] = listener;
        }

        return this;
    }

    removeEventListenerToTop(type, listener = this.eventListener[type], options = false) {
        if (this.tableTop !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableTop.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.removeEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableTop.removeEventListener(type, listener, options);
                    break;
            }
            delete this.eventListener[type];
        }

        return this;
    }

    addEventListenerToTop(type, listener, options = false) {
        if (this.tableTop !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableTop.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.addEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableTop.addEventListener(type, listener, options);
                    break;
            }
            this.eventListener[type] = listener;
        }

        return this;
    }

    removeEventListenerToLeft(type, listener = this.eventListener[type], options = false) {
        if (this.tableLeft !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableLeft.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.removeEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableLeft.removeEventListener(type, listener, options);
                    break;
            }
            delete this.eventListener[type];
        }

        return this;
    }

    addEventListenerToLeft(type, listener, options = false) {
        if (this.tableLeft !== undefined && listener !== undefined) {
            switch (type) {
                case "mouseenter":
                case "mouseleave":
                    Array.from(this.tableLeft.children).forEach(child => {
                        Array.from(child.children).forEach(tr => {
                            Array.from(tr.children).forEach(td => td.addEventListener(type, listener, options));
                        });
                    });
                    break;
                default:
                    this.tableLeft.addEventListener(type, listener, options);
                    break;
            }
            this.eventListener[type] = listener;
        }

        return this;
    }

    /**
     * 核心相交算法
     * @param elem1 {Element}
     * @param elem2 {Element}
     */
    static isCross(elem1, elem2) {
        let [rect1, rect2] = [getRect(elem1), getRect(elem2)];
        let xNotCross = ((rect1.x1 >= rect2.x2) || (rect2.x1 >= rect1.x2)), //x方向上不重合
            yNotCross = ((rect1.y1 >= rect2.y2) || (rect2.y1 >= rect1.y2)); //y方向上不重合
        return !(xNotCross || yNotCross);

        /**
         * private function 获取元素的矩形的起始点坐标与其对角点坐标
         * @param elem  {Element}
         * @return {{x1: *, x2: *, y1: *, y2: *}}
         */
        function getRect(elem) {
            let bcr = elem.getBoundingClientRect();
            let [x1, y1] = [bcr.left + window.pageXOffset, bcr.top + window.pageYOffset],
                [x2, y2] = [bcr.right + window.pageXOffset, bcr.bottom + window.pageYOffset];
            return {x1, x2, y1, y2};
        }
    }
}
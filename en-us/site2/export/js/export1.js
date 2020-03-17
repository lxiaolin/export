var updateReport;
$(() => {
    // 后台接收数据对象
    const data = {
        hasLogo: true,
        hasHeader: true,
        header: {
            headerAlign: "center",
            hasTittle: true,
            tittle: "Experiment Name",
            hasSubTittle: true,
            subTittle: "2020/3/13 23:53",
            hasLogo: false,
            imgLogo: ""
        },
        hasExperiment: true,
        experiment: {
            hasInformation: true,
            information: {
                name: "Experiment Name",
                barcode: "",
                userName: "User Name",
                instrumentName: "",
                blockType: "96-Well 0.1-ml Block"
            },
            hasExperimentSetting: true,
            experimentSetting: {
                experimentType: "MeltCurve",
                chemistry: "TapMan Reagents",
                runMode: "Sample"
            },
            hasParameterSetting: true,
            parameterSetting: {
                reactionVolume: "",
                lidHeatingSwitch: "",
                coverTemp: "",
                lidCloseTemp: "",
            },
            hasComments: true,
            comments: "",
            hasLoadPreview: true,
            imgLoadPreviewPlate: "",
            imgLoadPreviewProtocol: "",
        },
        hasPlate: true,
        plate: {
            hasPlateLayout: true,
            plateLayout: [
                [
                    "",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ],
                [
                    "A",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "",
                    "",
                    ""
                ],
                [
                    "B",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "",
                    "",
                    ""
                ],
                [
                    "C",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\na\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nb\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "sample\nc\nUnk",
                    "",
                    "",
                    ""
                ],
                [
                    "D",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd"
                ],
                [
                    "E",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd"
                ],
                [
                    "F",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\na\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd",
                    "sample\nb\nStd"
                ],
                [
                    "G",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "",
                    "",
                    ""
                ],
                [
                    "H",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "sample\nc\nStd",
                    "",
                    "",
                    ""
                ]
            ],
            hasTask: true,
            task: "",
            hasTarget: true,
            target: [
                [
                    "NAME",
                    "CLR",
                    "CH",
                    "QUEN",
                    "RF"
                ],
                [
                    "a",
                    "#00aa00",
                    "FAM",
                    "TAMARA",
                    false
                ],
                [
                    "b",
                    "#0088dd",
                    "FAM",
                    "TAMARA",
                    true
                ],
                [
                    "c",
                    "#dd0000",
                    "FAM",
                    "TAMARA",
                    false
                ]
            ],
            hasSplitPlate: true,
            splitPlate: "",
            hasSample: true,
            sample: [
                [
                    "ID",
                    "NAME",
                    "CTRL",
                    "WELL",
                    "MARK"
                ],
                [
                    "",
                    "sample",
                    true,
                    "A1",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A2",
                    ""
                ]
            ],
            hasStandard: true,
            standard: {
                selectTarget: "",
                standardAmount: "",
                standardNumber: "",
                factor: "",
                dilutionFactor: "",
                unit: "",
                replicates: "",
                increasing_decreasing: "",
                assignment: ""
            }
        },
        hasProtocol: true,
        protocol: {
            hasProtocol: true,
            protocol: "",
            advancedSetting: ""
        },
        hasRun: true,
        run: {
            hasRunTime: true,
            runTime: "",
            hasTemperatureCurve: true,
            imgTemperatureCurve: ""
        },
        hasAnalysis: true,
        analysis: {
            hasQuantification: true,
            imgAmplificationCurve_cq: "",
            imgAmplificationCurve_log: "",
            hasStandardCurve: true,
            imgStandardCurve: "",
            hasQuantificationData: true,
            quantificationData: [
                [
                    "Well",
                    "Target",
                    "Task",
                    "Sample",
                    "Cq",
                    "Cq Mean",
                    "SQ",
                    "F0"
                ],
                [
                    "A1",
                    "Actin",
                    "Unk",
                    "0Hr",
                    "19.64",
                    "19.68",
                    "1.1138E+05",
                    "0.00000326"
                ],
                [
                    "A2",
                    "Actin",
                    "Unk",
                    "1Hr",
                    "19.69",
                    "19.73",
                    "1.0833E+05",
                    "0.00000317"
                ]
            ],
            hasMelt: true,
            imgMeltCurve: "",
            imgMeltPeak: "",
            hasMeltData: true,
            meltData: [
                [
                    "Well",
                    "Target",
                    "Task",
                    "Sample",
                    "Melt Temp"
                ],
                [
                    "A1",
                    "a",
                    "Unk",
                    "ss",
                    "83.00"
                ],
                [
                    "A2",
                    "a",
                    "Unk",
                    "ss",
                    "83.00"
                ]
            ],
            hasGeneExpression: true,
            imgGeneExpressionBar: "",
            geneExpressionMode: "",
            geneExpressionData: [
                [
                    "Target",
                    "Sample",
                    "Ctrl",
                    "Expression",
                    "Expression SD",
                    "Corrected Expression SD",
                    "Expression SEM",
                    "Corrected Expression SEM",
                    "Mean Cq",
                    "Cq SD",
                    "Cq SEM"
                ],
                [
                    "Actin",
                    "0Hr",
                    "*",
                    "N/A",
                    "N/A",
                    "N/A",
                    "N/A",
                    "N/A",
                    "19.68",
                    "0.040415",
                    "0.023333"
                ],
                [
                    "Actin",
                    "1Hr",
                    "",
                    "N/A",
                    "N/A",
                    "N/A",
                    "N/A",
                    "N/A",
                    "19.73",
                    "0.040000",
                    "0.023094"
                ]
            ]
        }
    };

    // 更新后台接收数据对象的方法
    function update(toObject = data, fromObject) {
        if (Array.isArray(toObject)) {
            toObject.length = 0;
            fromObject.forEach(item => toObject[toObject.length] = item);
        } else {
            for (let item in fromObject) {
                if (fromObject.hasOwnProperty(item) && toObject.hasOwnProperty(item)) {
                    if (typeof toObject[item] === "object") {
                        update(toObject[item], fromObject[item]);
                    } else {
                        toObject[item] = fromObject[item];
                    }
                }
            }
        }
    }

    // 本页面的更新主方法
    updateReport = (obj = {}) => {
        update(data, obj);
        updateDate();
        showDiv();
        adjust();
    };

    $("#save").on("click", () => {
        $alertDownloading.fadeIn("fast");
        alert("It is generating file that can be export, please wait for a few seconds.");
        $.ajax({
            type: "POST",
            url: top.cqMAN.pageContextPath + "/reportAction/generate",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success() {
                window.location.href = top.cqMAN.pageContextPath + "/reportAction/generateUrl";
                alertFadeOut();
            },
            error() {
                alert("A fatal unknown error has occurred.");
                alertFadeOut();
            }
        });
    });

    // 新增

    // 更新时间
    function updateDate() {
        let date = new Date();
        let myDate = document.getElementById("myDate");
        myDate.value = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    }

    // 上传图片
    // 连续上传两次同一张图片,第二次失效
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
            // let path = fileReader.result;
            updateReport({
                header: {
                    hasLogo: true,
                    imgLogo: e.target.result.split(",")[1]
                }
            });
        };
        fileReader.readAsDataURL(file);
    });

    // 清除图片
    $(".clearLogo").on("click", function () {
        document.getElementById("preview").src = "";
        // 更新数据
        updateReport({
            header: {
                hasLogo: false,
                imgLogo: ""
            }
        });
    });

    // 绑定checkbox
    $("#chk_experiment").on("click", () => updateReport({hasExperiment: $(this)[0].checked}));

    $("#chk_information").on("click", () => updateReport({experiment: {hasInformation: $(this)[0].checked}}));

    $("#chk_experimentSetting").on("click", () => updateReport({experiment: {hasExperimentSetting: $(this)[0].checked}}));

    $("#chk_parameterSetting").on("click", () => updateReport({experiment: {hasParameterSetting: $(this)[0].checked}}));

    $("#chk_comments").on("click", () => updateReport({experiment: {hasComments: $(this)[0].checked}}));

    $("#chk_loadPreview").on("click", () => updateReport({experiment: {hasLoadPreview: $(this)[0].checked}}));

    $("#chk_plateEdit").on("click", () => updateReport({hasPlate: $(this)[0].checked}));

    $("#chk_plateLayout").on("click", () => updateReport({plate: {hasPlateLayout: $(this)[0].checked}}));

    $("#chk_task").on("click", () => updateReport({plate: {hasTask: $(this)[0].checked}}));

    $("#chk_target").on("click", () => updateReport({plate: {hasTarget: $(this)[0].checked}}));

    $("#chk_splitPlate").on("click", () => updateReport({plate: {hasSplitPlate: $(this)[0].checked}}));

    $("#chk_sample").on("click", () => updateReport({plate: {hasSample: $(this)[0].checked}}));

    $("#chk_standard").on("click", () => updateReport({plate: {hasStandard: $(this)[0].checked}}));

    $("#chk_protocolEdit").on("click", () => updateReport({hasProtocol: $(this)[0].checked}));

    $("#chk_protocol").on("click", () => updateReport({protocol: {hasProtocol: $(this)[0].checked}}));

    $("#chk_run").on("click", () => updateReport({hasRun: $(this)[0].checked}));

    $("#chk_runTime").on("click", () => updateReport({run: {hasRunTime: $(this)[0].checked}}));

    $("#chk_temperatureCurve").on("click", () => updateReport({run: {hasTemperatureCurve: $(this)[0].checked}}));

    $("#chk_analysis").on("click", () => updateReport({hasAnalysis: $(this)[0].checked}));

    $("#chk_quantification").on("click", () => updateReport({analysis: {hasQuantification: $(this)[0].checked}}));

    $("#chk_standardCurve").on("click", () => updateReport({analysis: {hasStandardCurve: $(this)[0].checked}}));

    $("#chk_quantificationData").on("click", () => updateReport({analysis: {hasQuantificationData: $(this)[0].checked}}));

    $("#chk_meltCurve").on("click", () => updateReport({analysis: {hasMelt: $(this)[0].checked}}));

    $("#chk_meltData").on("click", () => updateReport({analysis: {hasMeltData: $(this)[0].checked}}));

    $("#chk_geneExpression").on("click", () => updateReport({analysis: {hasGeneExpression: $(this)[0].checked}}));


    // word内容
    showDiv();
    insertText();
    adjust();


    function adjust() {
        let h = 0, margin = 30, pageHeight = 1400, htmlList = [""];
        $("#container > div > p, #container > div > img, #container > div > table, #container > div > div").each(function () {
            let $this = $(this);
            let outerHTML = this.outerHTML; // 当前元素的 html 字符串
            if (this.style.display === "none") {
                htmlList[htmlList.length - 1] += outerHTML; // 如果隐藏直接塞进去
            } else {
                if (this.tagName.toLowerCase() === "table") { // 如果是 table 标签
                    $this.find("tr").each(function () { // 对每个 tr 遍历
                        let $this = $(this);
                        let outerHTML = this.outerHTML;
                        let height = $this.outerHeight();   // tr 高度
                        if (h + height > pageHeight) {  // 超出一页
                            if ($this.index() !== 0) htmlList[htmlList.length - 1] += "</table>";// 如果不是第一个 tr，则给上一个封底
                            htmlList[htmlList.length] = "<table>" + outerHTML; // 起新的一页，封顶，不写 thead 和 tbody，让浏览器自行处理
                            h = height;  // 重置高度
                        } else {    // 没超出一页
                            h += height;    // 对计算高度累加
                            if ($this.index() === 0) htmlList[htmlList.length - 1] += "<table>";// 如果是第一个 tr，则先封顶
                            htmlList[htmlList.length - 1] += outerHTML; // 将 tr 塞进去
                        }
                    });
                    htmlList[htmlList.length - 1] += "</table>"; // 封底
                } else {    // 非 table 标签
                    let height = $this.outerHeight() + margin;  // 计算高度，height + padding + margin
                    if (h + height > pageHeight) {  // 超出一页
                        htmlList[htmlList.length] = outerHTML;  // 起新的一页，直接塞进去
                        h = height; // 重置高度
                    } else {    // 未超出一页
                        h += height;    // 对计算高度累加
                        htmlList[htmlList.length - 1] += outerHTML; // 直接塞进去
                    }
                }
            }
        });
        $("#container").html(htmlList.map(html => `<div>${html}</div>`).join(""));

    }


    // 判断是否显示DIV
    function showDiv() {
        // Header
        if (data.header.hasTittle) {
            document.getElementById("title").style.display = "block";
        } else {
            document.getElementById("title").style.display = "none";
        }

        if (data.header.hasSubTittle) {
            document.getElementById("subTitle").style.display = "block";
        } else {
            document.getElementById("subTitle").style.display = "none";
        }

        if (data.header.hasLogo) {
            document.getElementById("head").style.display = "block";
        } else {
            document.getElementById("head").style.display = "none";
        }

        // Experiment
        if (document.getElementById("chk_experiment").checked) {
            document.getElementById("experimentTitle").style.display = "block";
        } else {
            document.getElementById("experimentTitle").style.display = "none";
        }

        // Information
        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_information").checked) {
            document.getElementById("informationTitle").style.display = "block";
            document.getElementById("informationName").style.display = "block";
            document.getElementById("informationBarcode").style.display = "block";
            document.getElementById("informationUserName").style.display = "block";
            document.getElementById("informationInsName").style.display = "block";
            document.getElementById("informationBlockType").style.display = "block";
        } else {
            document.getElementById("informationTitle").style.display = "none";
            document.getElementById("informationName").style.display = "none";
            document.getElementById("informationBarcode").style.display = "none";
            document.getElementById("informationUserName").style.display = "none";
            document.getElementById("informationInsName").style.display = "none";
            document.getElementById("informationBlockType").style.display = "none";
        }

        // experimentSetting
        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_experimentSetting").checked) {
            document.getElementById("experimentSettingTitle").style.display = "block";
            document.getElementById("experimentSetting_ET").style.display = "block";
            document.getElementById("experimentSettingChemistry").style.display = "block";
            document.getElementById("experimentSettingRunMode").style.display = "block";
        } else {
            document.getElementById("experimentSettingTitle").style.display = "none";
            document.getElementById("experimentSetting_ET").style.display = "none";
            document.getElementById("experimentSettingChemistry").style.display = "none";
            document.getElementById("experimentSettingRunMode").style.display = "none";
        }

        // Parameter Setting
        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_parameterSetting").checked) {
            document.getElementById("parameterSettingTitle").style.display = "block";
            document.getElementById("parameterSettingRV").style.display = "block";
            document.getElementById("parameterSettingLHS").style.display = "block";
            document.getElementById("parameterSettingCT").style.display = "block";
            document.getElementById("parameterSettingLCT").style.display = "block";
        } else {
            document.getElementById("parameterSettingTitle").style.display = "none";
            document.getElementById("parameterSettingRV").style.display = "none";
            document.getElementById("parameterSettingLHS").style.display = "none";
            document.getElementById("parameterSettingCT").style.display = "none";
            document.getElementById("parameterSettingLCT").style.display = "none";
        }

        // Comments
        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_comments").checked) {
            document.getElementById("commentsTitle").style.display = "block";
            document.getElementById("commentsIMG").style.display = "block";
        } else {
            document.getElementById("commentsTitle").style.display = "none";
            document.getElementById("commentsIMG").style.display = "none";
        }

        // Load Preview
        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_loadPreview").checked) {
            document.getElementById("loadPreviewTitle").style.display = "block";
            document.getElementById("loadPreviewIMG").style.display = "block";
        } else {
            document.getElementById("loadPreviewTitle").style.display = "none";
            document.getElementById("loadPreviewIMG").style.display = "none";
        }

        // Plate
        if (document.getElementById("chk_plateEdit").checked) {
            document.getElementById("plateEditTitleH1").style.display = "block";
        } else {
            document.getElementById("plateEditTitleH1").style.display = "none";
        }

        // Plate Edit
        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_plateLayout").checked) {
            document.getElementById("plateEditTitleH2").style.display = "block";
            document.getElementById("plateEditTable").style.display = "block";
        } else {
            document.getElementById("plateEditTitleH2").style.display = "none";
            document.getElementById("plateEditTable").style.display = "none";
        }

        // Task 信息
        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_task").checked) {
            document.getElementById("plateEditTaskTitle").style.display = "block";
            document.getElementById("plateEditTaskText").style.display = "block";
        } else {
            document.getElementById("plateEditTaskTitle").style.display = "none";
            document.getElementById("plateEditTaskText").style.display = "none";
        }

        // Target 信息
        if (document.getElementById("plateEditTaskTitle").checked && document.getElementById("chk_target").checked) {
            document.getElementById("plateEditTargetTitle").style.display = "block";
            document.getElementById("plateEditTargetTable").style.display = "block";
        } else {
            document.getElementById("plateEditTargetTitle").style.display = "none";
            document.getElementById("plateEditTargetTable").style.display = "none";
        }

        // Split Plate
        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_splitPlate").checked) {
            document.getElementById("plateEditSplitPlateTitle").style.display = "block";
            document.getElementById("plateEditSplitPlateText").style.display = "block";
        } else {
            document.getElementById("plateEditSplitPlateTitle").style.display = "none";
            document.getElementById("plateEditSplitPlateText").style.display = "none";
        }

        //Sample 信息
        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_sample").checked) {
            document.getElementById("plateEditSampleTitle").style.display = "block";
            document.getElementById("plateEditSampleTable").style.display = "block";
        } else {
            document.getElementById("plateEditSampleTitle").style.display = "none";
            document.getElementById("plateEditSampleTable").style.display = "none";
        }

        //Standard 信息
        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_standard").checked) {
            document.getElementById("plateEditStandardTitle").style.display = "block";
            document.getElementById("plateEditStandardSt").style.display = "block";
            document.getElementById("plateEditStandardSA").style.display = "block";
            document.getElementById("plateEditStandardSN").style.display = "block";
            document.getElementById("plateEditStandardF").style.display = "block";
            document.getElementById("plateEditStandardDF").style.display = "block";
            document.getElementById("plateEditStandardUnit").style.display = "block";
            document.getElementById("plateEditStandardR").style.display = "block";
            document.getElementById("plateEditStandardID").style.display = "block";
            document.getElementById("plateEditStandardA").style.display = "block";
        } else {
            document.getElementById("plateEditStandardTitle").style.display = "none";
            document.getElementById("plateEditStandardSt").style.display = "none";
            document.getElementById("plateEditStandardSA").style.display = "none";
            document.getElementById("plateEditStandardSN").style.display = "none";
            document.getElementById("plateEditStandardF").style.display = "none";
            document.getElementById("plateEditStandardDF").style.display = "none";
            document.getElementById("plateEditStandardUnit").style.display = "none";
            document.getElementById("plateEditStandardR").style.display = "none";
            document.getElementById("plateEditStandardID").style.display = "none";
            document.getElementById("plateEditStandardA").style.display = "none";
        }

        // Protocol
        if (document.getElementById("chk_protocolEdit").checked) {
            document.getElementById("protocolEditTitle").style.display = "block";
        } else {
            document.getElementById("protocolEditTitle").style.display = "none";
        }

        if (document.getElementById("chk_protocolEdit").checked && document.getElementById("chk_protocol").checked) {
            document.getElementById("protocolTitle").style.display = "block";
            document.getElementById("protocolText").style.display = "block";
        } else {
            document.getElementById("protocolTitle").style.display = "none";
            document.getElementById("protocolText").style.display = "none";
        }

        // Run
        if (document.getElementById("chk_run").checked) {
            document.getElementById("runTitle").style.display = "block";
        } else {
            document.getElementById("runTitle").style.display = "none";
        }

        if (document.getElementById("chk_run").checked && document.getElementById("chk_runTime").checked) {
            document.getElementById("runTime").style.display = "block";
            document.getElementById("runTimeText").style.display = "block";
        } else {
            document.getElementById("runTime").style.display = "none";
            document.getElementById("runTimeText").style.display = "none";
        }

        if (document.getElementById("chk_run").checked && document.getElementById("chk_temperatureCurve").checked) {
            document.getElementById("runTemperatureCurveTitle").style.display = "block";
            document.getElementById("runTemperatureCurveIMG").style.display = "block";
        } else {
            document.getElementById("runTemperatureCurveTitle").style.display = "none";
            document.getElementById("runTemperatureCurveIMG").style.display = "none";
        }

        // Quantification
        if (document.getElementById("chk_analysis").checked) {
            document.getElementById("analysisTitle").style.display = "block";
        } else {
            document.getElementById("analysisTitle").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_quantification").checked) {
            document.getElementById("analysisQuantification").style.display = "block";
            document.getElementById("analysisCurveCq").style.display = "block";
            document.getElementById("analysisCurveCqIMG").style.display = "block";
            document.getElementById("analysisCurveClog").style.display = "block";
            document.getElementById("analysisCurveClogIMG").style.display = "block";
        } else {
            document.getElementById("analysisQuantification").style.display = "none";
            document.getElementById("analysisCurveCq").style.display = "none";
            document.getElementById("analysisCurveCqIMG").style.display = "none";
            document.getElementById("analysisCurveClog").style.display = "none";
            document.getElementById("analysisCurveClogIMG").style.display = "none";
        }

        // 标准曲线
        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_standardCurve").checked) {
            document.getElementById("analysisStandardCurveTitle").style.display = "block";
            document.getElementById("analysisStandardCurveIMG").style.display = "block";
        } else {
            document.getElementById("analysisStandardCurveTitle").style.display = "none";
            document.getElementById("analysisStandardCurveIMG").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_quantificationData").checked) {
            document.getElementById("analysisQDTitle").style.display = "block";
            document.getElementById("analysisQDTable").style.display = "block";
        } else {
            document.getElementById("analysisQDTitle").style.display = "none";
            document.getElementById("analysisQDTable").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_meltCurve").checked) {
            document.getElementById("analysisMeltCurve").style.display = "block";
            document.getElementById("analysisPreCurve").style.display = "block";
            document.getElementById("analysisPreCurveIMG").style.display = "block";
            document.getElementById("analysisMeltPeak").style.display = "block";
            document.getElementById("analysisMeltPeakIMG").style.display = "block";
        } else {
            document.getElementById("analysisMeltCurve").style.display = "none";
            document.getElementById("analysisPreCurve").style.display = "none";
            document.getElementById("analysisPreCurveIMG").style.display = "none";
            document.getElementById("analysisMeltPeak").style.display = "none";
            document.getElementById("analysisMeltPeakIMG").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_meltData").checked) {
            document.getElementById("analysisMeltDataTitle").style.display = "block";
            document.getElementById("analysisMeltDataTable").style.display = "block";
        } else {
            document.getElementById("analysisMeltDataTitle").style.display = "none";
            document.getElementById("analysisMeltDataTable").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_geneExpression").checked) {
            document.getElementById("analysisGeneExpressionTitle").style.display = "block";
            document.getElementById("analysisGeneExpressionBar").style.display = "block";
            document.getElementById("analysisGeneExpressionBarIMG").style.display = "block";
            document.getElementById("analysisGeneExpressionMode").style.display = "block";
            document.getElementById("analysisGeneExpressionData").style.display = "block";
            document.getElementById("analysisGeneExpressionDataTable").style.display = "block";
        } else {
            document.getElementById("analysisGeneExpressionTitle").style.display = "none";
            document.getElementById("analysisGeneExpressionBar").style.display = "none";
            document.getElementById("analysisGeneExpressionBarIMG").style.display = "none";
            document.getElementById("analysisGeneExpressionMode").style.display = "none";
            document.getElementById("analysisGeneExpressionData").style.display = "none";
            document.getElementById("analysisGeneExpressionDataTable").style.display = "none";
        }

    }

    // 给DIV插入内容
    function insertText() {
        // Header
        document.getElementById("title").innerHTML = data.header.tittle;
        document.getElementById("subTitle").innerHTML = data.header.subTittle;
        document.getElementById("head").src = data.header.imgLogo;

        // Experiment
        // Information
        document.getElementById("Information_Name").innerHTML = data.experiment.information.name;
        document.getElementById("Information_Barcode").innerHTML = data.experiment.information.barcode;
        document.getElementById("Information_UserName").innerHTML = data.experiment.information.userName;
        document.getElementById("Information_InsName").innerHTML = data.experiment.information.instrumentName;
        document.getElementById("Information_BlockType").innerHTML = data.experiment.information.blockType;
        // ExperimentSetting
        document.getElementById("ES_ET").innerHTML = data.experiment.experimentSetting.experimentType;
        document.getElementById("ES_Chemistry").innerHTML = data.experiment.experimentSetting.chemistry;
        document.getElementById("ES_RunMode").innerHTML = data.experiment.experimentSetting.runMode;
        // ParameterSetting
        document.getElementById("PS_RV").innerHTML = data.experiment.parameterSetting.reactionVolume;
        document.getElementById("PS_LHS").innerHTML = data.experiment.parameterSetting.lidHeatingSwitch;
        document.getElementById("PS_CT").innerHTML = data.experiment.parameterSetting.coverTemp;
        document.getElementById("PS_LCT").innerHTML = data.experiment.parameterSetting.lidCloseTemp;
        // Comments
        document.getElementById("commentsIMG").src = data.experiment.imgLoadPreviewPlate;
        // LoadPreview
        document.getElementById("loadPreviewIMG").src = data.experiment.imgLoadPreviewProtocol;

        // Plate edit
        // Plate Edit
        // 创建内容
        for (let i = 0; i < data.plate.plateLayout.length; i++) {
            //创建行tr
            let tr = document.createElement('tr');
            //将新创建的行tr添加给table
            $('#plateEditTable').append(tr);
            for (let k in data.plate.plateLayout[i]) {
                // 创建th元素
                let th = document.createElement('th');
                // 将每个对象中的属性值传给td
                th.innerHTML = data.plate.plateLayout[i][k];
                //给tr添加th子元素
                tr.appendChild(th);
            }
        }

        // Task
        document.getElementById("plateEditTaskText").innerHTML = data.plate.task;

        // Target
        // 创建标题
        let targetHead_tr = document.createElement('tr');
        $("#plateEditTargetTable").append(targetHead_tr);
        for (let k in data.plate.target[0]) {
            // 创建th元素
            let th = document.createElement('th');
            // 将每个对象中的属性值传给th
            th.innerHTML = data.plate.target[0][k];
            //给tr添加th子元素
            targetHead_tr.appendChild(th);
        }
        // 创建内容
        for (let i = 1; i < data.plate.target.length; i++) {
            //创建行tr
            let tr = document.createElement('tr');
            //将新创建的行tr添加给tbody
            $('#plateEditTargetTable').append(tr);
            // 3、内层for循环，创建每一行中的所有单元格td，单元格td的数量与对象中的属性多少有关，故用for...in...
            for (let k in data.plate.target[i]) {
                // 创建td元素
                let td = document.createElement('td');
                // 将每个对象中的属性值传给td
                td.innerHTML = data.plate.target[i][k];
                //给tr添加td子元素
                tr.appendChild(td);
            }
        }

        // Split Plate
        document.getElementById("plateEditSplitPlateText").innerHTML = data.plate.splitPlate;

        // Sample
        let sampleHead_tr = document.createElement('tr');
        $('#plateEditSampleTable').append(sampleHead_tr);
        for (let k in data.plate.sample[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.plate.sample[0][k];
            sampleHead_tr.appendChild(th);
        }
        for (let i = 1; i < data.plate.sample.length; i++) {
            let tr = document.createElement('tr');
            $('#plateEditSampleTable').append(tr);
            for (let k in data.plate.sample[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.plate.sample[i][k];
                tr.appendChild(td);
            }
        }

        // Standard
        document.getElementById("standard_ST").innerHTML = data.plate.standard.selectTarget;
        document.getElementById("standard_SA").innerHTML = data.plate.standard.standardAmount;
        document.getElementById("standard_SN").innerHTML = data.plate.standard.standardNumber;
        document.getElementById("standard_F").innerHTML = data.plate.standard.factor;
        document.getElementById("standard_DF").innerHTML = data.plate.standard.dilutionFactor;
        document.getElementById("standard_Unit").innerHTML = data.plate.standard.unit;
        document.getElementById("standard_R").innerHTML = data.plate.standard.replicates;
        document.getElementById("standard_ID").innerHTML = data.plate.standard.increasing_decreasing;
        document.getElementById("standard_Assignment").innerHTML = data.plate.standard.assignment;

        // Protocol Edit
        // Protocol
        document.getElementById("protocolText").innerHTML = data.protocol.protocol;

        // Run
        // Run Time
        document.getElementById("runTimeText").innerHTML = data.run.runTime;
        document.getElementById("runTemperatureCurveIMG").src = data.run.imgTemperatureCurve;

        // Analysis
        // Quantification
        document.getElementById("analysisCurveCqIMG").src = data.analysis.imgAmplificationCurve_cq;
        document.getElementById("analysisCurveClogIMG").src = data.analysis.imgAmplificationCurve_log;

        // 标准曲线
        document.getElementById("analysisStandardCurveIMG").src = data.analysis.imgStandardCurve;

        // Quantification Data
        let QD_tr = document.createElement('tr');
        $('#analysisQDTable').append(QD_tr);
        for (let k in data.analysis.quantificationData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.quantificationData[0][k];
            QD_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.quantificationData.length; i++) {
            let tr = document.createElement('tr');
            $('#analysisQDTable').append(tr);
            for (let k in data.analysis.quantificationData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.quantificationData[i][k];
                tr.appendChild(td);
            }
        }

        // Melt Curve
        document.getElementById("analysisPreCurveIMG").src = data.analysis.imgMeltCurve;
        document.getElementById("analysisMeltPeakIMG").src = data.analysis.imgMeltPeak;

        // Melt Data
        let MT_tr = document.createElement('tr');
        $('#analysisMeltDataTable').append(MT_tr);
        for (let k in data.analysis.meltData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.meltData[0][k];
            MT_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.meltData.length; i++) {
            let tr = document.createElement('tr');
            $('#analysisMeltDataTable').append(tr);
            for (let k in data.analysis.meltData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.meltData[i][k];
                tr.appendChild(td);
            }
        }

        // Gene expression
        document.getElementById("analysisGeneExpressionBarIMG").src = data.analysis.imgGeneExpressionBar;
        document.getElementById("geneExpressionMode").innerHTML = data.analysis.geneExpressionMode;
        let GE_tr = document.createElement('tr');
        $('#analysisGeneExpressionDataTable').append(GE_tr);
        for (let k in data.analysis.geneExpressionData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.geneExpressionData[0][k];
            GE_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.geneExpressionData.length; i++) {
            let tr = document.createElement('tr');
            $('#analysisGeneExpressionDataTable').append(tr);
            for (let k in data.analysis.geneExpressionData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.geneExpressionData[i][k];
                tr.appendChild(td);
            }
        }
    }

});
var updateReport;
$(() => {
    // 后台接收数据对象
    const data = {
        hasLogo: true,
        hasHeader: true,
        header: {
            headerAlign: "center",
            hasTittle: true,
            tittle: "",
            hasSubTittle: true,
            subTittle: "",
            hasLogo: false,
            imgLogo: ""
        },
        hasExperiment: true,
        experiment: {
            hasInformation: true,
            information: {
                name: "",
                barcode: "",
                userName: "",
                instrumentName: "",
                blockType: ""
            },
            hasExperimentSetting: true,
            experimentSetting: {
                experimentType: "",
                chemistry: "",
                runMode: ""
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
            plateLayout: [],
            hasTask: true,
            task: "",
            hasTarget: true,
            target: [],
            hasSplitPlate: true,
            splitPlate: "",
            hasSample: true,
            sample: [],
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
            quantificationData: [],
            hasMelt: true,
            imgMeltCurve: "",
            imgMeltPeak: "",
            hasMeltData: true,
            meltData: [],
            hasGeneExpression: true,
            imgGeneExpressionBar: "",
            geneExpressionMode: "",
            geneExpressionData: []
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
        let now = new Date();
        let myDate = document.getElementById("myDate");
        myDate.value = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
    }

    // 上传图片
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
            path = fileReader.result;

            updateReport(obj = {
                header: {
                    hasLogo: true,
                    imgLogo: path.split(",")[1]
                }
            });
        };
        fileReader.readAsDataURL(file);

    });


    // 清除图片
    $(".clearLogo").on("click", function () {
        let blank_preview = document.getElementById("preview");
        blank_preview.src = "";

        // 更新数据
        updateReport(obj = {
            header: {
                hasLogo: false,
                imgLogo: ""
            }
        });
    });

    // 绑定checkbox
    let flag_experiment = 1;
    $("#chk_experiment").on("click", function () {
        if (flag_experiment % 2 === 0) {
            flag_experiment++;
            updateReport(obj = {
                hasExperiment: true
            });
        } else {
            flag_experiment++;
            updateReport(obj = {
                hasExperiment: false
            });
        }
    });

    let flag_information = 1;
    $("#chk_information").on("click", function () {
        if (flag_information % 2 === 0) {
            flag_information++;
            updateReport(obj = {
                experiment: {
                    hasInformation: true
                }
            });
        } else {
            flag_information++;
            updateReport(obj = {
                experiment: {
                    hasInformation: false
                }
            });
        }
    });

    let flag_experimentSetting = 1;
    $("#chk_experimentSetting").on("click", function () {

        if (flag_experimentSetting % 2 === 0) {
            flag_experimentSetting++;
            updateReport(obj = {
                experiment: {
                    hasExperimentSetting: true
                }
            });
        } else {
            flag_experimentSetting++;
            updateReport(obj = {
                experiment: {
                    hasExperimentSetting: false
                }
            });
        }
    });

    let flag_parameterSetting = 1;
    $("#chk_parameterSetting").on("click", function () {

        if (flag_parameterSetting % 2 === 0) {
            flag_parameterSetting++;
            updateReport(obj = {
                experiment: {
                    hasParameterSetting: true
                }
            });
        } else {
            flag_parameterSetting++;
            updateReport(obj = {
                experiment: {
                    hasParameterSetting: false
                }
            });
        }
    });

    let flag_comments=1;
    $("#chk_comments").on("click", function () {

        if (flag_comments % 2 === 0) {
            flag_comments++;
            updateReport(obj = {
                experiment: {
                    hasComments: true
                }
            });
        } else {
            flag_comments++;
            updateReport(obj = {
                experiment: {
                    hasComments: false
                }
            });
        }
    });

    let flag_loadPreview=1;
    $("#chk_loadPreview").on("click", function () {

        if (flag_loadPreview % 2 === 0) {
            flag_loadPreview++;
            updateReport(obj = {
                experiment: {
                    hasLoadPreview: true
                }
            });
        } else {
            flag_loadPreview++;
            updateReport(obj = {
                experiment: {
                    hasLoadPreview: false
                }
            });
        }
    });

    let flag_plateEdit=1;
    $("#chk_plateEdit").on("click", function () {

        if (flag_plateEdit % 2 === 0) {
            flag_plateEdit++;
            updateReport(obj = {
                hasPlate: true
            });
        } else {
            flag_plateEdit++;
            updateReport(obj = {
                hasPlate: false
            });
        }
    });

    $("#chk_plateLayout").on("click", function () {
        updateReport(obj = {
            plate: {
                hasPlateLayout: true
            }
        });
    });

    $("#chk_task").on("click", function () {
        updateReport(obj = {
            plate: {
                hasTask: true
            }
        });
    });

    $("#chk_target").on("click", function () {
        updateReport(obj = {
            plate: {
                hasTarget: true
            }
        });
    });

    $("#chk_splitPlate").on("click", function () {
        updateReport(obj = {
            plate: {
                hasSplitPlate: true
            }
        });
    });

    let flag_sample=1;
    $("#chk_sample").on("click", function () {

        if (flag_sample % 2 === 0) {
            flag_sample++;
            updateReport(obj = {
                plate: {
                    hasSample: true
                }
            });
        } else {
            flag_sample++;
            updateReport(obj = {
                plate: {
                    hasSample: false
                }
            });
        }
    });

    $("#chk_standard").on("click", function () {
        updateReport(obj = {
            plate: {
                hasStandard: true
            }
        });
    });

    let flag_protocolEdit=1;
    $("#chk_protocolEdit").on("click", function () {
        if (flag_protocolEdit % 2 === 0) {
            flag_protocolEdit++;
            updateReport(obj = {
                hasProtocol: true
            });
        } else {
            flag_protocolEdit++;
            updateReport(obj = {
                hasProtocol: false
            });
        }
    });

    $("#chk_protocol").on("click", function () {
        updateReport(obj = {
            protocol: {
                hasProtocol: true
            }
        });
    });

    let flag_run=1;
    $("#chk_run").on("click", function () {

        if (flag_run % 2 === 0) {
            flag_run++;
            updateReport(obj = {
                hasRun: true
            });
        } else {
            flag_run++;
            updateReport(obj = {
                hasRun: false
            });
        }
    });

    $("#chk_runTime").on("click", function () {
        updateReport(obj = {
            run: {
                hasRunTime: true
            }
        });
    });

    let flag_temperatureCurve=1;
    $("#chk_temperatureCurve").on("click", function () {

        if (flag_temperatureCurve % 2 === 0) {
            flag_temperatureCurve++;
            updateReport(obj = {
                run: {
                    hasTemperatureCurve: true
                }
            });
        } else {
            flag_temperatureCurve++;
            updateReport(obj = {
                run: {
                    hasTemperatureCurve: false
                }
            });
        }
    });

    $("#chk_analysis").on("click", function () {
        updateReport(obj = {
            hasAnalysis: true
        });
    });

    $("#chk_quantification").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasQuantification: true
            }
        });
    });

    $("#chk_standardCurve").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasStandardCurve: true
            }
        });
    });

    $("#chk_quantificationData").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasQuantificationData: true
            }
        });
    });

    $("#chk_meltCurve").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasMelt: true
            }
        });
    });

    $("#chk_meltData").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasMeltData: true
            }
        });
    });

    $("#chk_geneExpression").on("click", function () {
        updateReport(obj = {
            analysis: {
                hasGeneExpression: true
            }
        });
    });

    /*let flag_qc=1;
    $("#chk_qc").on("click", function () {

        if (flag_qc % 2 === 0) {
            flag_qc++;
            updateReport(obj = {});
        } else {
            flag_qc++;
            updateReport(obj = {});
        }
    });*/

});
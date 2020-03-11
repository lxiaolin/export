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
                if (fromObject.hasOwnProperty(item) && fromObject.hasOwnProperty(item)) {
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
    function updateData() {
        let now = new Date();
        let myDate = document.getElementById("myDate")
        myDate.value = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
    }


    function updateReport1() {
        updateData();
        update(data, obj);
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
        };
        fileReader.readAsDataURL(file);
        updateReport1();
    });


    // 清除图片
    $(".clearLogo").on("click", function () {
        let blank_preview = document.getElementById("preview");
        blank_preview.src = ""
        updateReport1();
    });

});
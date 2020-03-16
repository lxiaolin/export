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
            hasLogo: true,
            imgLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAAA+CAYAAAHsau+8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAABJpSURBVHhe7V3NymZHEZ5EjZOJIF6Bl5BLEHHGhZsQcKMLs3AtA250IQQR3LiIyIzgai5BcAYEoyQguBIGREEUDeIk2+8StJ/qevpU16n+Oec97zffTN4Hivec7urq6qr+7z7fd+v2g0++fOvacO/Je/h54+HH/7vz4Nm7EnYOIANSyjSTQsIcemF3fvHfN+17ecCvPDMDk8kXHn7yFX3ch0r43cePokzuPPz4KvoF4FevhFW8BJRMlE7WPEKVyd3fxBnce/KBPt269bUnb+nTLSk9gLT8tbwrkNGDggDw2ExsmpzBkklL3tlRHHUkrNBSAYBGMb0SbLiptn3A5zcePPsIvwVWaMmEdlW725pWBGm6MBOniLRMCq4yQA3Dr4LaeS0pEL/M5Eu/+tcX8Vv1i2CoMrj3+B2NymCVvvvk1/K7B0ULZuJRMtFfVs+7T0TzCl99MujVowwAmi7/rus/S95K//qDj5dG9aKDXb+AZk9gfSj1YhJVulQZUbtX4UoIZ6UkyG9bRJIjdQ6dv09f4ANeefv9p5aZJG61FGDV1hMkrUF6v2+V7xXkzi+flcbk5RCFZ1XKpOTrP/u3PEvT9QWw5BBlZsOieOSvjwLy+AJGaVdTLTCRXv3Wh7HSIAv/roBwysL7nYfPZKoFS3tCOIBnSaNVCLDesKDsRPc1aIGJzAr4AjSUriA9TupdyMv2hu7Npsfz3felkxbce3IlhFHF5iV82h8z/OuP30yzgI+EGO4ByxUrNGZeXZiOQtLbd8BOQ4CogITPk+/R/MdOZ54L7j5+qk8XvDyI+nsCXW5p9DcZKwW1B7HdJojd5giJ975Np2HltxVnYeNSVyzjmkQk4NlQblflgdDewDELSRwpACbfwmdQ0hqIhzl/dnEAwyJZ+ijAVErGnlXGSUG8e6oKQHIQvgA+3L5HaRjm+OpuWlF4LDNG79s//ntVgM9978+HFQIe4MoEiNIwrErXkF0ABtKdn/9HFOS7MHjlSQ6F38GGe54oDcNsHJYUfn4FlEEazJag4Ge/+6cswCuOkZOjup1GKGzGQJGpzxJoUNagCjzTU54f73ZJYXnlxZJTupBMFAnMZ6KpQEKSwSm+TNhk8qeNsCJVqNWVg0cfC2D5iFdcxQiJDAog5OHD/JoWE7ytiPKZxbgQbgcA8ItuTuw4C2WhJEwngTIbFb7ayuCxv36SKLNlxwOdOLMFqkIAYLQ0AytQps+iyOKNPKXO4xJnuln+MpD6vGgIwm4qRHqVAgBkAg23ORR2ZgoloYAtmFUcqLYftZOIFItAvu5sGO5mIWbBKkDFaUUblmVmy1M20wHLb84/6AEFWQ5oe7u7kYgGkAueE6LDia3AeAWnnuW84tOGqoP18L21gjOfiJTlcMhUkBMX16Khj60MeB4Rt+Tscwtevq/EmBSJXo0dNOhL3ZON1rtoBAyYmNodrztlsIZvkbIuHT9pdgRVJFmPKNMXFGvnEpcLOawI5OMsFJD3QXft5YMf79jKxK9dLBESrzwaVEB5IA3KoOCmQjBiGkWtgBFVDvA0uYtXZA3QmtZ7tHgQdoIzlimWgchMafS1CS9XIIIhIGpmakTy9OjWN367Nn5EA6ALgLzZgy+2En1doegXAOF7nWG7KoJ5baHKcS6idFl4fu37T4sRLR9JFML80xp7RBNbzCo/3LzxSHyySNbXAo5tVWEdZvLx8ukMfa3gHbcZtv+NyBqSYaU2YQFh4qdpABa4Z0gg8ZQDSQ0SpHcZb6LaaxGltSjdoOmSes4ARjKJJh8jIloZctoBbuPBtqC7j9uzCgMYIdKJhJmNr41o0Z7Pk3VSei8ThYhWk4eBMwDo5eV4shOJCikyPPIGff5Hf3NGnqAe6MxT0FqavyyIHEFaGbtHM+D+SARuCN0EzJbnaKA5Ro4AlQ2kEW1Ba93BfU3rEHRr3IiyzsJkwB6mV3zpmd0h+b2OSAs9sJ7CNqaEmXwtP3jsuivvvC9rNNHZ6IJ3G59t6DbmOi08Gb46YEy0zHyy8DYdhVbLYLj/9aiclYwH3azjqatc+zDjGhyLOGsgWy48R8S88GwRHZGQJzsS6acOfmNQAUsTU9VNgDFFbvolYEyEAdbYqHmWj5MEPhMMI7LeSy1mqwAsr32Wsc5NSlq8QM8Z1M223l2AASA0yuxFwdEV6IKXBNHm1gXPAWlQntpmuODMwAxJH3ejdc3kgg1obfnOINq/0qgLtgKHHN3LjI3pVWef5yxdHY9xsd8E8tvo2FPing548T4ipuNzD+Cxe0Y+HcoNW0ZjLviynaH7s/fCvSeurPV1DT8/ThhttinbYejlx0LJs+7iSsEdX0BSwfiO5x7AQ/kA0yF/PoM0WuCvm3mqHMLdQ31dwzkCnvUCPZXauqwiScvSfxJFbupC7Vk0CkEHscDWUC1Qnr6e7AgJ1/HRtga7dWRbDmAdVLVsCQzOYQVYtJlvBCmgRzBQ6tLqjzUKudVpB0VedLqoSPHLGfjAEXScNRjT6msTXj7TRXlCvsZ1Kx710deBMthO0JpMvhHJvdvQCUoTME4froBZoMgoROlCXIXTPHY7Ql8rrAzcQSWXQsOap3s/5BnRaz/4S2x8S73dRwW6IsjT1y5MDWw6gvrpa0Er3MPL76WTuMnZaFVOCm0JhvFwtm35IuJ1+iG56zwRKFNfh5D8G45AK0C876uB2Xy8/F46xm0hJjT9bD2VFeXVgORpUWXsEQ1QZE4CvJEjRv31bD5efi+d8O5Z4PpBmNMq9qs0Hj/ErYhNcOsFgwEoX1+HAG/kiJGc2S5Q5ZQ1Uk+uxu3b3aXgiKwBqzg6QQ5ajJFnyJ4jBEjy5aCqN2MieMjvHcEpZK92cndAX0Nwim91wXsrXS/OI/HVDmPiiOzX3Pa7MEnIw5itdNA4wa4H5B0xk97cwmjWYHRrXk5PdqkAQQu1SDwcEpbdCw0IyX+Eh7Ay8JnwJmEdAvLhA5Qpp83PwBR4NX1ll2PXDC0wj8hwKTzfeGHrVzCNvq5AnZBegyogL8SDT4MyGBFRYzZUX0ZukQfPh6O4ANYZDZKC4pmGnLlrBAIvEcVbUraCVrhFim9eW1JaO2m0L1IZd5JomBV41LoBwU7vU1vbkRdnfPl5TJLQIMmsLlAknqvWGNWS4SFdp9sWQrpuS7XMnqyBpyityH1zriA844VdE4PB/oVG5ADS9G1wUkLUrxdI19bZd1IZTYzij8LzuCCBJhM5AdT8aj6kyY09e6XFA3JuAp6HI0aDXG3sDs2idw2TcuxCMbosBuQpNK/41HzLVnyenURb8TC2yND1EPWivEyLQ9o6ZR7G88qO7tcJ1Xeoss7RRz6RA4TQ31NYl+a3uZOi7ctVlGfHEbyzIHgGuI4Z8QHggeF8SySPlUn4FuHzgrGXvPJMkshHAe9V+ZU80jqK6XhhzoKrVE8SaWtdi45CSxbDl9+ryjCE5fPxVjaMwIHfhhNVS0jGiyYJS17rcc/LpDzvoAjeCWWqFS3KLB05k4G8CAz3vx4MhxPwbA0qXZAazKZHDc28y8ZnlU7iYsrxdesBGEdYHq6poopEYA6N+a++LrCZ1xTubu4GZEZguP/18OHsJgjEo+JE3QIMxH67dkQeS1rY6giAFWUz7MrY0tHIcmvn1gbKeeYLym0+9sP4tftb2THOWWpkezm4qsGB0bKczLPFEdQL8DzTQEJLR3ZJhMjVgpPs7ALvxNKlRHzLuGYB2X7jcZGxONYbNzt+yaseiOcdkY+gVc6GCU4F6WNViPXsi4Te1PmCa8RNc8SuI70LLniZgUbR2u294IJPJbBhjSWcvl5wwQUANpb8DbNp7F6VZMjlKnemaKi/O3bBBecCT+l4228TsGy3ByUT0MOo0W2HQuDXpBdccD0oZ0O9SxgtYL8t2vsKgEYnu+2u0s/Qi9AwtLE/mikjeGB3f8uGHZTyVHaVUdXI2EvI2+ZbxZ248dLTHyh1TUmDeZ0t7Ch7d1JQDlkXz9arVMen1tDO2NumLGWjuD2NguJJ7vTIEBEKreLWkCOfx49ka69sNqeGek17xUm/9t9KgxNS5SCFPInoKMuDZ8lAoZ1KkTVDSU5ld4SpuIIq/pobhVRqV6Gt3q3OkBdwV5Tsjem4NBRSkufzACGs+qrRwzJ3GSPkyhhWWm+EE2lpsDhWWxpAj1aOOQpR2RCm0UNIZ2HWU+I4OHV5P0l3f7e2tW6seDboHwE6L/mNG0XhndwB9aPlsGIHAL/Y2sgIlw62MKBN0xWeC5vjxKgHOIJeefv3c7fTLZ3hcMjb69TKZBtHkXlCo/CXuXsVx/I9j0bRmx5Z+LSbO2+HVafhG2YKXN1WR8XW6D7s8XZ6bvUGp9Dws+4RTXy8NIukTzVdmnXqCH5KsLdRpLRlygQ/jjo48gr/NTeK2V1Pb5tTGwThR57KVrpILJFCswtvdwEl/DZ1J93+6T/ryn0SnbZ9DOj6qOi3eyu7gVGl6gE+RCMw+jW/GrQw/NfeKKZHCSP3nLQqf5QxjDw1Ypgrgq+89btKxl7q/vPivXQifM9y1ChB2EoTVaoWvF5bGmuV7pobhQYPYdOck1Y6e4UttZzPbVb/1dFnvvPHUE6XdKfm9k/+Mfm9xi46qWfXrcOi8+wCcRZ2LRBVqgjeb1t1qtLe0EaBOmbSXd+hbjiFMgTFYHA0EF84/OECXwGxDrA8Daq+5pW5v5NzOJ0I5/jDrsh4+0eVysPqAqrmxJNw5ZlqiC1YXaIGtr9R1BsHe8q5G97IWyiqgL2GUW2D5Uv444/IjqDoM5YN8DtreJ7elGggWA90K6jXYXr9F8AvYvdOCX2Fj7Y59zYKwG1Xn2xzADYu+kSfcAHeQFuotUP06jf/UPN6B7Y+WToXHbBFC4ekstQHksmoWx0VylFqNQq/fmg6cwMgo5K5YYoSlSEaJYBTGgVQVeJMu6ZSfuRp2brAMm+haAplCY2mZI4dq8MaQ2NXCaNPK4+DPk/jmsrbQp133/eWWqHvo2Nw/HKApOmKDE1W4CtVokeQuZWixhvIzpQbzH2bXnnDxox4FbnCqY0CaNkceqJT91Mr4U/h1rYk2l1Z22gaZ4I2/72VE+jVb38410PKt46rxnHoVioqme99RiQOSbZWEQLrODxrsCBy6l7qVdwUfx+6+TQDejpTuY5oFBaQt1VX8CPdplFdh8NQ4Ii2/e2b3XR1+4d/fQe9rao8h/pqyLV8Q1L1rjM90g0FdLdludaF7kZAN6vrYXbf2uuRcHBnKt7xhPWA/mkB6LjZOZg2FVk7plBMv3exjhEql2PqYO2FAO6XoUwvO04ZLXBGIUY6moIF8q5egNdS9lTsUxtF/rMV776wf+0hwqelUQCpgvt/fzpFowX3Ljr6Uh8q5p4btK1GIRsHKW7P6BNBNgk2yjsyf0IacZLZa8RbGsWeclkwfU+fGR5gpmwR9i7uDr2icYZbroI9UxgYMeuFaRBv7OZ/BpQbGv7IHE/kr1Y7Y0zvG1W9GdCWh/QWSCf5QKamIT/z4C3m3heSvL/Gm85LOSEbZQVpPqqD5OXyA9kyr8qFP+hX0i3h0Q5isS9Hdskn2cOlRR75Y7eap/JP4iFmytZD3lXZtrrH4kZaX874NEIhzwX27luwGDRXgh7oTDsiMb1Nmx2Isvb33EN5mtb+xbEIvCkQNQw2LHuTmBXKVqYWyOtRyjrofHKDRKWsR27K9eFE1jv7osUD+HjKnSlbC7MNA6OKJslgD7Wf2gV9XlgcPXdotPRy+W8N+kbBzmOvPIC9pvSSKb6FzFf3mgDS+Yq7VNTsB+jdAiuZh00/otLzG/1zXH+EI09vCkQeYkvZRkgVP/7ssneSu2S+jQ78/uFQsFJjyJ1BGda1EfhGcao8iywrV4Co8gO5ASyjr1SKwWiMiioNTuSuOypf6YgW/yxaci1O5RmV7SxYnD5PkcNvCmx5RlOWZRRYKp1vFABH1JE89nCjSgxkHddOzlOOPFXJ+caNJ0KkO9CqdDwXmvEndBEyuvQqM3EUT6tsZwOH/DFddYfKm4ClUWABzGlLqlzocVJc7smXhZsfAZoVy9hI5v8qL/ObhWDKy6JMiZI84RU5mbfVyHLjynlF9raNr+iR5Oc0ax/1Kl3uGGiLxGfKJTprL41y+MZ5jkaxtWxnRW0cT1fDXvKmAI6DIa3xxNAwMJyslbOFKL0HbIVedkYeAJk2/5FjSw8+kAs5RQ/8ukpLiL4DWYC3kzw3ZAIzcvfyzJbtWlCUSQRlL7heoCJKR5R+L7jgUw/0ljJCpN7xggZu3fo/1DNsinzT8f0AAAAASUVORK5CYII="
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
                ],
                [
                    "",
                    "sample",
                    true,
                    "A3",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A4",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A5",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A6",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A7",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A8",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "A9",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B1",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B2",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B3",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B4",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B5",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B6",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B7",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B8",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "B9",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C1",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C2",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C3",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C4",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C5",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C6",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C7",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C8",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "C9",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "D1",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "D2",
                    ""
                ],
                [
                    "",
                    "sample",
                    true,
                    "D3",
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
        // adjust();
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
        let myDate = document.getElementById("myDate");
        myDate.value = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
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
        let blank_preview = document.getElementById("preview");
        blank_preview.src = "";

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
        let heightSum = 0;
        for (let i = 0; i < 75; i++) {
            heightSum += document.getElementById("show" + i).offsetHeight;
            if (heightSum > 700) {
                let div = document.createElement("div");
                for (let j = i; j < 75; j++) {
                    heightSum += document.getElementById("show" + j).offsetHeight;
                    div.append(document.getElementById("show" + j));
                }
                $("#wordText").append(div);
                heightSum = 0;
            }
        }
        // alert("heightSum=" + heightSum);
    }


    // 判断是否显示DIV
    function showDiv() {
        // Header
        if (data.header.hasTittle) {
            document.getElementById("show1").style.display = "block";
        } else {
            document.getElementById("show1").style.display = "none";
        }

        if (data.header.hasSubTittle) {
            document.getElementById("show2").style.display = "block";
        } else {
            document.getElementById("show2").style.display = "none";
        }

        if (data.header.hasLogo) {
            document.getElementById("show0").style.display = "block";
        } else {
            document.getElementById("show0").style.display = "none";
        }

        // Experiment
        if (document.getElementById("chk_experiment").checked) {
            document.getElementById("show3").style.display = "block";
        } else {
            document.getElementById("show3").style.display = "none";
        }

        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_information").checked) {
            document.getElementById("show4").style.display = "block";
            document.getElementById("show5").style.display = "block";
            document.getElementById("show6").style.display = "block";
            document.getElementById("show7").style.display = "block";
            document.getElementById("show8").style.display = "block";
            document.getElementById("show9").style.display = "block";
        } else {
            document.getElementById("show4").style.display = "none";
            document.getElementById("show5").style.display = "none";
            document.getElementById("show6").style.display = "none";
            document.getElementById("show7").style.display = "none";
            document.getElementById("show8").style.display = "none";
            document.getElementById("show9").style.display = "none";
        }

        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_experimentSetting").checked) {
            document.getElementById("show10").style.display = "block";
            document.getElementById("show11").style.display = "block";
            document.getElementById("show12").style.display = "block";
            document.getElementById("show13").style.display = "block";
        } else {
            document.getElementById("show10").style.display = "none";
            document.getElementById("show11").style.display = "none";
            document.getElementById("show12").style.display = "none";
            document.getElementById("show13").style.display = "none";
        }

        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_parameterSetting").checked) {
            document.getElementById("show14").style.display = "block";
            document.getElementById("show15").style.display = "block";
            document.getElementById("show16").style.display = "block";
            document.getElementById("show17").style.display = "block";
            document.getElementById("show18").style.display = "block";
        } else {
            document.getElementById("show14").style.display = "none";
            document.getElementById("show15").style.display = "none";
            document.getElementById("show16").style.display = "none";
            document.getElementById("show17").style.display = "none";
            document.getElementById("show18").style.display = "none";
        }

        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_comments").checked) {
            document.getElementById("show19").style.display = "block";
            document.getElementById("show20").style.display = "block";
        } else {
            document.getElementById("show19").style.display = "none";
            document.getElementById("show20").style.display = "none";
        }

        if (document.getElementById("chk_experiment").checked && document.getElementById("chk_loadPreview").checked) {
            document.getElementById("show21").style.display = "block";
            document.getElementById("show22").style.display = "block";
        } else {
            document.getElementById("show21").style.display = "none";
            document.getElementById("show22").style.display = "none";
        }

        // Plate
        if (document.getElementById("chk_plateEdit").checked) {
            document.getElementById("show23").style.display = "block";
        } else {
            document.getElementById("show23").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_plateLayout").checked) {
            document.getElementById("show24").style.display = "block";
            document.getElementById("show25").style.display = "block";
        } else {
            document.getElementById("show24").style.display = "none";
            document.getElementById("show25").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_task").checked) {
            document.getElementById("show26").style.display = "block";
            document.getElementById("show27").style.display = "block";
        } else {
            document.getElementById("show26").style.display = "none";
            document.getElementById("show27").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_target").checked) {
            document.getElementById("show28").style.display = "block";
            document.getElementById("show29").style.display = "block";
        } else {
            document.getElementById("show28").style.display = "none";
            document.getElementById("show29").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_splitPlate").checked) {
            document.getElementById("show30").style.display = "block";
            document.getElementById("show31").style.display = "block";
        } else {
            document.getElementById("show30").style.display = "none";
            document.getElementById("show31").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_sample").checked) {
            document.getElementById("show32").style.display = "block";
            document.getElementById("show33").style.display = "block";
        } else {
            document.getElementById("show32").style.display = "none";
            document.getElementById("show33").style.display = "none";
        }

        if (document.getElementById("chk_plateEdit").checked && document.getElementById("chk_standard").checked) {
            document.getElementById("show34").style.display = "block";
            document.getElementById("show35").style.display = "block";
            document.getElementById("show36").style.display = "block";
            document.getElementById("show37").style.display = "block";
            document.getElementById("show38").style.display = "block";
            document.getElementById("show39").style.display = "block";
            document.getElementById("show40").style.display = "block";
            document.getElementById("show41").style.display = "block";
            document.getElementById("show42").style.display = "block";
            document.getElementById("show43").style.display = "block";
        } else {
            document.getElementById("show34").style.display = "none";
            document.getElementById("show35").style.display = "none";
            document.getElementById("show36").style.display = "none";
            document.getElementById("show37").style.display = "none";
            document.getElementById("show38").style.display = "none";
            document.getElementById("show39").style.display = "none";
            document.getElementById("show40").style.display = "none";
            document.getElementById("show41").style.display = "none";
            document.getElementById("show42").style.display = "none";
            document.getElementById("show43").style.display = "none";
        }

        // Protocol
        if (document.getElementById("chk_protocolEdit").checked) {
            document.getElementById("show44").style.display = "block";
        } else {
            document.getElementById("show44").style.display = "none";
        }

        if (document.getElementById("chk_protocolEdit").checked && document.getElementById("chk_protocol").checked) {
            document.getElementById("show45").style.display = "block";
            document.getElementById("show46").style.display = "block";
        } else {
            document.getElementById("show45").style.display = "none";
            document.getElementById("show46").style.display = "none";
        }

        // Run
        if (document.getElementById("chk_run").checked) {
            document.getElementById("show47").style.display = "block";
        } else {
            document.getElementById("show47").style.display = "none";
        }

        if (document.getElementById("chk_run").checked && document.getElementById("chk_runTime").checked) {
            document.getElementById("show48").style.display = "block";
            document.getElementById("show49").style.display = "block";
        } else {
            document.getElementById("show48").style.display = "none";
            document.getElementById("show49").style.display = "none";
        }

        if (document.getElementById("chk_run").checked && document.getElementById("chk_temperatureCurve").checked) {
            document.getElementById("show50").style.display = "block";
            document.getElementById("show51").style.display = "block";
        } else {
            document.getElementById("show50").style.display = "none";
            document.getElementById("show51").style.display = "none";
        }

        // Quantification
        if (document.getElementById("chk_analysis").checked) {
            document.getElementById("show52").style.display = "block";
        } else {
            document.getElementById("show52").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_quantification").checked) {
            document.getElementById("show53").style.display = "block";
            document.getElementById("show54").style.display = "block";
            document.getElementById("show55").style.display = "block";
            document.getElementById("show56").style.display = "block";
            document.getElementById("show57").style.display = "block";
        } else {
            document.getElementById("show53").style.display = "none";
            document.getElementById("show54").style.display = "none";
            document.getElementById("show55").style.display = "none";
            document.getElementById("show56").style.display = "none";
            document.getElementById("show57").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_standardCurve").checked) {
            document.getElementById("show58").style.display = "block";
            document.getElementById("show59").style.display = "block";
        } else {
            document.getElementById("show58").style.display = "none";
            document.getElementById("show59").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_quantificationData").checked) {
            document.getElementById("show60").style.display = "block";
            document.getElementById("show61").style.display = "block";
        } else {
            document.getElementById("show60").style.display = "none";
            document.getElementById("show61").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_meltCurve").checked) {
            document.getElementById("show62").style.display = "block";
            document.getElementById("show63").style.display = "block";
            document.getElementById("show64").style.display = "block";
            document.getElementById("show65").style.display = "block";
            document.getElementById("show66").style.display = "block";
        } else {
            document.getElementById("show62").style.display = "none";
            document.getElementById("show63").style.display = "none";
            document.getElementById("show64").style.display = "none";
            document.getElementById("show65").style.display = "none";
            document.getElementById("show66").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_meltData").checked) {
            document.getElementById("show67").style.display = "block";
            document.getElementById("show68").style.display = "block";
        } else {
            document.getElementById("show67").style.display = "none";
            document.getElementById("show68").style.display = "none";
        }

        if (document.getElementById("chk_analysis").checked && document.getElementById("chk_geneExpression").checked) {
            document.getElementById("show69").style.display = "block";
            document.getElementById("show70").style.display = "block";
            document.getElementById("show71").style.display = "block";
            document.getElementById("show72").style.display = "block";
            document.getElementById("show73").style.display = "block";
            document.getElementById("show74").style.display = "block";
        } else {
            document.getElementById("show69").style.display = "none";
            document.getElementById("show70").style.display = "none";
            document.getElementById("show71").style.display = "none";
            document.getElementById("show72").style.display = "none";
            document.getElementById("show73").style.display = "none";
            document.getElementById("show74").style.display = "none";
        }

    }

    // 给DIV插入内容
    function insertText() {
        // Header
        document.getElementById("show1").innerHTML = data.header.tittle;
        document.getElementById("show2").innerHTML = data.header.subTittle;
        document.getElementById("show0").src = data.header.imgLogo;

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
        document.getElementById("show20").src = data.experiment.imgLoadPreviewPlate;
        // LoadPreview
        document.getElementById("show22").src = data.experiment.imgLoadPreviewProtocol;

        // Plate edit
        // Plate Edit
        // 创建内容
        let trSum = 0;
        for (let i = 0; i < data.plate.plateLayout.length; i++) {
            //创建行tr
            let tr = document.createElement('tr');
            //将新创建的行tr添加给tbody
            document.querySelector('#plateBody').appendChild(tr);
            for (let k in data.plate.plateLayout[i]) {
                // 创建td元素
                let th = document.createElement('td');
                // 将每个对象中的属性值传给td
                th.innerHTML = data.plate.plateLayout[i][k];
                //给tr添加td子元素
                tr.appendChild(th);
            }
            // 3、内层for循环，创建每一行中的所有单元格td，单元格td的数量与对象中的属性多少有关，故用for...in...
        }

        // Task
        document.getElementById("show27").innerHTML = data.plate.task;

        // Target
        // 创建标题
        let targetHead_tr = document.createElement('tr');
        document.querySelector('#targetHead').appendChild(targetHead_tr);
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
            document.querySelector('#targetBody').appendChild(tr);
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
        document.getElementById("show31").innerHTML = data.plate.splitPlate;

        // Sample
        let sampleHead_tr = document.createElement('tr');
        document.querySelector('#sampleHead').appendChild(sampleHead_tr);
        for (let k in data.plate.sample[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.plate.sample[0][k];
            sampleHead_tr.appendChild(th);
        }
        for (let i = 1; i < data.plate.sample.length; i++) {
            let tr = document.createElement('tr');
            document.querySelector('#sampleBody').appendChild(tr);
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
        document.getElementById("show46").innerHTML = data.protocol.protocol;

        // Run
        // Run Time
        document.getElementById("show49").innerHTML = data.run.runTime;
        document.getElementById("show51").src = data.run.imgTemperatureCurve;

        // Analysis
        // Quantification
        document.getElementById("show55").src = data.analysis.imgAmplificationCurve_cq;
        document.getElementById("show57").src = data.analysis.imgAmplificationCurve_log;

        // 标准曲线
        document.getElementById("show59").src = data.analysis.imgStandardCurve;

        // Quantification Data
        let QD_tr = document.createElement('tr');
        document.querySelector('#QDHead').appendChild(QD_tr);
        for (let k in data.analysis.quantificationData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.quantificationData[0][k];
            QD_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.quantificationData.length; i++) {
            let tr = document.createElement('tr');
            document.querySelector('#QDBody').appendChild(tr);
            for (let k in data.analysis.quantificationData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.quantificationData[i][k];
                tr.appendChild(td);
            }
        }

        // Melt Curve
        document.getElementById("show64").src = data.analysis.imgMeltCurve;
        document.getElementById("show66").src = data.analysis.imgMeltPeak;

        // Melt Data
        let MT_tr = document.createElement('tr');
        document.querySelector('#MTHead').appendChild(MT_tr);
        for (let k in data.analysis.meltData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.meltData[0][k];
            MT_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.meltData.length; i++) {
            let tr = document.createElement('tr');
            document.querySelector('#MTBody').appendChild(tr);
            for (let k in data.analysis.meltData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.meltData[i][k];
                tr.appendChild(td);
            }
        }

        // Gene expression
        document.getElementById("show71").src = data.analysis.imgGeneExpressionBar;
        document.getElementById("geneExpressionMode").innerHTML = data.analysis.geneExpressionMode;
        let GE_tr = document.createElement('tr');
        document.querySelector('#GEHead').appendChild(GE_tr);
        for (let k in data.analysis.geneExpressionData[0]) {
            let th = document.createElement('th');
            th.innerHTML = data.analysis.geneExpressionData[0][k];
            GE_tr.appendChild(th);
        }
        for (let i = 1; i < data.analysis.geneExpressionData.length; i++) {
            let tr = document.createElement('tr');
            document.querySelector('#GEBody').appendChild(tr);
            for (let k in data.analysis.geneExpressionData[i]) {
                let td = document.createElement('td');
                td.innerHTML = data.analysis.geneExpressionData[i][k];
                tr.appendChild(td);
            }
        }
    }

});
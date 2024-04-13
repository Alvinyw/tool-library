<template>
    <div class="img-to-base64">
        <div class="sec-lt">
            <input id="imageUpload" type="file" accept="image/png, image/jpeg, image/gif, image/jpg, image/svg+xml"
                @change="onUploadChange" />
            <p class="lable">原图（支持png、jpeg、jpg、svg、gif）:</p>
            <div id="orignImage">
            </div>
        </div>
        <div class="sec-rt">
            <el-select v-model="currentValue" clear placeholder="请选择" style="margin: 0 15px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="readAsDataURL">开始转换</el-button>
            <p class="lable">{{ options[currentValue].label }}图片:</p>
            <div id="resultImage">
            </div>
            <div v-show="base64File">
                <el-button type="primary" size="mini" @click="handleCopy">点击拷贝</el-button>
                <textarea id="copyInput" style="position: fixed; right: -1000px; opacity: 0;"></textarea>
                <div class="base64-wrapper" @click="handleCopy">
                    {{ base64File }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import lib from './global-dom';

export default {
    name: "ImgFormatConvert",
    data() {
        return {
            imageFile: '',
            base64File: '',
            options: [{
                value: '0',
                label: 'base64'
            }, {
                value: '1',
                label: 'png'
            }, {
                value: '2',
                label: 'jpg'
            }, {
                value: '3',
                label: 'jpeg'
            }, {
                value: '4',
                label: 'svg'
            },
            {
                value: '5',
                label: 'gif'
            }],
            currentValue: '1'
        };
    },
    mounted() {
    },
    methods: {
        onUploadChange() {
            var file = document.getElementById("imageUpload").files[0];
            //判断获取的是否为图片文件
            if (!/image\/\w+/.test(file.type)) {
                this.$message({
                    message: '请确保导入文件为图片',
                    type: 'warning'
                });
                return false;
            }
            this.imageFile = file;
            const windowURL = window.URL || window.webkitURL;
            const dataURl = windowURL.createObjectURL(file);
            document.getElementById("orignImage").innerHTML = '<img style="max-width: 95%;" src="' + dataURl + '" alt="原图"/>'
        },
        readAsDataURL() {
            if (!this.imageFile) {
                this.$message({
                    message: '请先导入图片',
                    type: 'warning'
                });
                return false;
            }
            //判断浏览器是否支持filereader
            if (typeof FileReader == undefined) {
                this.$message({
                    message: '抱歉，你的浏览器版本较低，不支持 FileReader',
                    type: 'warning'
                });
                return false;
            }
            this.getBlobFromAnyImgData(this.imageFile, (blob) => {
                var a = '';
                if (blob instanceof Blob) {
                    a = URL.createObjectURL(blob);
                } else {
                    a = blob;
                }
                console.log('=======blob========', blob, a)
                this.formatConvert(a);
            });
            return;
            var reader = new FileReader();
            const sele = this;
            reader.readAsDataURL(this.imageFile);
            reader.onload = function () {
                sele.base64File = reader.result;
                document.getElementById("resultImage").innerHTML = '<img style="max-width: 95%;" src="' + sele.base64File + '" alt="base64"/>'
                sele.formatConvert();
            }
        },
        formatConvert(b, filename) {  
            var a = document.createElement('a');
            a.target = '_blank';
            var blob = b;

            if (!filename) {
                filename = (new Date()).getTime() + '.png';
            }
            a.download = filename;
            var objUrl = blob;
            a.href = objUrl;
            var ev = new MouseEvent('click', {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            a.dispatchEvent(ev);
            //a.click();
            setTimeout(function () {
                URL.revokeObjectURL(objUrl);
            }, 10000);
            return filename;
        },

        getBlobFromAnyImgData(imgData, callback) {
            if (imgData instanceof Blob) {
                callback(imgData);
            } else if (imgData instanceof HTMLCanvasElement) {
                lib.canvasToBlob(imgData, function (blob) {
                    callback(blob);
                });
            } else if (typeof imgData == "string" || imgData instanceof String) {
                var url = imgData;
                if ("data:" == url.substring(0, 5)) { // url is base64
                    var mimeType = "";
                    if ("image/" == url.substring(5, 11)) {
                        mimeType = url.substring(5, url.indexOf(";", 11));
                    }
                    var blob = lib.convertBase64ToBlob(url.substring(url.indexOf("base64,") + 7), mimeType);
                    callback(blob);
                } else { // url is link, such as 'https://....'
                    lib.convertURLToBlob(url, function (blob) {
                        callback(blob);
                    });
                }
            } else if (imgData instanceof HTMLImageElement) {
                var src;
                //src maybe access denied
                try {
                    src = imgData.src;
                } catch (ex) {
                    setTimeout(function () {
                        throw (ex);
                    }, 0);
                    callback(null, '');
                    return;
                }

                // url not available, maybe network problem
                // use imgData -> canvas -> blob instand 
                var tCvs = document.createElement('canvas');
                tCvs.width = imgData.naturalWidth;
                tCvs.height = imgData.naturalHeight;
                var ctx = tCvs.getContext('2d');
                ctx.drawImage(imgData, 0, 0);

                // use suffix guess image mime type
                var suffix = "";
                var questionPos = src.lastIndexOf("?");
                var dotPos = -1;
                if (-1 != questionPos) {
                    dotPos = src.lastIndexOf(".", questionPos);
                    if (-1 != dotPos && questionPos - dotPos <= 5) { //max supported type suffix is 4
                        suffix = src.substring(dotPos + 1, questionPos);
                    }
                } else {
                    dotPos = src.lastIndexOf(".");
                    if (-1 != dotPos) {
                        if (src.length - dotPos <= 5) { //max supported type suffix is 4
                            suffix = src.substring(dotPos + 1);
                        } else {
                            suffix = src.substring(dotPos + 1, dotPos + 5);
                        }
                    }
                }
                var saveFormat;
                if (-1 != suffix.indexOf("webp")) {
                    saveFormat = "image/webp";
                } else if (-1 != suffix.indexOf("png") || -1 != suffix.indexOf("gif") || -1 != suffix.indexOf("svg")) {
                    saveFormat = "image/png";
                } else { // like jpeg
                    saveFormat = "image/jpeg";
                }

                lib.canvasToBlob(tCvs, function (blob) {
                    callback(blob);
                }, saveFormat);

            } else {
                //not support
                callback(null);
            }

        },
        handleCopy() {
            var input = document.getElementById("copyInput");
            input.value = this.base64File;
            input.select();//选中文本
            document.execCommand("copy");
            this.$message({
                message: '已拷贝 base64 文本！',
                type: 'success'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.img-to-base64 {
    display: flex;
    justify-content: space-between;

    .lable {
        margin: 10px 0;
    }

    .sec-lt {
        width: 50%;
        min-height: 500px;
        border-right: 1px solid #ddd;

        #imageUpload {

            &::file-selector-button {
                display: inline-block;
                line-height: 1;
                cursor: pointer;
                border: 1px solid #409eff;
                color: #fff;
                background-color: #409eff;
                text-align: center;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                outline: 0;
                -webkit-transition: .1s;
                transition: .1s;
                font-weight: 500;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
            }
        }
    }

    .sec-rt {
        padding: 0 0 0 15px;
        width: 50%;

        .base64-wrapper {
            padding: 5px;
            margin: 10px 0 0;
            height: 120px;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            word-wrap: break-word;
            word-break: normal;
            overflow-y: scroll;
        }
    }
}
</style>
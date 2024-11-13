<template>
    <div class="img-to-base64">
        <el-alert style="margin: 0 0 15px;"
            title="使用说明：1、选择上传图片文件（支持png、jpeg、jpg、gif、bmp、tiff）；2、填入压缩比例（支持填入0 - 1）；3、压缩后预览效果；4、下载压缩后的图片。" type="info"
            show-icon close-text="知道了">
        </el-alert>
        <div class="main-ct">
            <div class="sec-lt">
                <input id="imageUpload" type="file" accept="image/png, image/jpeg, image/gif, image/jpg, image/tiff, image/bmp"
                    @change="onUploadChange" />
                <p class="lable">{{ imgOriginalInfo.type }}原图:</p>
                <div id="orignImage">
                </div>
            </div>
            <div class="sec-rt">
                <el-select v-model="currentValue" clear placeholder="请选择" style="margin: 0 15px 0 0;"
                    @change="convertImg">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="downloadImg">下载</el-button>
                <p class="lable">{{ options[currentValue].label }}图片:</p>
                <div id="resultImage">
                </div>
                <div v-show="Number(currentValue) == 0 && base64File">
                    <el-button type="primary" size="mini" @click="handleCopy">点击拷贝</el-button>
                    <textarea id="copyInput" style="position: fixed; right: -1000px; opacity: 0;"></textarea>
                    <div class="base64-wrapper" @click="handleCopy" title="点击可以拷贝">
                        {{ base64File }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "ImgFormatConvert",
    data() {
        return {
            imageFile: '',
            imgOriginalInfo: {
                width: 0,
                height: 0,
                type: '',
                src: '',
            },
            base64File: '',
            blobFile: '',
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
                label: 'pdf'
            },
            {
                value: '5',
                label: 'bmp'
            },
            {
                value: '6',
                label: 'tiff'
            },],
            currentValue: '0'
        };
    },
    mounted() {
    },
    methods: {
        // 上传图片
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
            this.imgOriginalInfo.src = windowURL.createObjectURL(file);
            document.getElementById("orignImage").innerHTML = '<img style="max-width: 95%;" src="' + this.imgOriginalInfo.src + '" alt="原图"/>';
            this.getImgOriginalInfo(file);
            this.convertImg();
        },
        // 获取图片原始信息
        getImgOriginalInfo(file = {}) {
            const { type = "image/png" } = file;
            this.imgOriginalInfo.type = type.substr(6).toUpperCase();
            let img = new Image();
            img.src = this.imgOriginalInfo.src;
            let _this = this; // onload 里面不能用this
            img.onload = function () {
                const { width = '', height = '' } = img;
                _this.imgOriginalInfo.width = width;
                _this.imgOriginalInfo.height = height;
            };
        },
        // 图片格式转换
        convertImg() {
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
            if (Number(this.currentValue) == 0) {
                var reader = new FileReader();
                const sele = this;
                reader.readAsDataURL(this.imageFile);
                reader.onload = function () {
                    sele.base64File = reader.result;
                    document.getElementById("resultImage").innerHTML = '<img style="max-width: 95%;" src="' + sele.base64File + '" alt="base64"/>'
                }
            } else {
                var _this = this;
                this.$lib.getBlobFromAnyImgData(_this.imageFile, (blob) => {
                    if (blob instanceof Blob) {
                        this.blobFile = URL.createObjectURL(blob);
                    } else {
                        this.blobFile = blob;
                    }
                    document.getElementById("resultImage").innerHTML = '<img style="max-width: 95%;" src="' + this.blobFile + '" alt="blob"/>'
                });
            }
        },
        // 图片下载
        downloadImg() {
            if (Number(this.currentValue) == 0) {
                return this.$lib.downloadBase64ToTxt(this.base64File)
            }
            if (Number(this.currentValue) == 4) {
                const { type = 'PNG' } = this.imgOriginalInfo;
                return this.$lib.downloadPdf([this.blobFile], type)
            }
            this.$lib.downloadImg(this.blobFile, this.options[this.currentValue].label)
        },
        // 复制 base64 文本
        handleCopy() {
            var input = document.getElementById("copyInput");
            input.value = this.base64File;
            input.select();//选中文本
            document.execCommand("copy");
            this.$message({
                message: '已拷贝 base64 文本！',
                type: 'success'
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.img-to-base64 {
    .main-ct {
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
}
</style>
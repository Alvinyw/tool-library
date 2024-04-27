<template>
    <div class="img-compress">
        <el-alert style="margin: 0 0 15px;" title="使用说明：1、选择上传图片文件（支持png、jpeg、jpg、gif、bmp、tiff）；2、填入压缩比例（支持填入0 - 1）；3、压缩后预览效果；4、下载压缩后的图片。" type="info" show-icon close-text="知道了">
        </el-alert>
        <div class="main-ct">
            <div class="sec-lt">
                <input id="imageUpload" type="file" accept="image/png, image/jpeg, image/gif, image/jpg, image/tiff, image/bmp"
                    @change="onUploadChange" />
                <p class="lable">原图大小： {{ $lib.calcBase64Size(base64File) }}M:</p>
                <div id="orignImage">
                    <img v-show="base64File" style="max-width: 95%;" :src="base64File" alt="原图" />
                </div>
            </div>
            <div class="sec-rt">
                压缩比例（0 - 1）：
                <el-input v-model="sizeValue" placeholder="请输入压缩比例"
                    style="width: 100px; margin: 0 15px 0 0;"></el-input>
                <el-button type="primary" @click="compressImg" :loading="isLoading">压缩</el-button>
                <el-button type="primary" @click="downloadImg" :disabled="isLoading">下载</el-button>
                <p class="lable">压缩后图片大小：{{ $lib.calcBase64Size(newBase64File) }}M</p>
                <div id="resultImage">
                    <img v-show="newBase64File" style="max-width: 95%;" :src="newBase64File" alt="原图" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "ImgCompress",
    data() {
        return {
            imageFile: '',
            base64File: '',
            newBase64File: '',
            sizeValue: '1',
            isLoading: false,
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
            // 转成 base64
            //判断浏览器是否支持filereader
            if (typeof FileReader == undefined) {
                this.$message({
                    message: '抱歉，你的浏览器版本较低，不支持 FileReader',
                    type: 'warning'
                });
                return false;
            }
            var reader = new FileReader();
            const sele = this;
            reader.readAsDataURL(this.imageFile);
            reader.onload = function () {
                sele.base64File = reader.result;
            }
        },
        compressImg() {
            this.isLoading = true;
            this.newBase64File = '';
            this.$lib.compressionImage(this.base64File, newSrc => {
                this.newBase64File = newSrc;
                this.isLoading = false;
            }, this.$lib.calcBase64Size(this.base64File) * this.sizeValue);
        },
        downloadImg() {
            var _this = this;
            this.$lib.getBlobFromAnyImgData(_this.newBase64File, (blob) => {
                var blobFile = blob;
                if (blob instanceof Blob) {
                    blobFile = URL.createObjectURL(blob);
                }
                var a = document.createElement('a');
                a.target = '_blank';
                a.download = (new Date()).getTime() + '.png';
                var objUrl = blobFile;
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
            });
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
.img-compress {
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
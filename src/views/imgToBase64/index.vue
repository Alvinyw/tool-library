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
            <el-button type="primary" @click="readAsDataURL">开始转换</el-button>
            <p class="lable">base64图片:</p>
            <div id="resultImage">
            </div>
            <div v-show="base64File">
                <p class="lable">base64文件:</p>
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

export default {
    name: "ImgToBase64",
    data() {
        return {
            imageFile: '',
            base64File: ''
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
                    message: '请先倒入图片',
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
            var reader = new FileReader();
            const sele = this;
            reader.readAsDataURL(this.imageFile);
            reader.onload = function () {
                sele.base64File = reader.result;
                document.getElementById("resultImage").innerHTML = '<img style="max-width: 95%;" src="' + sele.base64File + '" alt="base64"/>'
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
  
  
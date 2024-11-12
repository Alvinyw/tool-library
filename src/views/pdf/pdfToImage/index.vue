<template>
    <div class="excel-format-convert">
        <div class="sec-top">
            <el-alert style="width: 320px;margin: 0 10px 0 0;"
                title="使用说明：1、导入pdf文件；2、点击图片浮层的“下载”图标可以下载当前图片；3、点击“放大”图标可以浏览当前页的大图。" type="info"
                show-icon close-text="知道了">
            </el-alert>
            <div style="flex: auto;"><upload-pdf-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            </div>
        </div>
        <div class="main-ct">
            <div v-show="imagesList.length < 1" class="no-data">{{ imagesLoading ? '正在解析pdf文件...' : '暂无数据，请先上传pdf文件' }}</div>
            <div class="item" v-for="(item, index) in imagesList" :key="index">
                <span class="num">{{ index + 1 }}</span>
                <div class="tool"><i class="el-icon-download"></i><i class="el-icon-zoom-in" @click="onImageZoomIn(index)"></i></div>
                <img :src="item.src" alt="image" />
            </div>
        </div>
        <el-dialog :title="`当前浏览的是第${selectedIndex + 1}页`" :visible.sync="dialogVisible" top="5vh" width="60%">
            <img style="max-width: 100%;" :src="imagesList[selectedIndex] ? imagesList[selectedIndex].src : ''" alt="image" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">下载</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 参考 https://juejin.cn/post/7284433532075524151
import UploadPdfComponent from '../components/UploadPdf.vue'

export default {
    name: 'PdfToImage',
    components: { UploadPdfComponent },
    data() {
        return {
            imagesList: [], // pdf图片列表
            imagesLoading: false,
            dialogVisible: false,
            selectedIndex: '',
        }
    },
    methods: {
        beforeUpload(file) {
            // 文件大小限制
            // const isLt1M = file.size / 1024 / 1024 < 1
            // if (isLt1M) {
            //     return true
            // }
            // this.$message({
            //     message: 'Please do not upload files larger than 1m in size.',
            //     type: 'warning'
            // })
            // return false
            this.imagesLoading = true;
            return true;
        },
        onImageZoomIn(idx){
            this.dialogVisible = true;
            this.selectedIndex = idx;
        },
        handleSuccess(pdfImages) {
            this.imagesList = pdfImages;
            this.imagesLoading = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.excel-format-convert {
    .sec-top {
        display: flex;

        .el-alert__title {
            font-size: 16px;
        }
    }

    .main-ct {
        display: flex;
        flex-flow: wrap;
        margin: 20px 0 0;
        border: #eee 1px solid;
        // min-height: calc(100vh - 270px);
        min-height: 60px;
        background-color: #fff;

        .no-data {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #909399;
            font-size: 14px;
        }

        .item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
            width: 200px;
            height: 250px;
            border: 1px solid #aaa;

            .num {
                position: absolute;
                left: 0;
                top: 0;
                display: inline-block;
                padding: 5px 8px;
                text-align: center;
                font-size: 14px;
                color: #000;
                font-weight: bold;
                background-color: rgba($color: #aaa, $alpha: .3);
            }

            .tool {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 35px;
                background-color: rgba($color: #aaa, $alpha: .3);

                i {
                    height: 35px;
                    width: 35px;
                    line-height: 35px;
                    font-size: 20px;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                        background-color: rgba($color: #aaa, $alpha: .4);
                    }
                }
            }

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
}
</style>
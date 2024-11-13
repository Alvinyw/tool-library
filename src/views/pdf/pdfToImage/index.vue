<template>
    <div class="excel-format-convert">
        <div class="sec-top">
            <el-alert style="width: 320px;margin: 0 10px 0 0;"
                title="使用场景：1、将PDF导出为图片；2、调整PDF中的页面位置；3、将图片插入PDF中；4、删除PDF中的页面。" type="info" show-icon close-text="知道了">
            </el-alert>
            <div style="flex: auto;"><upload-pdf-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            </div>
        </div>
        <div class="tool-grp">
            <el-upload class="upload-image" action="#3" :auto-upload="false" multiple :show-file-list="false" accept="image/*"
                :file-list="fileList" :on-change="handleImageUpload">
                <el-button>上传图片</el-button>
            </el-upload>
            <el-button style="margin:0 10px" @click="handleDeleteAll">删除全部</el-button>
            <el-button :loading="downloadLoading" type="primary" icon="el-icon-document"
                @click="handleExportPDF">
                导出为PDF
            </el-button>
        </div>
        <div class="main-ct">
            <div v-show="imagesList.length < 1" class="no-data">{{ imagesLoading ? '正在解析pdf文件...' : '暂无数据，请先上传pdf文件' }}
            </div>
            <div id="draggable-wrapper">
                <div class="item" v-for="(item, index) in imagesList" :key="index" :class="item.isNew ? 'new' : ''">
                    <el-image style="width: 100%; height: 100%" :src="item.src" :preview-src-list="[item.src]">
                    </el-image>
                    <span class="num">{{ index + 1 }}</span>
                    <div class="tool"><i class="el-icon-download" @click="handleImageDownload(index)" title="下载图片"></i><i
                            class="el-icon-full-screen" @click="handleImageZoomIn(index)" title="全屏查看图片"></i><i
                            class="el-icon-delete" @click="handleImageDelete(index)" title="删除图片"></i></div>
                    <!-- <img :src="item.src" alt="image" /> -->
                </div>
            </div>
        </div>
        <el-dialog :title="`当前浏览的是第${selectedIndex + 1}页`" :visible.sync="dialogVisible" top="5vh" width="60%">
            <img style="max-width: 100%;" :src="imagesList[selectedIndex] ? imagesList[selectedIndex].src : ''"
                alt="image" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleImageDownload(selectedIndex)">下载</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 参考文章，JavaScript提取PDF图片： https://juejin.cn/post/7284433532075524151
import Sortable from "sortablejs";
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
            fileList: [],
            downloadLoading: false,
        }
    },
    mounted() {
        // 拖拽初始化
        var that = this;
        var el = document.getElementById("draggable-wrapper");
        // 常用
        new Sortable(el, {
            onEnd: function (evt) {
                // 获取排序之后的data数据
                const _temp = [...that.imagesList];
                _temp.splice(evt.newIndex, 0, _temp.splice(evt.oldIndex, 1)[0]);
                that.imagesList = [];
                that.$nextTick(function () {
                    that.imagesList = _temp;
                });
            },
        });
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
        handleImageZoomIn(idx) {
            this.dialogVisible = true;
            this.selectedIndex = idx;
        },
        handleSuccess(pdfImages) {
            this.imagesList = pdfImages;
            this.imagesLoading = false;
        },
        handleImageDownload(index) {
            if (!this.imagesList[index]) return;
            this.$lib.downloadImg(this.imagesList[index].src)
        },
        handleExportPDF() {
            this.downloadLoading = true;
            const _temp = [];
            this.imagesList.forEach((item) => {
                _temp.push(item.src);
            })
            this.$lib.downloadPdf(_temp, 'PNG')
            this.downloadLoading = false;
        },
        handleImageDelete(index) {
            this.imagesList.splice(index, 1);
        },
        handleDeleteAll() {
            this.imagesList = [];
        },
        handleImageUpload(file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.imagesList.unshift({ src: URL.createObjectURL(file.raw), isNew: true });
        }
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

    .tool-grp {
        display: flex;
        justify-content: flex-start;
        padding: 20px 0;

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

    .main-ct {
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
            line-height: 60px;
        }

        #draggable-wrapper {
            display: flex;
            flex-flow: wrap;

            .item {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px;
                width: 200px;
                height: 250px;
                border: 1px solid #aaa;

                &.new {
                    border: 2px solid red;
                }

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
}
</style>
<template>
    <div class="excel-zip">
        <div class="sec-top">
            <el-alert style="width: 300px;margin: 0 10px 0 0;" title="功能介绍：将导入的excel压缩后导出。" type="info" show-icon
                close-text="知道了">
            </el-alert>
            <div style="flex: auto;"><upload-excel-component :on-success="handleSuccess"
                    :before-upload="beforeUpload" /></div>
        </div>
        <div style="margin:30px 0 20px">
            <FilenameOption v-model="filename" />
            <el-button :loading="downloadLoading" style="margin:0 0 0 30px" type="primary" icon="el-icon-document"
                @click="handleDownload">
                压缩并导出
            </el-button>
        </div>
        <el-table :data="originalList" :loading="listLoading" border stripe fit highlight-current-row
            style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of originalHeader" :key="item" :prop="item" :label="item" />
        </el-table>
    </div>
</template>

<script>
import UploadExcelComponent from '../components/UploadExcel.vue'
import FilenameOption from '../components/FilenameOption'

export default {
    name: 'ExcelZip',
    components: { FilenameOption, UploadExcelComponent },
    data() {
        return {
            originalList: null, // 原始表格数据
            originalHeader: [], // 原始表格的表头
            listLoading: false,
            downloadLoading: false,
            filename: '', // 导出文件名
            bookType: 'xlsx' // 导出文件类型
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
            this.listLoading = true;
            return true;
        },
        handleSuccess({ results, header }) {
            this.listLoading = false;
            this.originalList = results
            this.originalHeader = header
        },
        // 导出表格
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Zip').then(zip => {
                // 格式化数据
                const tHeader = this.originalHeader
                const data = this.formatJson(this.originalHeader, this.originalList)
                zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
                this.downloadLoading = false
            })
        },
        // 格式化数据
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
<style lang="scss" scoped>
.excel-zip {
    .sec-top {
        display: flex;

        .el-alert__title {
            font-size: 16px;
        }
    }
}
</style>
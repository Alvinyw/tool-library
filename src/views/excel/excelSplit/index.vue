<template>
    <div class="excel-split">
        <div class="sec-top">
            <el-alert style="width: 300px;margin: 0 10px 0 0;" title="功能介绍：将单个excel表格中选中的行跟列导出成一个新的excel。" type="info" show-icon close-text="知道了">
            </el-alert>
            <div style="flex: auto;"><upload-excel-component :on-success="handleSuccess"
                    :before-upload="beforeUpload" /></div>
        </div>
        <div style="margin:30px 0 20px">
            选择列：<el-select v-model="selectedCols" multiple collapse-tags placeholder="请选择要导出的列"
                style="margin: 0 15px 0 0;">
                <el-option v-for="(value, index) in originalHeader" :key="index" :label="value" :value="value">
                </el-option>
            </el-select>
            <FilenameOption v-model="filename" />
            <AutoWidthOption v-model="autoWidth" />
            <el-button :loading="downloadLoading" style="margin:0 0 0 30px" type="primary" icon="el-icon-document"
                @click="handleDownload">
                导出已选择项
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="originalList" :loading="listLoading" border stripe fit
            highlight-current-row style="width: 100%;margin-top:20px;" @selection-change="handleSelectionChange">
            <el-table-column v-if="originalList" fixed type="selection" align="center" />
            <el-table-column v-for="item of originalHeader.filter(item => selectedCols.includes(item))" :key="item"
                :prop="item" :label="item" />
        </el-table>
    </div>
</template>

<script>
import UploadExcelComponent from '../components/UploadExcel.vue'
import FilenameOption from '../components/FilenameOption'
import AutoWidthOption from '../components/AutoWidthOption'

export default {
    name: 'ExcelSplit',
    components: { FilenameOption, AutoWidthOption, UploadExcelComponent },
    data() {
        return {
            originalList: null, // 原始表格数据
            originalHeader: [], // 原始表格的表头
            listLoading: false,
            selectedRows: [], // 表格中选中的行
            selectedCols: [], // 表格中选中的列
            downloadLoading: false,
            filename: '', // 导出文件名
            autoWidth: true, // 是否自动宽度
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
            this.selectedCols = header
        },
        handleSelectionChange(val) {
            this.selectedRows = val
        },
        // 导出表格
        handleDownload() {
            if (this.selectedRows.length < 1) {
                this.$message({
                    message: '请至少选择一行数据',
                    type: 'warning'
                })
                return false;
            }
            if (this.selectedCols.length < 1) {
                this.$message({
                    message: '请至少选择一列数据',
                    type: 'warning'
                })
                return false;
            }
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                // 摘出表格中选中的列数据
                const list = this.selectedRows.map(o => {
                    const _o = {}
                    for (const key in o) {
                        if (this.selectedCols.includes(key)) {
                            _o[key] = o[key]
                        }
                    }
                    return _o
                })
                // 过滤出要导出的列
                const filterHeader = this.originalHeader.filter(item => this.selectedCols.includes(item));
                // 格式化数据
                const data = this.formatJson(filterHeader, list)
                excel.export_json_to_excel({
                    header: filterHeader,
                    data,
                    filename: this.filename,
                    autoWidth: this.autoWidth
                })
                // this.$refs.multipleTable.clearSelection()
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
.excel-split {
    .sec-top {
        display: flex;
        .el-alert__title {
            font-size: 16px;
        }
    }
}
</style>
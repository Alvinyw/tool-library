<template>
    <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <div style="margin:30px 0">
            <el-input v-model="filename" placeholder="请输入导出的文件名 (默认为：excel-list)"
                style="width:350px;" prefix-icon="el-icon-document" />
            <el-button :loading="downloadLoading" style="margin:0 0 0 20px" type="primary" icon="el-icon-document"
                @click="handleDownload">
                导出已选择项
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="list" :loading="listLoading" border fit highlight-current-row
            style="width: 100%;margin-top:20px;" @selection-change="handleSelectionChange">
            <el-table-column v-if="list" type="selection" align="center" />
            <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
    </div>
</template>

<script>
import UploadExcelComponent from './UploadExcel.vue'

export default {
    name: 'UploadExcel',
    components: { UploadExcelComponent },
    data() {
        return {
            listLoading: false,
            list: null,
            tableHeader: [],
            multipleSelection: [],
            downloadLoading: false,
            filename: ''
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
            console.log(results, header)
            this.listLoading = false;
            this.list = results
            this.tableHeader = header
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(val)
        },
        handleDownload() {
            if (this.multipleSelection.length) {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    // const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']; // 表头
                    // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']; // 筛选字段
                    const list = this.multipleSelection
                    const data = this.formatJson(this.tableHeader, list)
                    console.log('=============data==========', data)
                    excel.export_json_to_excel({
                        header: this.tableHeader,
                        data,
                        filename: this.filename
                    })
                    this.$refs.multipleTable.clearSelection()
                    this.downloadLoading = false
                })
            } else {
                this.$message({
                    message: 'Please select at least one item',
                    type: 'warning'
                })
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
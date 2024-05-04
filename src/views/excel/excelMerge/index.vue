<template>
    <div class="excel-split">
        <div class="sec-top">
            <el-alert style="width: 320px;margin: 0 10px 0 0;"
                title="使用说明：1、导入要合并的excel文件；2、分别选择每个表格中需要合并的行和列（默认全选）；3、填写导出的文件名（非必填）；4、选择列宽度是否要自适应；5、导出合并后的excel文件。"
                type="info" show-icon close-text="知道了">
            </el-alert>
            <div style="flex: auto;"><upload-excel-component :on-success="handleSuccess"
                    :before-upload="beforeUpload" /></div>
        </div>
        <div v-for="(excel, index) of originalList" :key="index" class="excel-item">
            <span style="margin: 0 15px 0 0;">文件{{ index + 1 }}：{{ excel.name }}</span>
            选择行：<el-select v-model="excel.selectedRows" multiple collapse-tags placeholder="请选择要导出的行"
                style="margin: 0 15px 0 0;">
                <el-option v-for="(value, index) in excel.results.length" :key="index" :label="value" :value="value">
                </el-option>
            </el-select>
            选择列：<el-select v-model="excel.selectedCols" multiple collapse-tags placeholder="请选择要导出的列"
                style="margin: 0 15px 0 0;">
                <el-option v-for="(value, index) in excel.header" :key="index" :label="value" :value="value">
                </el-option>
            </el-select>
            <el-button type="primary" plain @click="onTriggerTable(index)">{{ excel.show ? '隐藏' : '预览' }}文件{{ index + 1
                }}</el-button>
            <el-button type="danger" plain @click="onDeleteTable(index)">删除文件{{ index + 1 }}</el-button>
            <el-table v-show="excel.show"
                :data="excel.results.filter((r, index) => excel.selectedRows.includes(index + 1))"
                :loading="listLoading" border stripe fit highlight-current-row style="width: 100%;margin-top:20px;"
                :header-cell-style="{ 'background': '#66b1ff', 'color': 'white', 'text-align': 'center' }">
                <el-table-column v-for="col of excel.header.filter(h => excel.selectedCols.includes(h))" :key="col"
                    :prop="col" :label="col" />
            </el-table>
        </div>
        <div style="margin:30px 0 0">
            合并方式：<el-select v-model="mergeType" clear placeholder="请选择" style="margin: 0 15px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <FilenameOption v-model="mergedExcel.name" />
            <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
                导出合并后的Excel
            </el-button>
        </div>
        <el-table :data="mergedExcel.results" :loading="listLoading" border stripe fit highlight-current-row
            style="width: 100%;margin-top:20px;"
            :header-cell-style="{ 'background': '#66b1ff', 'color': 'white', 'text-align': 'center' }">
            <el-table-column v-for="col of mergedExcel.header" :key="col" :prop="col" :label="col" />
        </el-table>
    </div>
</template>

<script>
import UploadExcelComponent from '../components/UploadExcel.vue'
import FilenameOption from '../components/FilenameOption'

export default {
    name: 'ExcelMerge',
    components: { FilenameOption, UploadExcelComponent },
    data() {
        return {
            originalList: [], // 原始表格数据
            originalHeader: [], // 原始表格的表头
            listLoading: false,
            selectedRows: [], // 表格中选中的行
            selectedCols: [], // 表格中选中的列
            downloadLoading: false,
            filename: '', // 导出文件名
            options: [{
                value: '0',
                label: '简单合并'
            }, {
                value: '1',
                label: '去除重复列'
            }, {
                value: '2',
                label: '合并重复列'
            }],
            mergeType: '0'
        }
    },
    computed: {
        mergedExcel() {
            const _name = 'merged-excel';
            let _results = [];
            let _header = [];
            for (let index = 0; index < this.originalList.length; index++) {
                const _curName = this.originalList[index].name;
                const _selectedColsData = [...this.originalList[index].header.filter(c => this.originalList[index].selectedCols.includes(c))]
                const _selectedRowsData = JSON.parse(JSON.stringify(this.originalList[index].results.filter((r, idx) => this.originalList[index].selectedRows.includes(idx + 1))))
                if (this.mergeType === '1') {
                    // 去除重复列
                    _header = Array.from(new Set([..._header, ..._selectedColsData]))
                    for (let a = 0; a < _selectedRowsData.length; a++) {
                        _results[a] = Object.assign(_results[a] ? _results[a] : {}, _selectedRowsData[a]);
                    }
                } else if (this.mergeType === '2') {
                    // 合并重复列
                    _header = Array.from(new Set([..._header, ..._selectedColsData]))
                    for (let a = 0; a < _selectedRowsData.length; a++) {
                        _results[a] = Object.assign(_results[a] ? _results[a] : {}, _selectedRowsData[a]);
                    }
                } else {
                    // 简单合并
                    _header = [..._header, ..._selectedColsData]
                    // const _len = _results[0].length
                    for (let a = 0; a < _selectedRowsData.length; a++) {
                        if (!_results[a]) {
                            _results[a] = Object.assign({}, _selectedRowsData[a]);
                        } else {
                            for (let key in _selectedRowsData[a]) {
                                // 如果存在相同列名，则重命名
                                if (_results[a][key]) {
                                    // 重命名行
                                    const _temp = _selectedRowsData[a][key];
                                    delete _selectedRowsData[a][key];
                                    _selectedRowsData[a][key + '[' + _curName.split(".")[0] + ']'] = _temp;
                                    // 重命名列
                                    const _idx = _header.indexOf(key, _header.indexOf(key) + 1);
                                    if (_idx > -1) {
                                        _header[_idx] = key + '[' + _curName.split(".")[0] + ']';
                                    }
                                }
                            }
                            _results[a] = Object.assign(_results[a], _selectedRowsData[a]);
                        }
                        // _results[a] = Object.assign(_results[a] ? _results[a] : {}, _selectedRowsData[a]);
                    }
                }
                // _results = [..._results, ..._selectedRowsData]
            }
            console.log(this.originalList, { name: _name, results: _results, header: _header })
            return { name: _name, results: _results, header: _header };
        },
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
        handleSuccess(excelObj) {
            this.listLoading = false;
            const { name, results, header } = excelObj;
            this.originalList.push({ name, results, header, selectedRows: Array.from({ length: results.length + 1 }, (v, k) => k).slice(1), selectedCols: header, show: false });
        },
        // 触发表格展开
        onTriggerTable(index) {
            this.originalList[index].show = !this.originalList[index].show;
        },
        // 删除表格
        onDeleteTable(index) {
            this.originalList = this.originalList.filter((item, idx) => index !== idx);
        },
        // 导出表格
        handleDownload() {
            if (this.mergedExcel.results.length < 1) {
                this.$message({
                    message: '请至少选择一行数据',
                    type: 'warning'
                })
                return false;
            }
            if (this.mergedExcel.header.length < 1) {
                this.$message({
                    message: '请至少选择一列数据',
                    type: 'warning'
                })
                return false;
            }
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                // 摘出表格中选中的列数据
                // const list = this.selectedRows.map(o => {
                //     const _o = {}
                //     for (const key in o) {
                //         if (this.selectedCols.includes(key)) {
                //             _o[key] = o[key]
                //         }
                //     }
                //     return _o
                // })
                // // 过滤出要导出的列
                // const filterHeader = this.originalHeader.filter(item => this.selectedCols.includes(item));
                // 格式化数据
                const { name = 'excel-merge', results = [], header = [] } = this.mergedExcel;
                const data = this.formatJson(header, results)
                excel.export_json_to_excel({
                    header: header,
                    data,
                    filename: name,
                    autoWidth: true
                })
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
        margin: 0 0 20px;

        .el-alert__title {
            font-size: 16px;
        }
    }

    .excel-item {
        border: 1px dashed #aaa;
        border-radius: 4px;
        padding: 10px 10px;
        margin: 0 0 15px;
    }
}
</style>
<template>
    <el-dialog class="dig-sys" title="选择应用系统" :visible.sync="dialogVisible">
        <el-form :inline="true" :model="applyParame" class="demo-form-inline">
            <el-form-item label="渠道">
                <el-select v-model="applyParame.channelId" clearable placeholder="请选择渠道" @change="onChannelChange">
                    <el-option v-for="item in channelMap" :key="item.channelId" :label="item.channelName"
                        :value="item.channelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统">
                <el-select v-model="applyParame.moduleId" clearable placeholder="请选择系统" @change="onModuleChange">
                    <el-option v-for="item in systemMap" :key="item.moduleId" :label="item.moduleName"
                        :value="item.moduleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面">
                <el-select v-model="applyParame.pageId" placeholder="请选择页面" @change="onPageChange">
                    <el-option v-for="item in pageMap" :key="item.pageId" :label="item.pageName" :value="item.pageId">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

export default {
    name: 'DialogTemplateApply',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        defaultParame: {
            type: Object,
            default() {
                return {
                    channelId: '',
                    moduleId: '',
                    pageId: ''
                }
            }
        }
    },
    data() {
        return {
            channelMap: [],
            systemMap: [],
            pageMap: [],
            applyParame: {
                channelId: '',
                moduleId: '',
                pageId: ''
            }
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(v) {
                this.$emit("update:visible", v);
            }
        },
    },
    mounted() {
        this.$api.app.userPermissionList().then(res => {
            const { channelList = [] } = res.data || {};
            this.channelMap = channelList;
            this.initData();
        });
    },
    methods: {
        initData() {
            const { channelId = '', moduleId = '', pageId = '' } = this.defaultParame;
            this.applyParame = {
                channelId,
                moduleId,
                pageId
            };
            if (channelId) {
                this.onChannelChange(channelId);
            }
            if (moduleId) {
                this.onModuleChange(moduleId)
            }
            if (pageId) {
                this.onPageChange(pageId)
            }
        },
        onChannelChange(val) {
            const { moduleList = [] } = this.channelMap.filter(v => v.channelId == val)[0] || {};
            this.applyParame.channelId = val;
            this.systemMap = moduleList;
            this.applyParame.moduleId = '';
            this.applyParame.pageId = '';
        },
        onModuleChange(val) {
            const { list = [] } = this.systemMap.filter(v => v.moduleId == val)[0] || {};
            this.applyParame.moduleId = val;
            this.pageMap = list;
            this.applyParame.pageId = '';
        },
        onPageChange(val) {
            this.applyParame.pageId = val;
        },
        onCancel() {
            this.$emit("update:visible", false);
        },
        onConfirm() {
            const { pageId = '' } = this.applyParame;
            if (!pageId) {
                this.$message({
                    message: '请先选择需要应用的页面！',
                    type: 'error'
                });
                return;
            }
            this.$emit('confirm', this.applyParame);
        }
    }
};
</script>

<style lang="less">
.dig-sys {
    .el-dialog {
        min-width: 850px;
    }
}
</style>

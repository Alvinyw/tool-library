<template>
    <div class="rich-text">
        <div class="edit-wrapper">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 480px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="onCreated" />
        </div>
        <div class="show-wrapper">
            <p class="type" title="点击可以拷贝源码">源码：</p>
            <el-button class="btn-copy" type="primary" size="mini" @click="handleCopy">点击拷贝</el-button>
            <textarea id="input" style="position: fixed; right: -1000px; opacity: 0;"></textarea>
            <div class="border sec-html" @click="handleCopy" title="点击可以拷贝富文本内容">{{ html }}</div>
            <p class="type" style="margin-top: 20px;">预览：</p>
            <div class="border sec-view" v-html="html"></div>
        </div>
    </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    name: "RichText",
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>Hello, Word!</p>',
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        };
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    mounted() {
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        handleCopy() {
            var input = document.getElementById("input");
            input.value = this.html;
            input.select();//选中文本
            document.execCommand("copy");
            this.$message({
                message: '已拷贝富文本内容！',
                type: 'success'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.rich-text {
    display: flex;
    justify-content: space-between;

    .edit-wrapper {
        z-index: 15;
        border: 1px solid #ccc;
        background: #fff;
    }

    .show-wrapper {
        width: 600px;
        margin: 0 0 0 20px;

        .btn-copy {
            margin: 0 0 5px;
        }
        .type {
            font-size: 18px;
            font-weight: bold;
        }

        .border {
            min-height: 230px;
            border: 1px solid #aaa;
        }

        .sec-html {
            cursor: pointer;
        }
    }
}
</style>
  
  
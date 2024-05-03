<template>
  <div style="display:inline-block;">
    <label class="radio-label" style="padding-left:0;">文件名：</label>
    <el-input v-model="filename" placeholder="默认为：excel-list" style="width: 220px;margin: 0 15px 0 0;" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filename: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

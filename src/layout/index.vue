<template>
  <el-container class="page-layout">
    <el-aside width="200px">
      <el-menu :default-active="activeMenu" @select="handleSelect">
        <el-menu-item index="1" @click="goToPage('Dashboard')">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goToPage('RichText')">
          <i class="el-icon-setting"></i>
          <span slot="title">富文本编辑器</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goToPage('ImageViewer')">
          <i class="el-icon-setting"></i>
          <span slot="title">图片编辑器</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goToPage('ImgToBase64')">
          <i class="el-icon-setting"></i>
          <span slot="title">图片转 base64</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">word 转 pdf</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="padding-top: 60px; position: relative">
      <el-header class="sec-top" style="padding: 0 15px;">
        <span class="page-name">{{ pageName }}</span>
      </el-header>
      <div class="sec-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
  },
  data() {
    return {
      activeMenu: this.$cookies.getCurrentMenuIndex() || '1',
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.path;
    },
    pageName() {
      const { name = "" } = this.$route.meta || {};
      return name;
    },
  },
  methods: {
    goToPage(pageName) {
      const { name = "" } = this.$route || {};
      if (name == pageName) return;
      this.$router.push({ name: pageName })
    },
    handleSelect(index) {
      this.$cookies.setCurrentMenuIndex(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-layout {
  padding-left: 200px;
  min-height: 100vh;

  .el-header {
    background-color: #fdfdfd;
    line-height: 60px;
    border-bottom: 1px solid #aaa;
    box-shadow: #eee 5px 5px 8px 6px;
    display: flex;
    justify-content: space-between;

    .page-name {
      font-size: 16px;
    }
  }

  .sec-top {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 20;
    width: calc(100% - 200px);
  }

  .sec-main {
    padding: 15px;
  }

  .el-aside {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    color: #aaa;
    background-color: #fff;
    border-right: solid 1px #aaa;

    .el-menu {
      border: none;

      .el-menu-item {
        // font-weight: bold;
      }
    }
  }
}
</style>

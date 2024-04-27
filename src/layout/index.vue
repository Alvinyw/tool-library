<template>
  <el-container class="page-layout">
    <el-aside width="200px">
      <el-menu :default-active="activeMenu">
        <el-menu-item index="Dashboard" @click="goToPage('Dashboard')">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>文本</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="RichText" @click="goToPage('RichText')">
              富文本编辑器
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-picture-outline"></i>
            <span>图片</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="ImageViewer" @click="goToPage('ImageViewer')">
              图片编辑器
            </el-menu-item>
            <el-menu-item index="ImgFormatConvert" @click="goToPage('ImgFormatConvert')">
              图片格式转换
            </el-menu-item>
            <el-menu-item index="ImgCompress" @click="goToPage('ImgCompress')">
              图片自定义压缩
            </el-menu-item>
            <el-menu-item index="ImgTextSearch" @click="goToPage('ImgTextSearch')">
              图片文本搜索
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>Excel</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="ExcelFormatConvert" @click="goToPage('ExcelFormatConvert')">
              Excel格式转换
            </el-menu-item>
            <el-menu-item index="ExcelSplit" @click="goToPage('ExcelSplit')">
              Excel拆分（行跟列）
            </el-menu-item>
            <!-- <el-menu-item index="" @click="goToPage('ExcelSplit')">
Excel合并（行跟列）
</el-menu-item>
<el-menu-item index="" @click="goToPage('ExcelSplit')">
Excel拆分（Sheet页）
</el-menu-item>
<el-menu-item index="" @click="goToPage('ExcelSplit')">
Excel合并（Sheet页）
</el-menu-item> -->
            <!-- <el-menu-item index="9" @click="goToPage('ExcelZip')">
Excel文件压缩
</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
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
      activeMenu: this.$cookies.getCurrentRouteName() || 'Dashboard',
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
  mounted() {
    const { name = "" } = this.$route || {};
    const _name = this.$cookies.getCurrentRouteName();
    if (name != _name) {
      this.$cookies.setCurrentRouteName(name);
      this.activeMenu = name;
    }
  },
  methods: {
    goToPage(pageName) {
      const { name = "" } = this.$route || {};
      if (name == pageName) return;
      this.$router.push({ name: pageName })
      this.$cookies.setCurrentRouteName(pageName);
    },
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

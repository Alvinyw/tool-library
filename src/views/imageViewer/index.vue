<template>
  <div class="image-viewer">
    <div class="btn-grp">
      <el-button type="primary" size="small" @click="fuc_LoadImage">导入图片</el-button>
      <!-- <el-button type="primary" size="small" @click="fuc_showVideo">show video</el-button> -->
      <el-button type="primary" size="small" @click="fuc_ShowImageEditor">编辑</el-button>
      <el-button type="primary" size="small" @click="fuc_RemoveCurrentImage">删除选中图片</el-button>
      <el-button type="primary" size="small" @click="fuc_RemoveAllImages">删除所有图片</el-button>
      <div class="btn-grp-edit" v-show="isEditing">
        <el-button type="primary" size="small" @click="fuc_rotateLeft">向左旋转</el-button>
        <el-button type="primary" size="small" @click="fuc_rotateRight">向右旋转</el-button>
        <!-- <el-button type="primary" size="small" @click="fuc_rotate180">Rotate180</el-button> -->
        <el-button type="primary" size="small" @click="fuc_rotateMirror">镜像翻转</el-button>
        <el-button type="primary" size="small" @click="fuc_rotateFlip">上下翻转</el-button>
        <el-button type="primary" size="small" @click="fuc_Crop">裁切</el-button>
        <el-button type="primary" size="small" @click="fuc_CloseImageEditor">取消</el-button>
        <el-button type="primary" size="small" @click="fuc_Save">确定</el-button>
      </div>

    </div>
    <div id="imageViewer"></div>
  </div>
</template>
<script>
import createImageViewer from "alvin-imageviewer";
export default {
  name: "ImageViewer",
  data() {
    return {
      imageViewer: "",
      isEditing: false,
    };
  },
  mounted() {
    var cfg = {
      ContainerId: "imageViewer",
      Width: "900px",
      Height: "500px",
    };
    this.imageViewer = createImageViewer(cfg);
  },
  methods: {
    initCheck() {
      if (!this.imageViewer) {
        return false;
      }
      var _imageCount = this.imageViewer.GetCount();
      if (_imageCount < 1) {
        this.$message({
          message: '请先导入图片',
          type: 'warning'
        });
        return false;
      }
    },
    fuc_LoadImage() {
      if (!this.imageViewer) {
        return;
      }
      this.imageViewer.LoadImageEx();
    },
    fuc_showVideo() {
      this.initCheck();
      this.imageViewer.ShowVideo();
    },
    fuc_ShowImageEditor() {
      this.initCheck();
      this.imageViewer.ShowImageEditor();
      this.isEditing = true;
    },
    fuc_CloseImageEditor() {
      this.initCheck();
      this.imageViewer.CloseImageEditor();
      this.isEditing = false;
    },

    fuc_rotateLeft() {
      this.initCheck();
      this.imageViewer.RotateLeft();
    },

    fuc_rotateRight() {
      this.initCheck();
      this.imageViewer.RotateRight();
    },

    fuc_rotate180() {
      this.initCheck();
      this.imageViewer.Rotate('', 180);
    },

    fuc_rotateMirror() {
      this.initCheck();
      this.imageViewer.Mirror();
    },

    fuc_rotateFlip() {
      this.initCheck();
      this.imageViewer.Flip();
    },

    fuc_Crop() {
      this.initCheck();
      this.imageViewer.Crop();
    },
    fuc_Save() {
      this.initCheck();
      this.imageViewer.Save();
      this.isEditing = false;
    },
    fuc_RemoveCurrentImage() {
      this.initCheck();
      this.imageViewer.RemoveAllSelectedImages();
    },

    fuc_RemoveAllImages() {
      this.initCheck();
      this.imageViewer.RemoveAllImages();
    }
  },
};
</script>
<style lang="scss" scoped>
.image-viewer {
  .btn-grp {
    margin: 0 0 10px;

    .btn-grp-edit {
      margin: 10px 0 0;
    }
  }
}
</style>
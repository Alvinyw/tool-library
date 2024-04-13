<template>
  <div class="image-viewer">
    <div class="btn-grp">
      <el-button type="primary" size="small" @click="fuc_LoadImage">导入图片</el-button>
      <!-- <el-button type="primary" size="small" @click="fuc_showVideo">show video</el-button> -->
      <el-button type="primary" size="small" @click="fuc_ShowImageEditor">编辑</el-button>
      <el-button type="primary" size="small" @click="fuc_getImage">下载选中图片</el-button>
      <el-button type="primary" size="small" @click="fuc_RemoveCurrentImage">删除选中图片</el-button>
      <el-button type="primary" size="small" @click="fuc_RemoveAllImages">删除所有图片</el-button>
      <div class="btn-grp-edit" v-show="isEditing">
        <el-button type="primary" size="small" @click="fuc_rotateLeft">向左旋转</el-button>
        <el-button type="primary" size="small" @click="fuc_rotateRight">向右旋转</el-button>
        <!-- <el-button type="primary" size="small" @click="fuc_rotate180">Rotate180</el-button> -->
        <el-button type="primary" size="small" @click="fuc_rotateMirror">镜像翻转</el-button>
        <el-button type="primary" size="small" @click="fuc_rotateFlip">上下翻转</el-button>
        <el-button type="primary" size="small" @click="fuc_Crop">裁切</el-button>
        <el-button type="primary" size="small" @click="fuc_Save">确定</el-button>
        <el-button type="primary" size="small" @click="fuc_CloseImageEditor">取消</el-button>
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
    globalCheck() {
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
      return true;
    },
    fuc_LoadImage() {
      if (!this.imageViewer) {
        return;
      }
      this.imageViewer.LoadImageEx();
    },
    fuc_showVideo() {
      if (!this.globalCheck()) return;
      this.imageViewer.ShowVideo();
    },
    fuc_ShowImageEditor() {
      if (!this.globalCheck()) return;
      this.imageViewer.ShowImageEditor();
      this.isEditing = true;
    },
    fuc_CloseImageEditor() {
      if (!this.globalCheck()) return;
      this.imageViewer.CloseImageEditor();
      this.isEditing = false;
    },
    fuc_rotateLeft() {
      if (!this.globalCheck()) return;
      this.imageViewer.RotateLeft();
    },
    fuc_rotateRight() {
      if (!this.globalCheck()) return;
      this.imageViewer.RotateRight();
    },
    fuc_rotate180() {
      if (!this.globalCheck()) return;
      this.imageViewer.Rotate('', 180);
    },
    fuc_rotateMirror() {
      if (!this.globalCheck()) return;
      this.imageViewer.Mirror();
    },
    fuc_rotateFlip() {
      if (!this.globalCheck()) return;
      this.imageViewer.Flip();
    },
    fuc_Crop() {
      if (!this.globalCheck()) return;
      this.imageViewer.Crop();
    },
    fuc_Save() {
      if (!this.globalCheck()) return;
      this.imageViewer.Save();
      this.isEditing = false;
    },
    fuc_RemoveCurrentImage() {
      if (!this.globalCheck()) return;
      this.imageViewer.RemoveAllSelectedImages();
    },
    fuc_RemoveAllImages() {
      if (!this.globalCheck()) return;
      this.imageViewer.RemoveAllImages();
    },
    fuc_getImage() {
      if (!this.globalCheck()) return;
      var _curIndex = this.imageViewer.GetCurentIndex();
      console.log('=====imageViewer========', this.imageViewer.aryImageControls[_curIndex].objImage)
      this.imageViewer.SaveAsPNG('image' + _curIndex, _curIndex);
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
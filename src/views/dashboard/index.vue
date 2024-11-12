<template>
  <div class="dashboard-index">
    <!-- <img src="../../assets/images/img-dashboard.jpeg"/> -->
    <h1>效率工具库</h1>
    <p style="margin: 30px 0 0;">技术支持请联系：</p>
    <p style="margin: 20px 0 0;">维护人：总行/科技部/开发中心/廖益文</p>
    <p>电话：18879726585</p>
    <p>邮箱：liaoyiwen@bankgz.com</p>
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.dashboard-index {
  // width: 320px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 95px);
  flex-direction: column;
  h1 {
    text-align: center;
    font-size: 30px;
    margin: 0 0 20px;
  }

  p {
    // text-align: left;
  }

  img {
    max-width: 100%;
  }
}
</style>
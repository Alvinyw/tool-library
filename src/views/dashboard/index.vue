<template>
  <div class="dashboard-index">
    <!-- <img src="../../assets/images/img-dashboard.jpeg"/> -->
    <h1>效率工具库</h1>
    <p>维护人：liaoyiwen@bankgz.com</p>
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
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  flex-direction: column;
  // background: #eee;
  h1 {
    text-align: center;
    font-size: 30px;
    margin: 0 0 20px;
  }

  p {
    text-align: center;
  }

  img {
    max-width: 100%;
  }
}
</style>
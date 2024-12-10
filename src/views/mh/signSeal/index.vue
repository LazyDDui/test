<script setup lang="ts">

</script>

<template>
  <div class="shBox">
    <div class="header">

    </div>
    <div class="content">
      <div class="left-side">
        <div class="left1"></div>
        <div class="left2"></div>
      </div>
      <div class="right-side">

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shBox {
  width: 1200px;
  margin: 0 auto;

  .header {
    width: 100%;
    height: 100px;
    background-color: red;
    margin-bottom: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;

    height: 500px;

    .left-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      .left1 {
        flex: 1;
        background-color: #0a4fd3;
        margin-bottom: 20px;
      }

      .left2 {
        flex: 1;
        background-color: yellow;
      }
    }

    .right-side {
      flex: 4;
      background-color: #67c23a;
    }
  }
}
</style>

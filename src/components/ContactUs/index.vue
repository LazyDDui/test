<script setup lang="ts">

defineOptions({
  name: "ContactUs"
})


</script>

<template>
  <div class="us-box">
    <div class="phone">
      <div class="item">
        <span class="iconfont" style="font-size: 5vh!important;">&#xe7ca;</span>
      </div>
      <div class="number">
        <span style="font-size: 3vh !important;" class="iconfont">&#xe7ca;</span>
        <span >400-161-8811</span>
      </div>
    </div>

    <a class="wc" href="https://work.weixin.qq.com/kfid/kfc6893a2f278a1396a" >
      <div class="item">
        <span style="font-size: 5vh!important;" class="iconfont">&#xe600;</span>
      </div>
    </a>

  </div>
</template>

<style scoped lang="scss">
.us-box {
  position: fixed;
  right: 20px;
  top: 30vh;

  .wc {
    margin-top: 2vh;
    cursor: pointer;
    display: inline-block;
    span {
      color: #255ca5;
      transition: 0.5s;
    }

    &:hover {
      .item {
        background: #255ca5;
      }

      span {
        color: #ffffff;
      }
    }

    .item {
      display: flex;
      width: 8vh;
      height: 8vh;
      background-color: #fff;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
    }
  }

  .phone {
    position: relative;
    cursor: pointer;

    &:hover .number {
      opacity: 1;
      z-index: 1;
      width: 25vh;
      transform: translateX(-17vh);
      font-size: 3vh;
    }

    .number {
      position: absolute;
      opacity: 0;
      transition: .5s;
      background-color: #255ca5;
      color: #ffffff;
      height: 8vh;
      width: 8vh;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5vh;
      z-index: -1;
      transform-origin: 100% 100%;
      font-size: 1vh;
      white-space: nowrap;

      span {
        color: #fff;
        margin-right: 0.5vh;
      }
    }

    .item {
      display: flex;
      width: 8vh;
      height: 8vh;
      background-color: #fff;
      border-radius: 50%;
      justify-content: center;
      align-items: center;

      span {
        color: #255ca5;
      }
    }
  }

}
</style>

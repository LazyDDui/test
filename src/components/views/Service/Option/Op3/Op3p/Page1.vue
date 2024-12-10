<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/howtoregister/pic2.png`,
  img2: `https://www.ciceseal.com/uploads/image/howtoregister/pic1.png`
}

</script>

<template>
  <div class="page1">
    <div>进入小程序首页，首次使用需要注册账号。点击右上角“立即登录”，如下图所示：</div>
    <img alt="pic2" :src="info.img1"/>
    <div>进入到登录页面，点击底部“申领电子印章”按钮，根据提示选择申领电子印章类型进行账号注册。如下图所示：</div>
    <img alt="pic1" :src="info.img2"/>
  </div>
</template>

<style scoped lang="scss">
.page1 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/howtoverify/pic1.png`,
  img2: `https://www.ciceseal.com/uploads/image/howtoverify/pic2.png`
}

</script>

<template>
  <div class="page6">
    <div>可通过“验文件”，验证电子文档签署有效性。准备好需要检验的文件发送到微信“文件传输助手”或微信好友。打开小程序首页，点击“验文件”按钮，跳转至查看文件真伪页面，点击底部“选择文件”按钮后，在“文件传输助手”或微信好友里勾选需要验证的文件，点击“确认”按钮，等待查验结果。如下图所示：
    </div>
    <img alt="pic2" :src="info.img1"/>
    <div>
      若文档校验成功则会显示校验结果，否则提示校验失效。如下图所示：
    </div>
    <img alt="pic1" :src="info.img2"/>
  </div>
</template>

<style scoped lang="scss">
.page6 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

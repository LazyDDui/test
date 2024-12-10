<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/personal-eseal/pic1.png`,
  img2: `https://www.ciceseal.com/uploads/image/personal-eseal/pic5.png`,
  img3: `https://www.ciceseal.com/uploads/image/personal-eseal/pic3.png`,
  img4: `https://www.ciceseal.com/uploads/image/personal-eseal/pic4.png`
}

</script>

<template>
  <div class="page4">
    <div>点击登录页底部“申领电子印章”按钮，跳转至申领类型页面，点击“申领个人电子私章”按钮。如下图所示：</div>
    <img alt="pic2" :src="info.img1"/>
    <div>进入申领个人电子私章页面，上传申领人身份证正反面原件照片材料，填写实名认证手机号码等信息，核对申领人信息确认无误后，点击“下一步”。如下图所示：
    </div>
    <img alt="pic1" :src="info.img2"/>
    <div>进入到印章申领页面，可选择印章样式，以及设置印章签署密码，点击“确认申领”按钮，跳转至购买权益页面。如下图所示：
    </div>
    <img alt="pic1" :src="info.img3"/>
    <div>进入到购买权益页面，选择一个合适自己的权益，完成支付后，即印章申领成功。如下图所示：</div>
    <img alt="pic1" :src="info.img4"/>
  </div>
</template>

<style scoped lang="scss">
.page4 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

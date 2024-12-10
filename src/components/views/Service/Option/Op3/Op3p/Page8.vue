<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/institution-manager/pic1.png`,
  img2: `https://www.ciceseal.com/uploads/image/institution-manager/pic2.png`,
  img3: `https://www.ciceseal.com/uploads/image/institution-manager/pic3.png`
}

</script>

<template>
  <div class="page8">
    <div>
      进入“我的”页面，点击“我的单位”选项，跳转至我的单位页面，可查看该账户下的所有单位信息。点击任意单位，跳转至该单位信息详情页，可查看该单位的相关信息，包含单位名称、信用代码、法定代表人、手机号码、认证状态、注册时间等。如下图所示：
    </div>
    <img alt="pic2" :src="info.img1"/>
    <h1>1.1.【信息变更】</h1>
    <div>点击界面底部“信息变更”按钮，可选择弹窗中变更单位名称或变更法定代表人选项，点击需要变更的信息选项，根据弹窗提示联系客服。如下图所示：
    </div>
    <img alt="pic1" :src="info.img2"/>
    <h1>1.2.【注销单位】</h1>
    <div>
      点击界面底部“信息变更”按钮，可选择弹窗中变更单位名称或法定代表人选项，点击需要变更的信息选项，根据弹窗提示联系客服（注销单位，即代表放弃该单位下所有印章的权益）。如下图所示：
    </div>
    <img alt="pic1" :src="info.img3"/>
  </div>
</template>

<style scoped lang="scss">
.page8 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

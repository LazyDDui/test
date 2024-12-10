<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/howtosignature/pic6.png`,
  img2: `https://www.ciceseal.com/uploads/image/howtosignature/pic2.png`,
  img3: `https://www.ciceseal.com/uploads/image/howtosignature/pic3.png`,
  img4: `https://www.ciceseal.com/uploads/image/howtosignature/pic1.png`,
  img5: `https://www.ciceseal.com/uploads/image/howtosignature/pic4.png`,
  img6: `https://www.ciceseal.com/uploads/image/howtosignature/pic5.png`
}

</script>

<template>
  <div class="page5">
    <div>提前准备好已定稿待签署的文件发送到微信“文件传输助手”或微信好友，如下图所示：</div>
    <img alt="pic2" :src="info.img1"/>
    <div>
      进入小程序首页，点击“签文件”按钮，跳转至发起文档页面，点击底部“选择文档”按钮后，在“文件传输助手”或微信好友里勾选需要签署的文件（同时支持Word、PDF等格式的文件签署，非付费用户，签署文件大小不超过10M；付费用户，签署文件大小不超过20M，大于20M的文件，可使用签章客户端进行文件签署）。如下图所示：
    </div>
    <img alt="pic2" :src="info.img2"/>
    <div>
      进入文档预览页，点击“立即签署”按钮，跳转至发起文档签署页。根据提示，可以进行文档名称修改或选择相应的文档类型，确认无误后点击“签署”按钮。如下图所示：
    </div>
    <img alt="pic2" :src="info.img3"/>
    <div>
      文件签署支持单个指定位置签章、多页固定位置批量签章、骑缝签章三种方式。进入文件签署页面后，默认单个指定位置签章方式，在界面底部选择需要签署的公章或私章，拖拽至文档中合适的位置。对于进行批量签章的情况，选择多页签章方式，移动至合适位置，选择指定签章页码（全部页、奇数页、偶数页、自定义页码范围）进行签署，点击确定。如下图所示：
    </div>
    <img alt="pic2" :src="info.img4"/>
    <div>
      添加骑缝章，选择骑缝签章方式，在界面底部选择需要签署的印章移动至边缘合适位置。确认无误后，点击“完成”按钮，弹出“签署验证”提示弹窗，输入签署密码，点击“确认”按钮，系统进行签章加密处理。如下图所示：
    </div>
    <img alt="pic2" :src="info.img5"/>
    <div>签署完成后，可立即在微信中进行分享签署或查看。如下图所示：</div>
    <img alt="pic2" :src="info.img6"/>
  </div>
</template>

<style scoped lang="scss">
.page5 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

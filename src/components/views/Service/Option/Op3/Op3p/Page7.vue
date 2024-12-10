<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/eseal-manager/pic3.png`,
  img2: `https://www.ciceseal.com/uploads/image/eseal-manager/pic4.png`,
  img3: `https://www.ciceseal.com/uploads/image/eseal-manager/pic1.png`,
  img4: `https://www.ciceseal.com/uploads/image/eseal-manager/pic2.png`,
  img5: `https://www.ciceseal.com/uploads/image/eseal-manager/pic7.png`,
  img6: `https://www.ciceseal.com/uploads/image/eseal-manager/pic5.png`,
  img7: `https://www.ciceseal.com/uploads/image/eseal-manager/pic6.png`,
}

</script>

<template>
  <div class="page7">
    <div>点击首页“公章管理”按钮，跳转至公章管理页面，可查看单位基本信息，以及该单位下申领的所有印章信息等。如下图所示：
    </div>
    <img alt="pic2" :src="info.img1"/>
    <h1>1.1.【印章详情】</h1>
    <div>点击印章底部的“详情”按钮，跳转至印章详情页，可查看该印章的相关信息，包含印章名称、印章类型、备案日期、单位名称、信用代码、备案证明等。如下图所示：
    </div>
    <img alt="pic1" :src="info.img2"/>
    <h1>1.2.【注销企业/单位公章】</h1>
    <div>
      点击印章底部的“管理”按钮，在弹窗内选择“印章注销”选项，点击“联系客服”按钮(注销印章，即代表放弃原有印章的所有权益)。如下图所示：
    </div>
    <img alt="pic1" :src="info.img3"/>
    <h1>1.3.【注销个人私章】</h1>
    <div>打开小程序首页，切换到个人主体，点击“个人私章”按钮。如下图所示：</div>
    <img alt="pic1" :src="info.img4"/>
    <div>
      进入个人私章页面，每位用户有且仅有一枚个人私章。点击印章底部的“管理”按钮，在弹窗内选择“注销私章”选项，输入私章的签署密码，即可注销私章（如需再次申领，则须注销掉原先的个人私章，注销印章，即代表放弃原有印章的所有权益）。如下图所示：
    </div>
    <img alt="pic1" :src="info.img5"/>
    <h1>1.4.【修改密码】</h1>
    <div>
      点击印章底部的“管理”按钮，在弹窗内选择“修改密码”选项，跳转至修改签署密码页，根据提示输入内容，点击“提交”按钮，即修改密码成功。如下图所示：
    </div>
    <img alt="pic1" :src="info.img6"/>
    <h1>1.5.【找回密码】</h1>
    <div>点击印章底部的“管理”按钮，在弹窗内选择“找回密码”选项，跳转至找回签署密码页，根据提示输入内容，点击“提交”按钮，即密码成功找回。如下图所示：
    </div>
    <img alt="pic1" :src="info.img7"/>
  </div>
</template>

<style scoped lang="scss">
.page7 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

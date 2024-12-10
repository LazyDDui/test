<script setup lang="ts">

const info = {
  img1: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic1.png`,
  img2: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic9.png`,
  img3: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic4.png`,
  img4: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic5.png`,
  img5: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic6.png`,
  img6: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic11.png`,
  img7: `https://www.ciceseal.com/uploads/image/enterprise-eseal/pic5.png`
}

</script>

<template>
  <div class="page2">
    <h1>1.1.【首次申领印章】</h1>
    <div>
      点击登录页底部“申领电子印章”按钮，跳转至申领类型页面，点击“申领单位电子公章”按钮，在弹窗内选择“企业单位”选项，并点击“下一步”。如下图所示：
    </div>
    <img alt="pic2" :src="info.img1"/>
    <div>
      进入申领单位电子公章页面，上传单位营业执照、法定代表人身份证正反面原件照片材料，填写实名认证手机号码等信息，核对信息无误后，点击“下一步”。如下图所示：
    </div>
    <img alt="pic3" :src="info.img2"/>
    <div>
      进入申领印章页面，可申领的印章类型有法定名称章、法定代表人名章、财务专用章、发票专用章、合同专用章五大类型公章以及“其他类型”印章。如需申请“其他类型”印章，点击“其他类型”按钮，更多印章类型可供选择，（如现有章型无法满足，需申请特殊章型，请联系在线客服进行咨询申领），最后需要设置电子印章的签署密码，确认内容无误后，点击“确认申领”按钮。如下图所示：
    </div>
    <img alt="pic3" :src="info.img3"/>
    <div>进入支付页面。根据页面提示，填写相关信息，信息确认无误后，点击“立即支付”按钮，即印章申领成功。如下图所示：</div>
    <img alt="pic3" :src="info.img4"/>
    <h1>1.2.【继续申领企业单位电子印章】</h1>
    <div>登录进入小程序首页，切换需要申领公章的企业单位主体。点击“公章管理”，跳转至公章管理界面，点击底部的“申领单位印章
      ”按钮。如下图所示：
    </div>
    <img alt="pic3" :src="info.img5"/>
    <div>
      进入申领印章页面，选择需要申领的印章类型。（如现有章型无法满足，需申请特殊章型，请联系在线客服进行咨询申领）。最后需要设置电子印章的签署密码，确认内容无误后，点击“确认申领”按钮。
    </div>
    <img alt="pic3" :src="info.img6"/>
    <div>进入支付页面。根据页面提示，填写相关信息，信息确认无误后，点击“立即支付”按钮，即印章申领成功。如下图所示:</div>
    <img alt="pic3" :src="info.img7"/>

  </div>
</template>

<style scoped lang="scss">
.page2 {
  div {
    margin-top: 10px;
    line-height: 24px;
  }
  h1 {
    margin-top: 16px;
  }
}
</style>

<script setup lang="ts">
defineOptions({
  name:"SealFooter"
})
</script>

<template>
  <div style="bottom: 0;background-color:#1e1e1e;width: 100%;position: fixed;z-index: 2000;">
    <div class="footer">
      <div class="item">技术支持：</div>
      <div class="item">
        <img alt="gh" src="https://www.cic-gd.com/web/img/bigguohui.ac95d823.png"/>
        <div>全国电子印章管理与服务平台</div>
      </div>
      <div class="item">
        <img alt="gh" src="https://www.cic-gd.com/web/img/bigguohui.ac95d823.png"/>
        <div>公安部第三研究所</div>
      </div>
      <div class="item">
        <div>蜀ICP备 2023020519号</div>
      </div>
    </div>
  </div>

</template>
<SealFooter/>
<style scoped lang="scss">
.footer {
  width: 100%;
  height: 4.5vh;
  margin: 0 auto;
  max-width: 1200px;
  margin: 0.8vh;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;

  .item {
    display: flex;
    margin-right: 60px;
    font-size: 11px;
    align-items: center;
    img {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>

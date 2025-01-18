<script setup lang="ts">

import {fp} from "@/utils";
</script>

<template>
  <div style="display: flex;width: 100%;flex-direction: column">
    <div class="item">
      <img class="img" alt="1" :src="fp('index/scene1.png')"/>
      <!--      <div class="title">-->
      <!--        App/H5/小程序-->
      <!--      </div>-->
      <div class="title">
        H5/小程序
      </div>
      <div class="subtitle">
        移动端
      </div>
    </div>
    <div class="item">
      <img class="img" alt="1" :src="fp('index/scene2.png')"/>
      <!--      <div class="title">-->
      <!--        服务门户/本地签章客户端-->
      <!--      </div>-->
      <div class="title">
        服务门户
      </div>
      <!--      <img style="margin-bottom:17px;" alt="desc" :src="fp('index/icoukeyimg.png')"/>-->
      <div class="subtitle">
        PC端
      </div>
    </div>
    <div class="item">
      <img class="img" alt="1" :src="fp('index/scene2.png')"/>
      <div class="title">
        Saas API接口
      </div>
      <div class="subtitle">
        第三方接口
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  width: 100%;
  background-color: #F5F8FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  &:hover .img {
    transform: scale(1.15);
  }
}

.img {
  margin: 45px 45px 0 45px;
  transition: .5s;
}

.title {
  font-size: 20px;
  padding: 8px 0 10px 0;
  font-weight: 500;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 15px;
  color: #999999;
}
</style>

<script setup lang="ts">

import {useMainStore} from "@/store/useMainStore";
import {storeToRefs} from "pinia";
import { fp } from "@/utils";

defineOptions({
  name: "Footer"
})

const {isMobile, deviceInfo, screen} = storeToRefs(useMainStore())
</script>

<template>
  <div
      :style="{margin:'0 auto',width:isMobile?`${deviceInfo.width}px`:`${screen.width - 260}px`}"
  >
    <div
        style="padding: 15px 0;border-bottom: 1px solid #a4a6ae;display: flex;justify-content: center;align-items: center">
      <div v-if="!isMobile" :style="{marginRight:'28px'}">友情链接：</div>
      <div v-else style="marginRight:18px;font-size: 14px;">友情链接：</div>
      <img v-if="!isMobile" style="height: 25px;margin-right: 40px;cursor: pointer;"
           :src="fp('index/links1.png')"/>
      <img v-else style="margin-top: 4px;height: 18px;margin-right: 20px;cursor: pointer;"
           :src="fp('index/links1.png')"/>
      <div v-if="!isMobile" style="padding-left: 40px;border-left:1px solid #a4a6ae; ">
        <img style="cursor: pointer;;height: 25px;margin-right: 40px;" :src="fp('index/links2.png')"/>
      </div>
      <div v-else style="padding-left: 10px;border-left:1px solid #a4a6ae; ">
        <img style="cursor: pointer;;height: 18px;margin-right: 20px;" :src="fp('index/links2.png')"/>
      </div>
    </div>
    <div v-if="!isMobile" style="display: flex;justify-content: center;padding: 10px 0 0 0;">
      <div class="desc">
        公安备案
      </div>
      <div class="desc">
        全国互认
      </div>
      <div class="desc">
        一键核验
      </div>
    </div>
    <div v-else style="display: flex;justify-content: center;padding: 4px 0 0 0;">
      <div class="descM">
        公安备案
      </div>
      <div class="descM">
        全国互认
      </div>
      <div class="descM">
        一键核验
      </div>
    </div>
    <div v-if="!isMobile" style="text-align: center;padding-bottom: 10px;">copyright © 2024 <a href="#">全国电子印章管理与服务平台</a>
      蜀ICP备2023020519号
    </div>
    <div v-else style="text-align: center;padding-bottom: 8px;font-size: 10px">copyright © 2024 <a href="#">全国电子印章管理与服务平台</a>
      蜀ICP备2023020519号
    </div>
  </div>
</template>

<style scoped lang="scss">
.desc {
  padding: 0 8px;
  border-right: 1px solid #a4a6ae;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.descM {
  padding: 0 4px;
  border-right: 1px solid #a4a6ae;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.desc:nth-of-type(3) {
  border-right: none;
}

a {
  color: #a4a6ae;

  &:hover {
    color: #fff;
  }
}

</style>

<script setup lang="ts">

import ShContainer from "@/components/Common/ShContainer.vue";
import {useMainStore} from "@/store/useMainStore";
import {storeToRefs} from "pinia";
import { fp } from "@/utils";

const {isMobile} = storeToRefs(useMainStore())
</script>

<template>
  <ShContainer :is-mob="isMobile">
    <div :class="{
      p1:!isMobile,
      p1M:isMobile
    }">
      <v-img class="img" alt="ab" :src="`${fp('about/about.jpg')}`"/>
      <div class="content">
        <h1>了解我们</h1>
        <p>平台提供电子印章申领、备案、签章、核验等全生命周期管理，实现电子印章跨地区、跨部门签章及核验。</p>
        <p>
          平台为每一枚电子印章提供由公安部第三研究所出具的具有司法效力的唯一备案证明，从源头上保证电子印章制作过程的合规性、印章数据的真实性及有效性。</p>
        <p>平台制发的电子印章，签署的电子签章文件，支持全国32个省级平台进行统一验证，全国互通互认。</p>
        <p>
          电子印章适用于电子公文、电子证照、电子票据、电子合同等众多场景，应用于金融、能源、交通、住建、教育、医疗等诸多行业。</p>
        <p>
          全国电子印章管理与服务平台省级平台，打通应用层级、区域、部门壁垒，助力“高效办成一件事”，支撑政务服务“一网通办”为构建诚信社会夯实基础，为数字经济发展充盈动力。</p>
      </div>
    </div>
  </ShContainer>
</template>

<style scoped lang="scss">
.p1 {
  display: flex;
  padding: 100px 0;
  .img {
    flex: 1
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 2;
    padding-left: 40px;

    h1 {
      font-size: 32px;
      padding-bottom: 30px;
      font-weight: 600;
    }

    p {
      padding-bottom: 15px;
      color: #999999;
      line-height: 160%;
    }
  }
}

.p1M {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 30px;
  width: 100%;
  .img {
    width: 100%
  }
  h1 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  p {
    padding-bottom: 14px;
    color: #999999;
    line-height: 160%;
  }
}
</style>

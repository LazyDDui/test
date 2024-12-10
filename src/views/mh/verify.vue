<script setup lang="ts">
import Part2 from "@/components/views/verify/Part2.vue";
import Part2M from "@/components/views/verify/Part2M.vue";
import Part3 from "@/components/views/verify/Part3.vue";
import Part3M from "@/components/views/verify/Part3M.vue";
import { useMainStore } from "@/store/useMainStore";
import { storeToRefs } from "pinia";
import Header from "@/components/Common/Header.vue";

const title = "签章验证";
const sub =
  "“全国电子印章管理与服务平台”以用户为中心，面向全国企事业单位、个体工商户、个人提供公安备案电子印章及电子文件签章验证等公共服务，助力优化营商环境，为您的用章环境保驾护航。";
const { isMobile } = storeToRefs(useMainStore());
</script>

<template>
  <div class="verify">
    <Header type="default" :title="title" :subtitle="sub" />
    <Part2 v-if="!isMobile" />
    <Part2M v-else />
    <Part3 v-if="!isMobile" />
    <Part3M v-else />
  </div>
</template>

<style scoped lang="scss"></style>

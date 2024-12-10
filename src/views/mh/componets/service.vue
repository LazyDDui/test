<script setup lang="ts">

import Header from "@/components/Common/Header.vue";
import Part1 from "@/components/views/Service/Part1.vue";
import Part1M from "@/components/views/Service/Part1M.vue";
import {storeToRefs} from "pinia";
import {useMainStore} from "@/store/useMainStore";
import Part2 from "@/components/views/Service/Part2.vue";

const title = '省级门户'
const sub = '全国电子印章管理与服务平台省级服务门户，提供面向各省用户的统一服务入口，所有通过公安备案的电子印章签署的文件支持在任何时间、任何省级平台进行统一验证，实现电子印章全国互通互认。'

const {isMobile} = storeToRefs(useMainStore())
</script>

<template>
  <div class="service">
    <Header type="default" :title="title" :subtitle="sub"/>
    <Part1 v-if="!isMobile"></Part1>
    <Part1M v-else></Part1M>
    <Part2/>
  </div>
</template>

<style scoped lang="scss">

</style>

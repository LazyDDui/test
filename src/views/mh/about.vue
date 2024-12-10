<script setup lang="ts">
import Header from "@/components/Common/Header.vue";
import Part1 from "@/components/views/About/part1.vue";
import Part2 from "@/components/views/About/part2.vue";
import Part3 from "@/components/views/About/part3.vue";
import Part4 from "@/components/views/About/part4.vue";

const title = "关于我们";
const sub =
  "“全国电子印章管理与服务平台”基于国家发改委数字经济试点重大工程项目，在公安部第三研究所指导下遵循国家顶层规范和标准建成，“全国电子印章管理与服务平台32个省级平台”面向全国企事业单位、个体工商户、个人提供优质的电子印章服务，优化线上办事流程、创新政企服务模式，助力经济发展降本、提质、增效。";
</script>

<template>
  <div class="about">
    <Header type="default" :title="title" :subtitle="sub" />
    <Part1 />
    <Part2 />
    <Part3 />
    <Part4 />
  </div>
</template>

<style scoped lang="scss"></style>

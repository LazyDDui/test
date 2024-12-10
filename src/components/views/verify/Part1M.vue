<script setup lang="ts">
import { fp } from "@/utils";

type Part1Type = {
  title: string;
  subtitle: string;
  type?: 'search' | 'default';
}
defineProps<Part1Type>()

</script>

<template>
  <div class="banner"
       :style="{backgroundImage:type=='default'?`url('${fp('verify/banner-service.jpg')}')`:`url('${fp('verify/banner-solution.jpg')}')`}">
    <div class="w">
      <div class="text">{{ title }}</div>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background-position: 70% center;
  background-repeat: no-repeat;
  width: 100vw;
  min-height: 180px;
  background-size: cover;

  .w {
    width: 1200px;
    margin: 0 auto;

    .text {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
      color: #333;
      letter-spacing: -2px;
      text-align: left;
      font-weight: 600;
      padding: 0 15px;
    }

    p {
      margin-top: 0;
      color: #666;
      font-size: 14px;
      line-height: 20px;
      max-width: 98vw;
      font-weight: 500;
      padding: 0 0 0 15px;
    }
  }
}
</style>

<script setup lang="ts">
import { fp } from "@/utils";

type Part1Type = {
  title: string;
  subtitle: string;
  type?: "search" | "default" | "news";
};
defineProps<Part1Type>();
</script>

<template>
  <div
    class="banner"
    :style="{
      backgroundImage:
        type == 'default'
          ? `url('${fp('verify/banner-service.jpg')}')`
          : type == 'news'
            ? `url('${fp('verify/banner-news.jpg')}')`
            : `url('${fp('verify/banner-solution.jpg')}')`
    }"
  >
    <div class="w">
      <div class="text">{{ title }}</div>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  padding-top: 160px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 480px;

  .w {
    width: 1200px;
    margin: 0 auto;

    .text {
      font-size: 46px;
      height: 68px;
      line-height: 68px;
      color: #333;
      letter-spacing: -2px;
      text-align: left;
      font-weight: 600;
    }

    p {
      margin-top: 29px;
      color: #666;
      font-size: 20px;
      max-width: 750px;
      line-height: 35px;
      text-align: justify;
      font-weight: 500;
    }
  }
}
</style>

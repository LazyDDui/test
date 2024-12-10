<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());
</script>

<template>
  <div
    :class="{
      op4: !isMobile,
      op4M: isMobile
    }"
  >
    <div class="title">在线客服</div>
    <v-img class="bg" alt="bg" :src="fp('service/contact.jpg')" />
  </div>
</template>

<style scoped lang="scss">
.op4 {
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 31px;
    color: #333333;
    margin: 0 0 30px 0;
  }

  .bg {
    width: 100%;
    height: 236px;
  }
}

.op4M {
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    color: #333333;
    margin: 0 0 20px 0;

    .bg {
      width: 100px;
      object-fit: cover;
      height: 236px;
    }
  }
}
</style>

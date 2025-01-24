<script setup lang="ts">
import {useRoute} from "vue-router";
import {newsUrl} from "@/utils/common";

const route = useRoute()
const num = route.query.num

</script>

<template>
  <iframe  :src="`${newsUrl}/${num}.html`">
  </iframe>
</template>

<style scoped lang="scss">
iframe {
  width: 100vw;
  height: calc(100vh - 116px);
}
</style>

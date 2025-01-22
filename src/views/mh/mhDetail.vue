<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
const num = route.query.num

</script>

<template>
  <iframe :src="`/html/news/${num}.html`">
  </iframe>
</template>

<style scoped lang="scss">
iframe {
  width: 100vw;
  height: calc(100vh - 116px);
}
</style>

<script setup lang="ts">
import { ref, watch } from "vue";
type ImageProps = {
  pic: string;
};

const props = defineProps<ImageProps>();
const srcList = ref<string[]>(["data:image/png;base64," + props.pic]);
</script>

<template>
  <el-image
    style="width: 100px; height: 100px"
    :src="'data:image/png;base64,' + pic"
    fit="cover"
    lazy
  />
</template>

<style scoped lang="scss"></style>

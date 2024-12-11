<script setup lang="ts">
type ImageProps = {
  pic: string;
}

const props = defineProps<ImageProps>()
</script>

<template>
  <el-image
    style="width: 50px; height: 50px"
    :src="'data:image/png;base64,'+pic"
  />
</template>

<style scoped lang="scss">

</style>

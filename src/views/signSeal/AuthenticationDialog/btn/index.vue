<script setup lang="ts">
type BtnProps = {
  cgClick:() => void;
}

const props = defineProps<BtnProps>()
</script>

<template>
    <el-button size="small" type="text" @click="cgClick">切换</el-button>
</template>

<style scoped lang="scss">

</style>

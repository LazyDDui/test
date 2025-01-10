<script setup lang="ts">
type BtnProps = {
  data: any
}
defineProps<BtnProps>()
const emit = defineEmits(["choose"])

</script>

<template>
  <el-button @click="emit('choose',data)" type="text" size="small">选择该章作为模板
  </el-button>
</template>

<style scoped lang="scss">

</style>

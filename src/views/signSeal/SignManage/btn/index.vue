<script setup lang="ts">
type BtnProps = {
  dwClick:() => void;
  detailClick:() => void;
  delClick:() => void;
}

const props = defineProps<BtnProps>()
</script>

<template>
  <el-row>
    <el-button size="small" type="text" @click="dwClick">下载</el-button>
    <el-button size="small" type="success" @click="detailClick">详情</el-button>
    <el-button size="small" type="danger" @click="delClick">删除</el-button>
  </el-row>
</template>

<style scoped lang="scss">

</style>

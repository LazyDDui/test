<script setup lang="ts">
import {ref} from "vue";

type SeePsw = {
  c: string;
};

const show = ref(false);

const props = defineProps<SeePsw>();
</script>

<template>
  <el-row style="align-items: center">
    <div style="width: 110px;">
      <div v-if="show">{{ c }}</div>
      <div v-else>***********</div>
    </div>
    <el-button size="small" type="text" @click="show=!show">{{ show ? `隐藏` : `查看` }}</el-button>
  </el-row>
</template>

<style scoped lang="scss"></style>

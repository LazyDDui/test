<script setup lang="ts">
import { ref } from "vue";

type GetSealProps = {
  d: (data) => void;
};

const radio = ref(3);

const formData = ref("99");
</script>

<template>
  <div class="sealBox">
    <el-radio-group v-model="radio">
      <el-radio value="99">个人印章</el-radio>
      <el-radio value="01">法定名称章</el-radio>
      <el-radio value="02">财务专用章</el-radio>
      <el-radio value="03">发票专用章</el-radio>
      <el-radio value="04">合同专用章</el-radio>
      <el-radio value="05">法定代表人名章</el-radio>
    </el-radio-group>
  </div>
</template>

<style scoped lang="scss">
.sealBox {
  padding: 20px;
}
</style>

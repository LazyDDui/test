<script setup lang="ts">
import { http } from "@/utils/http";
import { message } from "@/utils/message";

type BtnProps = {
  cgClick: () => void;
  data: any;
};

const props = defineProps<BtnProps>();

const apiClick = () => {
  if (props.data.isApplyApi == "0") {
    http.post(`/app/userAuthentication/api/apply`).then(() => {
      message(props.data.row.id + "已开通", {
        type: "success"
      });
    });
  }
  console.log(props.data);
};
</script>

<template>
  <el-row>
    <el-button size="small" type="text" @click="cgClick">切换</el-button>
    <el-button
      size="small"
      :disabled="data.isApplyApi != '0'"
      type="text"
      @click="apiClick"
      >api开通</el-button
    >
  </el-row>
</template>

<style scoped lang="scss"></style>

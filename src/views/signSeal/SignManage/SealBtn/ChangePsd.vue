<script setup lang="ts">
import { reactive } from "vue";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { closeAllDialog } from "@/components/ReDialog/index";

type ChangePsd = {
  data: any;
};

const props = defineProps<ChangePsd>();

const psd = reactive({
  oldPin: "",
  newPin: ""
});

const submit = () => {
  http
    .post(`/app/userAuthentication/seal/changePin`, {
      params: {
        oldPin: psd.oldPin,
        newPin: psd.newPin,
        id: props.data.id
      }
    })
    .then(() => {
      message("修改成功", {
        type: "success"
      });
      closeAllDialog();
    })
    .catch(() => {
      message("修改失败", {
        type: "error"
      });
    });
};
</script>

<template>
  <el-row>
    <el-input
      v-model="psd.oldPin"
      style="margin-bottom: 20px"
      placeholder="请输入旧密码"
    />
    <el-input v-model="psd.newPin" placeholder="请输入新密码" />
    <el-button @click="submit" style="margin-top: 20px">确认</el-button>
  </el-row>
</template>

<style scoped lang="scss"></style>

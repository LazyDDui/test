<script setup lang="ts">
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { removeUserAuthenticationApi } from "@/api/test";
import { addDialog } from "@/components/ReDialog/index";
import { h } from "vue";

type BtnProps = {
  cgClick: () => void;
  data: any;
};

const props = defineProps<BtnProps>();

const emit = defineEmits(["updateList"]);
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

const remove = async () => {
  addDialog({
    title: "注意",
    contentRenderer({ options, index }) {
      return h("div", null, "确认删除" + props.data.authenticationName + "?");
    },
    async beforeSure(done) {
      await removeUserAuthenticationApi(props.data.id);
      emit("updateList");
      done();
    }
  });
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
    <el-button size="small" type="danger" @click="remove">删除</el-button>
  </el-row>
</template>

<style scoped lang="scss"></style>

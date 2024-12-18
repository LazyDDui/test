<script setup lang="ts">
import { addDialog } from "@/components/ReDialog/index";
import { h, reactive } from "vue";
import ChangePsd from "@/views/signSeal/SignManage/SealBtn/ChangePsd.vue";
import { http } from "@/utils/http";
import { message } from "@/utils/message";

type BtnProps = {
  detailClick: () => void;
  // addClick: () => void;
  data: any;
};

const props = defineProps<BtnProps>();

const showCpwDialog = () => {
  console.log(props.data);
  addDialog({
    title: "修改密码:" + props.data.name,
    hideFooter: true,
    contentRenderer: () =>
      h(ChangePsd, {
        data: props.data
      })
  });
};

const remove = () => {
  addDialog({
    title: "确认删除" + props.data.id + "?",
    beforeSure(done, { options, index }) {
      http
        .post(`/userAuthentication/seal/revoke`, {
          params: {
            id: props.data.id,
            reason: ""
          }
        })
        .then(() => {
          message("注销成功", {
            type: "success"
          });
          done();
        });
    }
  });
};
</script>

<template>
  <el-row>
    <el-button size="small" type="text" @click="showCpwDialog"
      >修改密码
    </el-button>
    <el-button size="small" type="text" @click="detailClick"
    >查看备案
    </el-button>
    <!--    <el-button size="small" type="text" @click="addClick">续费</el-button>-->
    <el-button size="small" type="text" @click="remove">注销</el-button>
  </el-row>
</template>

<style scoped lang="scss">
.el-button {
  margin-left: 0 !important;
}
</style>

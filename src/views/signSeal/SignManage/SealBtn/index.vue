<script setup lang="ts">
import {addDialog} from "@/components/ReDialog/index";
import {h, reactive, ref} from "vue";
import ChangePsd from "@/views/signSeal/SignManage/SealBtn/ChangePsd.vue";
import {http} from "@/utils/http";
import {message} from "@/utils/message";
import Loading from "@/components/Common/Loading.vue";

type BtnProps = {
  detailClick: () => void;
  addClick: (type:"1" | "2") => void;
  data: any;
  getList: () => void;
};


const props = defineProps<BtnProps>();

const showCpwDialog = () => {
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
    title: "注意",
    contentRenderer() {
      return h("div", null, "确认注销" + props.data.name + "?");
    },
    beforeSure(done, {options, index}) {
      http
        .post(`/app/userAuthentication/seal/revoke`, {
          data: {
            id: props.data.id,
            reason: "..."
          }
        })
        .then(() => {
          message("注销成功", {
            type: "success"
          });
          done();
          props.getList();
        });
    }
  });
};
</script>

<template>
  <el-row style="display: flex;justify-content: center;">
    <el-button v-if="data.isExpire !== '1'" :disabled="data.status == '2'" size="small" type="primary" plain round
               @click="showCpwDialog"
    >修改密码
    </el-button>
    <el-button v-if="data.isExpire !== '1'" :disabled="data.status == '2'" size="small" type="primary" plain round
               @click="detailClick"
    >备案下载
    </el-button>
    <el-button :disabled="data.status == '2'" v-if="data.status == '1'" size="small" type="success" plain round
               @click="addClick('2')">续费
    </el-button>
    <el-button :disabled="data.status == '2'" v-if="data.status == '0'" size="small" type="success" plain round
               @click="addClick('1')">缴费
    </el-button>
    <el-button size="small" type="danger" plain round @click="remove">注销</el-button>
  </el-row>
</template>

<style scoped lang="scss">
.el-button {
  margin-left: 4px !important;
}
</style>

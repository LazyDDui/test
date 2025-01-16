<script setup lang="ts">
import {http} from "@/utils/http";
import {message} from "@/utils/message";
import {removeUserAuthenticationApi} from "@/api/test";
import {addDialog} from "@/components/ReDialog/index";
import {h} from "vue";
import {useRouter} from "vue-router";

type BtnProps = {
  cgClick: () => void;
  data: any;
};

const props = defineProps<BtnProps>();
const router = useRouter()

const emit = defineEmits(["updateList"]);
const apiClick = () => {
  if (props.data.isApplyApi == "0") {
    http
      .post(`/app/userAuthentication/api/apply`, {
        data: {
          id: props.data.row.id
        }
      })
      .then(() => {
        message(props.data.row.id + "已开通", {
          type: "success"
        });
        setTimeout(() => {
          router.push("/welcome")
        }, 1000)
      });
  }
};

const remove = async () => {
  addDialog({
    title: "注意",
    contentRenderer({options, index}) {
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
      v-if="data.isApplyApi == '0'"
      size="small"
      type="text"
      @click="apiClick"
    >api开通
    </el-button
    >
    <el-tag v-else type="success" style="margin-right: 10px">已开通api</el-tag>
    <el-button size="small" type="danger" @click="remove">删除</el-button>
  </el-row>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { h, reactive, ref, toRaw } from "vue";
import Btn from "@/views/signSeal/AuthenticationDialog/btn/index.vue";
import {
  addDialog,
  closeAllDialog,
  closeDialog
} from "@/components/ReDialog/index";
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue";
import PrincipalType from "@/views/signSeal/PrincipalType/index.vue";
import {
  personSign,
  companySign,
  userAuthentication,
  changeAuthentication,
  getCurrentAuthentication
} from "@/api/test";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { http } from "@/utils/http";
import { CertStatusMap } from "@/utils/map";

const { setAuth, getSealManageInfo } = useSeal();
const { auth } = storeToRefs(useSeal());
type ShTable = {
  cols: TableColumnList;
  tableData: any[];
  total: number;
  getUserAuthenlication: () => void;
  goToCert: () => void;
};

const props = defineProps<ShTable>();
const personData = ref<any>();
const columns: TableColumnList = [
  {
    label: "名称",
    prop: "authenticationName",
    align: "center"
  },
  {
    label: "类型",
    align: "center",
    cellRenderer(data) {
      return h("div", null, CertStatusMap.get(data.row.status));
    }
  },
  {
    label: "操作",
    align: "center",
    cellRenderer(data) {
      return h(Btn, {
        data: data.row,
        onUpdateList: () => {
          props.getUserAuthenlication();
        },
        cgClick: async () => {
          const res: any = await changeAuthentication(data.row.id);
          const res2: any = await getCurrentAuthentication();
          if (res.code == "0") {
            ElMessage({
              message: "切换成功！",
              type: "success"
            });
          }
          setAuth(res2.data);
          closeAllDialog();
          await getSealManageInfo();
        }
      });
    }
  }
];
const currentChange = e => {
  console.log(e);
};
const isPerson = ref(false);

const addAuthentication = () => {
  closeAllDialog();
  props.goToCert();
};
</script>

<template>
  <div>
    <el-button size="small" type="primary" @click="addAuthentication"
      >新增认证
    </el-button>
    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns" />
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>

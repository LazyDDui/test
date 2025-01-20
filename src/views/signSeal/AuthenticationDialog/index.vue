<script setup lang="ts">
import {h, reactive, ref, toRaw} from "vue";
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
  changeAuthenticationApi,
  getCurrentAuthentication
} from "@/api/test";
import {useSeal} from "@/store/useSeal";
import {storeToRefs} from "pinia";
import {ElMessage} from "element-plus";
import {http} from "@/utils/http";
import {CertStatusMap} from "@/utils/map";

const {setAuth, getSealManageInfo} = useSeal();
const {auth} = storeToRefs(useSeal());
type ShTable = {
  cols: TableColumnList;
  tableData: any[];
  total: number;
  getUserAuthenlication: () => void;
  goToCert: () => void;
};
const form = reactive({
  authenticationName: "",
  current: 1
});
const props = defineProps<ShTable>();
const emit = defineEmits(["search"]);
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
        onUpdateList: async () => {
          props.getUserAuthenlication();
          await getSealManageInfo();
        },
        cgClick: async () => {
          const res: any = await changeAuthenticationApi(data.row.id);
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
const currentChange = (e: number) => {
  form.current = e;
};
const isPerson = ref(false);

const addAuthentication = () => {
  closeAllDialog();
  props.goToCert();
};
</script>

<template>
  <div>
    <el-button
      style="margin-bottom: 10px"
      size="large"
      type="primary"
      plain
      round
      @click="addAuthentication"
    >新增认证
    </el-button>
    <el-row>
      <div>
        <el-input
          v-model="form.authenticationName"
          style="width: 200px; margin-right: 10px"
          size="default"
          placeholder="请输入名称"
        />
        <el-button size="default" type="primary" @click="emit('search', form)"
        >搜索
        </el-button
        >
      </div>
    </el-row>


    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns"/>
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

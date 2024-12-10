<script setup lang="ts">
import {h, reactive} from "vue";
import {tableData} from "@/views/table/base/data";
import Btn from "@/views/signSeal/AuthenticationDialog/btn/index.vue";
import {addDialog} from "@/components/ReDialog/index";
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue";
import PrincipalType from "@/views/signSeal/PrincipalType/index.vue"

const columns: TableColumnList = [
  {
    label: "名称",
    prop: "date"
  },
  {
    label: "类型",
    prop: "name"
  },
  {
    label: "操作",
    cellRenderer(data) {
      return h(Btn, {
        cgClick: () => {
          console.log(data);
        },
      });
    },
    align: "center"
  }
];
const currentChange = e => {
  console.log(e);
};
const addAuthentication = () => {
  addDialog({
    title: "主体类型",
    contentRenderer: () => h(PrincipalType)
  })
}
</script>

<template>
  <div>
    <el-button size="small" type="primary" @click="addAuthentication">新增认证</el-button>
    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns"/>
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="currentChange"
      />
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import {h, reactive, ref} from "vue";
import {tableData} from "@/views/table/base/data";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import SeeMore from "@/views/sys/shApi/SeeMore/index.vue";
import SeePsw from "@/views/sys/shApi/SeePsw/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import {getRequestPage} from "@/api/test"

const columns: TableColumnList = [
  {
    label: "接口名称",
    prop: "date"
  },
  {
    label: "请求密钥",
    cellRenderer(data) {
      return h(SeePsw, {
        c: data.row.name
      });
    }
  },
  {
    label: "调用时间",
    prop: "address"
  },
  {
    label: "请求参数",
    prop: "address"
  },
  {
    label: "响应结果",
    prop: "address",
    cellRenderer(data) {
      console.log(data.row);
      return h(SeeMore, {
        c: data.row.address
      });
    }
  }
];
// const tableData = ref({
//   currPage: 1,
//   pageSize: 10,
//   list: [],
//   totalCount: 0
// });
const form = reactive({
  name: "",
  keys: ""
});
const getList = async () => {
  const res = await getRequestPage({
    ...form.value,
    current: 1,
    size: 10
  })
  console.log(res)
}
getList()
const currentChange = e => {
  console.log(e);
};
</script>

<template>
  <el-row class="page">
    <el-input
      v-model="form.name"
      style="width: 200px; margin-right: 10px"
      size="small"
      placeholder="请输入接口名称"
    />
    <el-input
      v-model="form.keys"
      style="width: 200px; margin-right: 10px"
      size="small"
      placeholder="请输入接口名称"
    />

    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns"/>
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="currentChange"
      />
    </el-row>
  </el-row>
</template>

<style scoped lang="scss">
.page {
  padding: 20px;
  background-color: #ffffff;
}
</style>

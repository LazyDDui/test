<script setup lang="ts">
import { h, reactive } from "vue";
import { tableData } from "@/views/table/base/data";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
const columns: TableColumnList = [
  {
    label: "文档名称",
    prop: "date"
  },
  {
    label: "发起时间",
    prop: "name"
  },
  {
    label: "文档状态",
    prop: "address"
  },
  {
    label: "操作",
    cellRenderer(data) {
      return h(Btn, {
        dwClick: () => {
          console.log(data);
        },
        detailClick: () => {
          console.log(data);
        },
        delClick: () => {
          console.log(data);
        }
      });
    },
    align: "center"
  }
];
</script>

<template>
  <div>
    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns" />
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

<script setup lang="ts">
import { getSignRequestFile } from "@/api/test";
import { tableData } from "@/views/table/base/data";
import { h } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";

const getList = async () => {
  const { data } = await getSignRequestFile(1);
};

const columns: TableColumnList = [
  {
    label: "文档名称",
    prop: "date",
    align: "center"
  },
  {
    label: "发起时间",
    prop: "name",
    align: "center"
  },
  {
    label: "文档状态",
    prop: "address",
    align: "center"
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

getList();
</script>

<template>
  <div class="recent">
    <pure-table :data="tableData" :columns="columns" />
  </div>
</template>

<style scoped lang="scss">
.recent {
  padding: 20px;
}
</style>

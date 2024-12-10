<script setup lang="ts">
import {h, reactive} from "vue";
import {tableData} from "@/views/table/base/data";
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

const form = reactive({
  name: "",
  userStatus: "",
  status: ""
});

const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];

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
      placeholder="文档名称"
    />
    <el-select
      v-model="form.userStatus"
      placeholder="用户状态"
      size="large"
      style="width: 200px; margin-right: 10px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="form.status"
      placeholder="状态"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
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
}
</style>

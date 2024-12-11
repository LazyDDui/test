<script setup lang="ts">
import { http } from "@/utils/http";
import { h, reactive, ref } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";

const columns: TableColumnList = [
  {
    label: "印章编码",
    prop: "id"
  },
  {
    label: "印章名称",
    prop: "name"
  },
  {
    label: "印章类型",
    prop: "status"
  },
  {
    label: "制发时间",
    prop: "makeTime"
  },
  // {
  //   label: "权益有效期",
  //   prop: "address"
  // },
  {
    label: "印章图片",
    props: "pic",
    cellRenderer(data) {
      return h("img", {
        src: data.row.pic
      });
    }
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

const tableData = ref({
  current: 1,
  records: [],
  total: 0
});

const getList = async () => {
  // const {data} = await http.post(`/app/signRequestFile/page`)
  // console.log('......', data)
  const { data } = await http.post(`/app/userAuthentication/seal/page`);
  console.log(data);
  tableData.value = data;
};

const currentChange = e => {
  console.log(e);
};
getList();
</script>

<template>
  <el-row>
    <el-input
      v-model="form.name"
      style="width: 200px; margin-right: 10px"
      size="small"
      placeholder="文档名称"
    />
    <pure-table
      style="margin-top: 20px"
      :data="tableData.records"
      :columns="columns"
    />
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

<style scoped lang="scss"></style>

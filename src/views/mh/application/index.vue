<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import {http} from "@/utils/http";

let sealLoading = ref(false);
let sealData = ref([]);
let subjectId = ref(undefined);
const toSubject = () => {
  subjectId.value = undefined;
  type.value = "0";
  searchSubjectName();
};
const downloadBA = (r) => {
  http.post("/app/seal/viewRecordUni", {
    data:{
      sealSn: r.id
    }
  }).then((res) => {
    http.get(res.data.fileTempUrl, {}, {
      responseType: "blob"
    }).then((r) => {
      const url = window.URL.createObjectURL(new Blob[r.data]);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "a.pdf");
      document.body.append(link);
      link.click();
    });
  });
};
const router = useRouter();

let type = ref("0");
let loading = ref(false);
let tableData = ref([]);
let content = ref(undefined);
let pageSize = ref(10);
let pageNo = ref(1);
let totalNum = ref(0);
const searchSubjectName = () => {
  loading.value = true;
  http.post("/app/app/page", {
    data:{
      current: pageNo.value,
      size: pageSize.value
    }
  }, {
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // }
  }).then((res) => {
    console.log(tableData.value);
    tableData.value = res.records;
    totalNum.value = res.total;
    loading.value = false;
  });
};
const handleSizeChange = (v) => {
  pageSize.value = v;
  searchSubjectName();
};
const handleCurrentChange = (v) => {
  pageNo.value = v;
  searchSubjectName();
};

searchSubjectName();



</script>

<template>
  <div style="padding: 40px;">
    <el-row>
      <el-col :span="1.5">
        <div style="padding-top: 10px;font-size: 14px">主体名称：</div>
      </el-col>
      <el-col :span="8">
        <el-input
          size="large" placeholder="搜索主体" @keyup.enter="searchSubjectName" v-model="content">
        </el-input>
      </el-col>
    </el-row>
    <br />
    <el-table
      :data="tableData"
      header-align="center"
      v-loading="loading"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-table-column label="秘钥" prop="appId" />
      <el-table-column label="部分隐藏" prop="secret" />
      <el-table-column label="类型" width="150px" align="center">
        <template #default="scope">
          <div v-if="scope.row.setNum === '0'">
            <span v-if="scope.row.setNum != '-1'">{{ scope.row.setNum }}</span>
            <span v-else>无限次</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="使用次数" prop="useNum" />
      <el-table-column label="有效期" prop="deadLine" />
      <el-table-column label="创建时间" prop="createTime" />
    </el-table>
    <br />
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="position: absolute;bottom: 0; right: 20px;left: auto"
    >
    </el-pagination>
  </div>
</template>

<style scoped lang="scss">

</style>

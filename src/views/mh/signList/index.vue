<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {http} from "@/utils/http";

const router = useRouter();

let loading = ref(false);
let tableData = ref([]);
let content = ref(undefined);
let pageSize = ref(10);
let pageNo = ref(1);
let totalNum = ref(0);
const searchSubjectName = () => {
  // loading.value = true;
  http.post("/saas/apiSignRequestFile/page", {
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
    // loading.value = false;
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

async function downloadPdf(url, filename = "document.pdf") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 获取响应体作为 Blob
    const blob = await response.blob();

    // 创建一个临时的 <a> 元素用于触发下载
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename; // 设置下载文件名

    // 将 <a> 元素添加到 DOM 中（虽然它是隐藏的）
    document.body.appendChild(link);

    // 触发点击事件以开始下载
    link.click();

    // 下载完成后移除 <a> 元素
    document.body.removeChild(link);

    // 释放对象 URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

const downloadFile1 = (data: any) => {
  downloadPdf(data.signedFileUrl.replace("http://182.151.13.73:9099", ""), data.docName);
};

const downloadFile2 = (data: any) => {
  downloadPdf(data.fileUrl.replace("http://182.151.13.73:9099", ""), data.docName);
};


</script>

<template>
  <div>sign</div>
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
      <el-table-column label="文件名" prop="docName" />
      <el-table-column label="签署状态">
        <template #default="scope">
          <div v-if="scope.row.status === '0'">
            <span v-if="scope.row.status = '0'">正常</span>
            <span v-else-if="scope.row.status = '1'">签署中</span>
            <span v-else-if="scope.row.status = '2'">失败</span>
            <span v-else>待签署</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="签署说明" prop="statusMsg" />
      <el-table-column label="创建时间" prop="createTime" />

      <el-table-column label="类型" width="350px" align="center">
        <template #default="scope">
          <el-row>
            <el-button type="primary" style="width: 120px" @click="downloadFile1(scope.row)">下载已签署文件</el-button>
            <el-button type="primary" style="width: 120px" @click="downloadFile2(scope.row)">下载签署源文件</el-button>
          </el-row>
        </template>
      </el-table-column>
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

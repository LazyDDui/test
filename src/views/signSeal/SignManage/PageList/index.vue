<script setup lang="ts">
import { h, reactive, ref } from "vue";
import { tableData } from "@/views/table/base/data";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { getSignRequestFile } from "@/api/test";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";

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

const { getList } = useSeal();
const { fileList } = storeToRefs(useSeal());

const columns: TableColumnList = [
  {
    label: "文档名称",
    prop: "docName",
    align: "center"
  },
  {
    label: "发起时间",
    prop: "createTime",
    align: "center"
  },
  {
    label: "文档状态",
    prop: "statusMsg",
    align: "center"
  },
  {
    label: "操作",
    cellRenderer(data) {
      return h(Btn, {
        dwClick: () => {
          downloadPdf(data.row.signedFileUrl);
        },
        delClick: () => {
          http.post(`/app/signRequestFile/remove/${data.row.id}`).then(() => {
            message("删除成功", {
              type: "success"
            });
            getList(1);
          });
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


const currentChange = async e => {
  await getList(e);
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
    <!--    <el-select-->
    <!--      v-model="form.userStatus"-->
    <!--      placeholder="用户状态"-->
    <!--      size="large"-->
    <!--      style="width: 200px; margin-right: 10px"-->
    <!--    >-->
    <!--      <el-option-->
    <!--        v-for="item in options"-->
    <!--        :key="item.value"-->
    <!--        :label="item.label"-->
    <!--        :value="item.value"-->
    <!--      />-->
    <!--    </el-select>-->
    <!--    <el-select-->
    <!--      v-model="form.status"-->
    <!--      placeholder="状态"-->
    <!--      size="large"-->
    <!--      style="width: 240px"-->
    <!--    >-->
    <!--      <el-option-->
    <!--        v-for="item in options"-->
    <!--        :key="item.value"-->
    <!--        :label="item.label"-->
    <!--        :value="item.value"-->
    <!--      />-->
    <!--    </el-select>-->
    <pure-table
      style="margin-top: 20px"
      :data="fileList.records"
      :columns="columns"
    />
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        v-model="fileList.current"
        background
        layout="prev, pager, next"
        :total="fileList.total"
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

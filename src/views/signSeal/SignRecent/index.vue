<script setup lang="ts">
import { getSignRequestFile } from "@/api/test";
import { tableData } from "@/views/table/base/data";
import { h, ref } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";
import { http } from "@/utils/http";
import { message } from "@/utils/message";

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

// const state = ref({
//   current: 1,
//   size: 10,
//   records: [],
//   total: 0
// });

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
</script>

<template>
  <div class="recent">
    <pure-table :data="fileList.records" :columns="columns" />
  </div>
</template>

<style scoped lang="scss">
.recent {
  padding: 20px;
  height: 440px;
  overflow-y: scroll;
}
</style>

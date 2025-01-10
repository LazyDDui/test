<script setup lang="ts">
import { http } from "@/utils/http";
import { h, reactive, ref } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { getUserAuthentication } from "@/api/test";
import Image from "@/views/signSeal/SignManage/Image/index.vue";
import SealBtn from "@/views/signSeal/SignManage/SealBtn/index.vue";
import { addDialog } from "@/components/ReDialog/index";
import { message } from "@/utils/message";
import { downloadByData } from "@pureadmin/utils";
import { SealTypeMap } from "@/utils/map";
import {useSeal} from "@/store/useSeal";

const columns: TableColumnList = [
  {
    label: "印章编码",
    prop: "id",
    width: 200,
    align: "center"
  },
  {
    label: "印章名称",
    prop: "name",
    width: 200,
    align: "center"
  },
  {
    label: "印章类型",
    prop: "status",
    align: "center",
    cellRenderer(data) {
      return SealTypeMap.get(data.row.status);
    }
  },
  {
    label: "制发时间",
    prop: "makeTime",
    align: "center"
  },
  // {
  //   label: "权益有效期",
  //   prop: "address"
  // },
  {
    label: "印章图片",
    align: "center",
    // props: "pic",
    cellRenderer(data) {
      return h(Image, {
        pic: data.row.pic
      });
    }
  },
  {
    label: "操作",
    width: 240,
    cellRenderer(data) {
      return h(SealBtn, {
        data: data.row,
        getList,
        detailClick: () => {
          http
            .get(
              `/app/userAuthentication/seal/recordDownload`,
              {
                params: {
                  id: data.row.id
                }
              },
              {
                responseType: "blob"
              }
            )
            .then(blob => {
              // 创建一个带有Blob URL的对象URL
              const blobUrl = URL.createObjectURL(blob);
              // 创建一个隐藏的<a>元素用于触发下载
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = blobUrl;
              a.download = data.row.id + `.pdf`; // 设置下载文件名

              // 将<a>元素添加到DOM中
              document.body.appendChild(a);

              // 模拟点击以触发下载
              a.click();

              // 下载完成后移除<a>元素并释放对象URL
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            })
            .catch(error =>
              console.error(
                "There was a problem with the fetch operation:",
                error
              )
            );
        }
      });
    },
    align: "center"
  }
];

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

const {getSealManageInfo} = useSeal()

const getList = async () => {
  const { data } = await getUserAuthentication(
    tableData.value.current,
    form.name
  );
  tableData.value = data;
  await getSealManageInfo()
};

const currentChange = async e => {
  tableData.value.current = e;
  await getList();
};
getList();
</script>

<template>
  <el-row>
    <el-input
      v-model="form.name"
      style="width: 200px; margin-right: 10px"
      placeholder="请输入印章名称"
    />
    <el-button type="primary" @click="getList">搜索</el-button>
    <pure-table
      style="margin-top: 20px"
      :data="tableData.records"
      :columns="columns"
    />
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.total"
        @current-change="currentChange"
      />
    </el-row>
  </el-row>
</template>

<style scoped lang="scss"></style>

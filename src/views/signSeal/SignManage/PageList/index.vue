<script setup lang="ts">
import { h, reactive, ref } from "vue";
import { tableData } from "@/views/table/base/data";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { getSignRequestFile } from "@/api/test";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";
import { downloadPdf } from "@/utils/common";

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
          downloadPdf(data.row.signedFileUrl, data.row.docName + ".pdf");
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

const current = ref(1);

const form = reactive({
  docName: "",
  userStatus: "",
  status: ""
});

const currentChange = async (e: number) => {
  current.value = e;
  await getList(e, {
    docName: form.docName
  });
};
</script>

<template>
  <el-row class="page">
    <el-input
      v-model="form.docName"
      style="width: 200px; margin-right: 10px"
      size="default"
      placeholder="文档名称"
    />
    <el-button
      type="primary"
      @click="
        getList(current, {
          docName: form.docName
        })
      "
      >搜索</el-button
    >
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

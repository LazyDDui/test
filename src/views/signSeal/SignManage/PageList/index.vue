<script setup lang="ts">
import { h, reactive, ref } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { getSignRequestFile } from "@/api/test";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";
import { downloadPdf } from "@/utils/common";
import {addDialog} from "@/components/ReDialog/index";

const { getList } = useSeal();
const { fileList } = storeToRefs(useSeal());

const state = ref({
  records: [],
  current: 1,
  total: 0
});

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
        canDownload: data.row.status == "0",
        delClick: () => {
          addDialog({
            title: "注意",
            contentRenderer() {
              return h("div", `确认删除` + data.row.docName);
            },
            beforeSure(done) {
              http
                .post(`/app/signRequestFile/remove`, {
                  data: {
                    id: data.row.id
                  }
                })
                .then(() => {
                  message("删除成功", {
                    type: "success"
                  });
                  getList(1);
                  currentChange(state.value.current);
                  done();
                });
            }
          });
        },
        data: data.row
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
  const { data } = await getSignRequestFile(e, {
    docName: form.docName
  });
  state.value = data;
};

currentChange(1);
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
      :data="state.records"
      :columns="columns"
    />
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        v-model="state.current"
        background
        layout="prev, pager, next"
        :total="state.total"
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

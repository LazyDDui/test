<script setup lang="ts">
import { getSignRequestFile } from "@/api/test";
import { tableData } from "@/views/table/base/data";
import { h, ref } from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { downloadPdf } from "@/utils/common";
import { addDialog } from "@/components/ReDialog/index";

const { getList } = useSeal();
const { fileList } = storeToRefs(useSeal());

// const state = ref({
//   current: 1,
//   size: 10,
//   records: [],
//   total: 0
// });

getList(1);

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
        canDownload: data.row.status == 0,
        data: data.row,
        dwClick: () => {
          downloadPdf(data.row.signedFileUrl, data.row.docName + ".pdf");
        },
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
                  done();
                });
            }
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
    <pure-table :height="400" :data="fileList.records" :columns="columns" />
  </div>
</template>

<style scoped lang="scss">
.recent {
  padding: 20px;
  height: 100%;
}
</style>

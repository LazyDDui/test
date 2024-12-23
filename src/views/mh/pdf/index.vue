<script setup lang="ts">
import { onBeforeUnmount, ref, toRaw } from "vue";
import { getSealImg } from "@/api/test";
import { ElMessage } from "element-plus";
import { http } from "@/utils/http";
import { useSeal } from "@/store/useSeal";
import ShPdf from "@/components/ShPdf/index.vue";
import {
  downLoadFile,
  downloadPdf,
  getBase64,
  preViewFile,
  uniqueByIdReduce
} from "@/utils/common";
import { storeToRefs } from "pinia";
import { ElLoading } from "element-plus";

const sign = ref();
const psw = ref();
const pdfInfo = ref();
const appno = ref("");

const { getPdf } = useSeal();
const { fileId } = storeToRefs(useSeal());
let timer;

const pdf = ref();

const loadingPdf = ref();

const getPdfFile = async () => {
  // const blob = await getPdf();
  // pdf.value = preViewFile(blob);
  pdf.value = "http://182.151.13.73:9999" + "/app/file/" + fileId.value;
  // console.log(import.meta.env.VITE_BASE_URL)
};

getPdfFile();
const show = ref(false);

const pdfRef = ref();

const sealList = ref([]);

const error = ref(false);

const { getSubjectId } = useSeal();

const stampList = ref([]);

const getSeal = async () => {
  const { data } = await getSealImg(1, 100);
  stampList.value = data.records.map(item => ({
    ...item,
    id: item.id,
    url: "data:image/jpeg;base64," + item.pic
  }));
};

getSeal();

const submit = async () => {
  if (!submitStampListUi.value.every(item => item.info.pinCode)) {
    ElMessage.error("请输入章密码");
    return;
  }
  const sealInfo = JSON.parse(localStorage.getItem("sealInfo"));
  console.log(submitStampListUi.value);
  normalArr.value.forEach(item => {
    for (const i of submitStampListUi.value) {
      if (item.info.id === i.info.id) {
        item.info.pinCode = i.info.pinCode;
      }
    }
  });

  qfArr.value.forEach(item => {
    for (const i of submitStampListUi.value) {
      if (item.info.id === i.info.id) {
        item.info.pinCode = i.info.pinCode;
      }
    }
  });
  const absoluteSignModes = normalArr.value.map(item => {
    return {
      pinCode: item.info.pinCode,
      posPages: item.pageNum,
      posX: Number((item.left / item.canvasWidth).toFixed(3)),
      posY: Number(
        (
          (item.canvasHeight - item.top - item.height) /
          item.canvasHeight
        ).toFixed(3)
      ),
      sealSn: item.info.id,
      smsCode: ""
    };
  });

  const ridingSignModes = qfArr.value.map(item => {
    return {
      border: "1",
      pinCode: item.info.pinCode,
      sealSn: item.info.id,
      startPageNo: 1,
      endPageNo: pdfRef.value.getPageNum(),
      rate: Number(
        (
          (item.canvasHeight - item.top - item.height) /
          item.canvasHeight
        ).toFixed(3)
      )
    };
  });

  const res = await http.post(`/app/sign/commit`, {
    data: {
      appno: sealInfo.appno,
      signDataList: [
        {
          absoluteSignModes,
          ridingSignModes,
          fileTransNo: `111`
        }
      ]
    }
  });
  appno.value = res.data.appno;
  await http.post("/app/sign/query", {
    data: {
      appno: res.data.appno,
      fileTransNo: `111`
    }
  });
  loadingPdf.value = ElLoading.service({
    lock: true,
    text: "签署中，请耐心等待～",
    background: "rgba(0, 0, 0, 0.7)"
  });
  ElMessage.success("签署成功");
  show.value = false;
  getFile();
};

const docName = ref(JSON.parse(window.localStorage.getItem("docName")));

const getFile = () => {
  timer = setInterval(() => {
    http
      .post("/app/sign/query", {
        data: {
          appno: appno.value,
          fileTransNo: `111`
        }
      })
      .then(res => {
        if (res.data[0].stateMsg == "签署成功") {
          clearInterval(timer);
          timer = null;
          downloadPdf(
            res.data[0].signFileUrl,
            docName.value.endsWith(".pdf")
              ? docName.value
              : docName.value + ".pdf"
          );
          loadingPdf.value.close();
        }
      });
  }, 1500);
};

const signData = ref([]);

const shSign = () => {
  signData.value = pdfRef.value.signSeal();

  const normal = toRaw(signData.value).filter(item => !item.info.uId);
  const qf = toRaw(signData.value).filter(item => item.info.uId);
  const qfList = [];
  for (const i in qf) {
    if (qf[i].pageNum == 1) {
      qfList.push(qf[i]);
    }
  }
  const list = [...normal, ...qfList];
  normalArr.value = normal;
  qfArr.value = qfList;
  const i = uniqueByIdReduce(list, "info", "id");
  submitStampListUi.value = i;
  show.value = true;
};

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
const normalArr = ref([]);
const qfArr = ref([]);

const submitStampListUi = ref([]);

const title = ref(JSON.parse(localStorage.getItem("docName")));
</script>

<template>
  <el-dialog v-model="show" title="签署密码" width="1000">
    <el-table :data="submitStampListUi" style="width: 100%">
      <el-table-column prop="info.name" label="章名称" align="center" />
      <el-table-column label="章图片" align="center">
        <template #default="scope">
          <img
            style="width: 80px; height: 80px"
            :alt="scope.row.info.name"
            :src="getBase64(scope.row.info.pic)"
          />
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template #default="scope">
          <el-input
            v-model="submitStampListUi[scope.$index].info.pinCode"
            style="width: 100px"
            placeholder="请输入密码"
            maxlength="6"
            type="text"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-row style="width: 100%; justify-content: flex-end; margin-top: 20px">
      <el-button type="primary" @click="submit">确认签署</el-button>
    </el-row>
  </el-dialog>
  <ShPdf
    v-if="pdf"
    ref="pdfRef"
    :title="title"
    :pdf-url="pdf"
    :stamp-list="stampList"
    @sign="shSign"
  />
</template>

<style scoped lang="scss">
.header {
  background-color: rgba(66, 9, 12, 0.95);
  width: 100%;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
}
</style>

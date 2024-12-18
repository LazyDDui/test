<script setup lang="ts">
import { onBeforeUnmount, ref, toRaw } from "vue";
import { getSealImg } from "@/api/test";
import { ElMessage } from "element-plus";
import { http } from "@/utils/http";
import { useSeal } from "@/store/useSeal";
import ShPdf from "@/components/ShPdf/index.vue";
import { downloadPdf } from "@/utils/common";

const sign = ref();
const psw = ref();
const pdfInfo = ref();
const appno = ref("");

let timer;

const pdf = ref(JSON.parse(localStorage.getItem("pdf")));
const show = ref(false);

const pdfRef = ref();

const sealList = ref([]);

const error = ref(false);

const { getSubjectId } = useSeal();

const stampList = ref([]);

const getSeal = async () => {
  const { data } = await getSealImg(getSubjectId());
  stampList.value = data.map(item => ({
    ...item,
    id: item.sealSn,
    url: "data:image/jpeg;base64," + item.sealPerPic
  }));
  console.log(data);
  console.log(stampList.value);
};

getSeal();

const submit = async () => {
  if (!psw.value) {
    ElMessage.error("请输入密码!");
    return;
  }
  const sealInfo = JSON.parse(localStorage.getItem("sealInfo"));
  show.value = false;
  const normal = toRaw(signData.value).filter(item => !item.info.uId);
  const qf = toRaw(signData.value).filter(item => item.info.uId);
  const qfList = [];
  for (const i in qf) {
    if (qf[i].pageNum == 1) {
      qfList.push(qf[i]);
    }
  }
  const list = [...normal, ...qfList];
  const commitData = list.map(item => ({
    sealSn: item.info.sealSn,
    posPages: item.pageNum,
    posX: Number((item.left / item.canvasWidth).toFixed(3)),
    posY: Number(
      (
        (item.canvasHeight - item.top - item.height) /
        item.canvasHeight
      ).toFixed(3)
    ),
    sealSignType: item.info.type
  }));

  const res = await http.post(`/app/sign/commit`, {
    data: {
      appno: sealInfo.appno,
      pinCode: psw.value,
      smsCode: "",
      signDataList: [
        {
          fileTransNo: `111`,
          signList: commitData
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
  ElMessage.success("签署成功");
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
        }
      });
  }, 1500);
};

const signData = ref([]);

const shSign = () => {
  signData.value = pdfRef.value.signSeal();
  show.value = true;
};

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const title = ref(JSON.parse(localStorage.getItem("docName")));
</script>

<template>
  <el-dialog v-model="show" title="签署密码" width="500">
    <el-input
      v-model="psw"
      placeholder="请填写签署密码"
      size="default"
      type="text"
      maxlength="6"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">退出</el-button>
        <el-button type="primary" @click="submit"> 确认</el-button>
      </div>
    </template>
  </el-dialog>
  <ShPdf
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

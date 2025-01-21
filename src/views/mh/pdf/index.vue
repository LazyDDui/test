<script setup lang="ts">
import {h, onBeforeUnmount, ref, toRaw} from "vue";
import {getSealImg} from "@/api/test";
import {ElMessage} from "element-plus";
import {http} from "@/utils/http";
import {useSeal} from "@/store/useSeal";
import ShPdf from "@/components/ShPdf/index.vue";
import {
  downLoadFile,
  downloadPdf,
  getBase64,
  preViewFile,
  uniqueByIdReduce
} from "@/utils/common";
import {storeToRefs} from "pinia";
import {ElLoading} from "element-plus";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import {fp} from "@/utils";
import {useRouter} from "vue-router";

const sign = ref();
const psw = ref();
const pdfInfo = ref();
const appno = ref("");

const router = useRouter()

const {getPdf} = useSeal();
const {fileId, sealInfo, docName} = storeToRefs(useSeal());
let timer;

const pdf = ref();

const loadingPdf = ref();

const getPdfFile = async () => {
  console.log(fileId.value);
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

const stampList = ref([]);

const getSeal = async () => {
  const {data} = await getSealImg(1, 100);
  stampList.value = data.records.map(item => ({
    ...item,
    id: item.id,
    url: "data:image/jpeg;base64," + item.pic
  })).filter((i) => {
    return i.status == '1'
  });
};

getSeal();

const submit = async () => {
  if (!submitStampListUi.value.every(item => item.info.pinCode)) {
    ElMessage.error("请输入章密码");
    return;
  }

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
      appno: sealInfo.value.appno,
      signDataList: [
        {
          absoluteSignModes,
          ridingSignModes,
          fileTransNo: `111`
        }
      ]
    }
  });
  if (res.code == "1") {
    message(res.msg, {
      type: "error"
    })
    return
  }
  appno.value = res.data.appno;
  await http.post("/app/sign/query", {
    data: {
      appno: res.data.appno,
      fileTransNo: `111`
    }
  });
  // loadingPdf.value = ElLoading.service({
  //   lock: true,
  //   text: "签署中，请耐心等待～",
  //   background: "rgba(0, 0, 0, 0.7)"
  // });
  loading.value = true
  // ElMessage.success("签署成功");
  show.value = false;
  getFile();
};

const loading = ref(false)

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
        if (res.data[0].state == "2") {
          clearInterval(timer);
          timer = null;
          // loadingPdf.value.close();
          loading.value = false
          message(res.data[0].stateMsg, {
            type: "error"
          });
          return;
        }
        if (res.data[0].state == "0") {
          clearInterval(timer);
          timer = null;
          downloadPdf(
            res.data[0].signFileUrl,
            docName.value.endsWith(".pdf")
              ? docName.value
              : docName.value + ".pdf"
          );
          message("签署成功", {
            type: "success"
          })

          // loadingPdf.value.close();
          loading.value = false
          setTimeout(() => {
            router.replace(`/SignManage`)
          }, 800)
          return;
        }
      });
  }, 1500);
};

const signData = ref([]);

const shSign = () => {
  signData.value = pdfRef.value.signSeal();
  if (signData.value.length == 0) {
    addDialog({
      title: "注意",
      contentRenderer() {
        return h("div", null, "请拖动并添加印章信息");
      }
    });
    return;
  }

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
    loading.value = false
    loadingPdf.value.close();
    clearInterval(timer);
  }
});
const normalArr = ref([]);
const qfArr = ref([]);

const submitStampListUi = ref([]);

const close = () => {
  if (timer) {
    clearInterval(timer)
  }
}
</script>

<template>
  <el-dialog v-model="show" title="签署密码" width="1000">
    <el-table :data="submitStampListUi" style="width: 100%">
      <el-table-column prop="info.name" label="章名称" align="center"/>
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
            type="password"
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
    :title="docName"
    :pdf-url="pdf"
    :stamp-list="stampList"
    @sign="shSign"
  />
  <el-dialog @close="close" v-model="loading" width="300" align-center>
    <div style="text-align: center;display: flex;flex-direction: column;align-items: center">
      <img alt="loading" :src="fp('verify/loading.96e04459.gif')"/>
      <div>签署中，请耐心等待～</div>
    </div>
  </el-dialog>
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

<script setup lang="ts">
import Pdf from "@/components/Pdf/index.vue";
import { onMounted, ref, toRaw } from "vue";
import { getSealImg } from "@/api/test";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { http } from "@/utils/http";
import { request } from "axios";
import { storeToRefs } from "pinia";
import { useSeal } from "@/store/useSeal";

const sign = ref();
const psw = ref();
const pdfInfo = ref();

// const id = useRoute().query.cusNo as string;

let timer;

const pdf = ref(JSON.parse(localStorage.getItem("pdf")));
const show = ref(false);
const qfShow = ref(false);
const imgList = ref([]);

const sealList = ref([]);

const imgs = ref<any[]>([]);

const error = ref(false);

const { getSubjectId } = useSeal();

const getSeal = async () => {
  const { data } = await getSealImg(getSubjectId());
  imgList.value = data.map(item => ({
    ...item,
    id: item.sealSn,
    img: "data:image/jpeg;base64," + item.sealPerPic
  }));
  imgs.value = toRaw(imgList.value);
};

getSeal();

const signFn = () => {
  let objList = [];
  let arr = [];
  show.value = true;
  const l = sign.value.confirmSignature();
  console.log(l);
  objList = Object.values(JSON.parse(localStorage.getItem("signs")));
  for (let i = 0; i < objList.length; i++) {
    for (let j = 0; j < Object.values(objList[i]).length; j++) {
      arr.push(Object.values(objList[i])[j]);
    }
  }
  sealList.value = arr;
};

onMounted(() => {
  localStorage.removeItem("signs");
});

const submit = async () => {
  if (psw.value) {
    const sealInfo = JSON.parse(localStorage.getItem("sealInfo"));
    show.value = false;

    const qfArr = imgList.value.filter(item => item.y);
    let r: any[] = [];

    if (qfAll.value) {
      for (let i = 0; i < qfArr.length; i++) {
        for (let j = 0; j < pdfInfo.value.numPages; j++) {
          r.push({
            sealSn: qfArr[i].sealSn,
            posPages: j + 1,
            posY: Number(qfArr[i].y),
            sealSignType: "1"
          });
        }
      }
    } else {
      r = qfArr.map(item => {
        return {
          sealSn: item.sealSn,
          posPages: 1,
          posY: Number(item.y),
          sealSignType: "1"
        };
      });
    }

    const containArr = sealList.value.map((item: any) => {
      return {
        sealSn: item.sealUrl.sealSn,
        posPages: item.pageNum,
        posX: Number((item.left / item.width).toFixed(3)),
        posY: Number(((item.height - item.top) / item.height).toFixed(3)),
        sealSignType: "0"
      };
    });

    const sealArr: any[] = [];
    if (info.value.all) {
      for (let i = 0; i < containArr.length; i++) {
        for (let j = 0; j < pdfInfo.value.numPages; j++) {
          sealArr.push({
            ...containArr[i],
            posPages: j + 1,
            sealSignType: "0"
          });
        }
      }
    }
    // console.log(sealArr)
    // console.log(info.value.all ?
    //   [...sealArr,...r]
    //   : [...sealList.value.map((item: any) => {
    //     return {
    //       sealSn: item.sealUrl.sealSn,
    //       posPages: item.pageNum,
    //       posX: Number((item.left / item.width).toFixed(3)),
    //       posY: Number(((item.height - item.top) / item.height).toFixed(3)),
    //       sealSignType: info.value.position ? "0" : "1"
    //     };
    //   }),...r])

    http
      .post(`/app/sign/commit`, {
        data: {
          appno: sealInfo.appno,
          pinCode: psw.value,
          smsCode: "",
          signDataList: [
            {
              fileTransNo: `111`,
              signList: info.value.all
                ? [...sealArr, ...r]
                : [
                    ...sealList.value.map((item: any) => {
                      return {
                        sealSn: item.sealUrl.sealSn,
                        posPages: item.pageNum,
                        posX: Number((item.left / item.width).toFixed(3)),
                        posY: Number(
                          ((item.height - item.top) / item.height).toFixed(3)
                        ),
                        sealSignType: "0"
                      };
                    }),
                    ...r
                  ]
            }
          ]
        }
      })
      .then(res => {
        http
          .post("/app/sign/query", {
            data: {
              appno: res.data.appno,
              fileTransNo: `111`
            }
          })
          .then(r => {
            appno.value = res.data.appno;
            ElMessage.success("签署成功");
            getFile();
          });
      });
  } else {
    ElMessage.error("请输入密码!");
  }
};

const appno = ref("");

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
        console.log(res.data[0].stateMsg);
        if (res.data[0].stateMsg == "签署成功") {
          clearInterval(timer);
          timer = null;
          downloadPdf(res.data[0].signFileUrl);
          // res.data.signFileUrl
        }
      });
  }, 1500);
};

const info = ref({
  position: true,
  all: false
});

const qfAll = ref(false);
</script>

<template>
  <div style="background-color: #f3f1f1">
    <el-row class="header">
      <el-row>
        <el-button type="text" style="flex: 1" @click="signFn">签署 </el-button>
        <el-button
          :type="info.position ? `primary` : `info`"
          style="flex: 1"
          @click="info.position = true"
          >绝对定位印章
        </el-button>
        <el-button
          :type="!info.position ? `primary` : `info`"
          style="flex: 1"
          @click="
            info.position = false;
            qfShow = true;
          "
        >
          骑缝章
        </el-button>
        <el-button
          :type="info.all ? `primary` : `info`"
          style="flex: 1"
          @click="info.all = !info.all"
          >是否多页
        </el-button>
      </el-row>
      <el-dialog v-model="qfShow" title="骑缝章" width="500">
        <div>
          是否多页:
          <el-switch v-model="qfAll" />
          <el-row
            v-for="(item, index) in imgList"
            :key="index"
            style="display: flex; margin-bottom: 10px"
          >
            <img
              style="width: 50px; margin-right: 10px; align-items: center"
              :src="item.img"
            />
            <div>位置：</div>
            <el-input
              v-model="imgList[index].y"
              style="width: 200px; height: 40px"
              type="text"
              maxlength="6"
            />
          </el-row>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="qfShow = false">退出</el-button>
            <el-button
              type="primary"
              @click="
                () => {
                  qfShow = false;
                }
              "
            >
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog v-model="show" title="签署密码" width="500">
        <el-input v-model="psw" type="text" maxlength="6" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="show = false">退出</el-button>
            <el-button type="primary" @click="submit"> 确认</el-button>
          </div>
        </template>
      </el-dialog>
    </el-row>
    <div>
      <Pdf
        v-if="imgList.length > 0"
        ref="sign"
        :img-list="imgList"
        :pdf-flow="pdf"
        :info="info"
        @change="
          e => {
            pdfInfo = e;
            console.log(e);
          }
        "
      />
    </div>
  </div>
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

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, UploadFile, UploadInstance } from "element-plus";
import { storeToRefs } from "pinia";
import { preSign, sealUpload } from "@/api/test";
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { fp } from "@/utils";
import { useMainStore } from "@/store/useMainStore";
import { useSeal } from "@/store/useSeal";
import { closeAllDialog } from "@/components/ReDialog/index";
import { v4 as uuidv4 } from "uuid";

onMounted(() => {
  console.log(uuidv4());
});

const { screen } = storeToRefs(useMainStore());

const route = useRoute();
const id = route.query.id;

const upload = ref<UploadInstance>();
const router = useRouter();
const fileNo = ref("111");
const f = ref();
const url = ref({
  fileUrl: "",
  preSignUrl: ""
});

const form = reactive({
  docName: ""
});

const defaultName = ref("");

// const handleExceed: UploadProps["onExceed"] = (files) => {
//   upload.value!.clearFiles();
//   const file = files[0] as UploadRawFile;
//   sealUpload();
//   file.uid = genFileId();
//   upload.value!.handleStart(file);
// };

const submitUpload = () => {
  upload.value!.submit();
};

const change = async (e: UploadFile) => {
  defaultName.value = e.name;
  f.value = e.raw;
  const file = new FormData();
  file.append("file", f.value);
  const { data } = await sealUpload();
  ElMessage.success("上传成功");
  url.value = data;
  localStorage.setItem("pdf", JSON.stringify(url.value.fileUrl));
  console.log(data);
};

// const { screen } = storeToRefs(useMainStore());

const { getSubjectId } = useSeal();

const sign = () => {
  const formData = new FormData();
  formData.append("file", f.value);
  if (url.value.fileUrl && url.value.preSignUrl) {
    preSign(url.value.preSignUrl, formData).then(() => {
      http
        .post("/app/sign/init", {
          data: {
            custNo: getSubjectId(),
            callBackUrl: window.location.href,
            signDataList: [
              {
                fileTransNo: "111",
                signList: [],
                fileTransferMode: "01",
                fileUrl: url.value.fileUrl,
                docName: form.docName ? form.docName : defaultName.value
              }
            ]
          }
        })
        .then(res => {
          closeAllDialog();
          localStorage.setItem("sealInfo", JSON.stringify(res.data));
          ElMessage.success("已发起");
          router.push("/pdf");
        });
    });
  } else {
    ElMessage.error("请先上传文件");
  }
};
</script>

<template>
  <div class="body-content">
    <div class="tc head">
      <h2>发起签章</h2>
    </div>
    <el-form :model="form" :style="{ width: `${screen.width - 200}px` }">
      <el-form-item>
        <template #label>
          <div style="line-height: 40px; font-size: 20px">文件名</div>
        </template>
        <el-input
          v-model="form.docName"
          clearable
          placeholder="请输入文件名（未输入则默认文件名）"
          size="large"
        />
      </el-form-item>
    </el-form>
    <div
      class="search-area"
      :style="{
        width: `${screen.width - 200}px`,
        background: `url('${fp('verify/vertifyBg.jpg')}')`
      }"
    >
      <el-upload
        ref="upload"
        type="file"
        action="#"
        :limit="1"
        accept=".pdf,.doc,.docx"
        :auto-upload="false"
        @change="change"
      >
        <el-button
          style="
            width: 800px;
            background-color: white;
            height: 64px;
            margin-top: 10px;
          "
          @click="submitUpload"
        >
          <img
            alt="upload"
            style="width: 30px; height: 20px"
            :src="fp('verify/下载.png')"
          />
          <div class="upload">
            {{ defaultName ? defaultName : "上传PDF、OFD格式文档" }}
          </div>
        </el-button>
      </el-upload>
      <el-button class="check" @click="sign"> 发起签章</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body-content {
  padding: 100px 0 0 0;
  background: #f8f9fa;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tc {
    text-align: center;
  }

  .head {
    padding: 0 90px;
    margin: -15px 0 0 0;
    margin-bottom: 60px;

    h2 {
      font-weight: 600;
      color: #333;
      font-size: 36px;
    }
  }

  .search-area {
    margin: 0 auto;
    padding: 0 30px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
  }
}

:deep(.el-upload-list__item-info) {
  display: none;
}

.upload {
  cursor: pointer;
  font-size: 16px;
  color: #0a4fd3;
  line-height: 16px;
  margin-left: 10px;
}

.check {
  background-color: #0a4fd3;
  text-align: center;
  color: #fff;
  width: 240px;
  height: 64px;
  font-size: 16px;
  line-height: 64px;
  border-radius: 8px;
  margin-left: 20px;
}
</style>

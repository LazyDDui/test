<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  ElMessage,
  genFileId,
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from "element-plus";
import { storeToRefs } from "pinia";
import {
  downloadFileApi,
  preSign,
  sealUpload,
  uploadFileApi
} from "@/api/test";
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { fp } from "@/utils";
import { useMainStore } from "@/store/useMainStore";
import { useSeal } from "@/store/useSeal";
import { closeAllDialog } from "@/components/ReDialog/index";
import { v4 as uuidv4 } from "uuid";
import { getFileBlob, preViewFile } from "@/utils/common";

onMounted(() => {
  console.log(uuidv4());
});

const { screen } = storeToRefs(useMainStore());
const { fileId } = storeToRefs(useSeal());

const { setFileId } = useSeal();

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

const handleExceed: UploadProps["onExceed"] = async files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  f.value = file.raw;
  const { data } = await uploadFileApi(f.value);
  setFileId(data.fileId);
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

// const submitUpload = () => {
//   upload.value!.submit();
// };

const change = async (e: UploadFile) => {
  defaultName.value = e.name;
  f.value = e.raw;
  const file = new FormData();
  file.append("file", f.value);
  const { data } = await uploadFileApi(f.value);
  setFileId(data.fileId);
};

// const { screen } = storeToRefs(useMainStore());

const { getSubjectId } = useSeal();

const sign = () => {
  if (fileNo.value) {
    http
      .post("/app/sign/init", {
        data: {
          custNo: getSubjectId(),
          signDataList: [
            {
              fileTransNo: "111",
              fileId: fileId.value,
              docName: form.docName ? form.docName : defaultName.value
            }
          ]
        }
      })
      .then(res => {
        localStorage.setItem(
          "docName",
          JSON.stringify(form.docName ? form.docName : defaultName.value)
        );
        closeAllDialog();
        localStorage.setItem("sealInfo", JSON.stringify(res.data));
        ElMessage.success("已发起");
        router.push("/pdf");
      });
  } else {
    ElMessage.error("请先上传文件");
  }
};
</script>

<template>
  <div class="body-content">
    <div
      class="search-area"
      :style="{
        width: `${screen.width - 200}px`
      }"
    >
      <el-button style="flex: 1; background-color: white; height: 64px">
        <img
          alt="upload"
          style="width: 30px; height: 20px"
          :src="fp('verify/下载.png')"
        />
        <div class="upload">
          {{
            defaultName
              ? defaultName
              : "请选择定稿的签署文档（支持PDF、word格式，文件大小<10M）"
          }}
        </div>
      </el-button>
      <el-upload
        ref="upload"
        type="file"
        action="#"
        :limit="1"
        accept=".pdf,.doc,.docx"
        :auto-upload="false"
        :on-exceed="handleExceed"
        @change="change"
      >
        <el-button
          style="
            background-color: #0a4fd3;
            width: 200px;
            height: 64px;
            margin-top: 10px;
            color: #ffffff;
            margin-left: 20px;
          "
          >选择文件</el-button
        >
      </el-upload>
    </div>
    <el-form :model="form" :style="{ width: `${screen.width - 200}px` }">
      <el-form-item>
        <template #label>
          <div style="line-height: 40px; font-size: 20px">文档名称</div>
        </template>
        <el-input
          v-model="form.docName"
          clearable
          placeholder="请输入文件名（未输入则默认文件名）"
          size="large"
        />
      </el-form-item>
      <el-row style="width: 100%; display: flex; justify-content: flex-end">
        <el-button class="check" @click="sign">发起签章</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.body-content {
  padding: 100px 0 0 0;
  //background: #f8f9fa;
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
    height: 140px;
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
  width: 140px;
  height: 50px;
  font-size: 16px;
  line-height: 64px;
  border-radius: 8px;
  margin-left: 20px;
}
</style>

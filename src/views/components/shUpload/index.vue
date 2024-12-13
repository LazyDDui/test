<template>
  <div class="feedback_wrapper">
    <el-upload
      ref="upload"
      :class="'upload_wrapper ' + (hideUpload ? 'hide' : '')"
      list-type="picture-card"
      :limit="limit ? limit : 1"
      :file-list="fileList"
      :show-file-list="true"
      :on-change="fileChange"
      :auto-upload="false"
      accept="image/*"
      :on-exceed="handleExceed"
    >
      <el-icon>
        <Plus />
      </el-icon>
      <template #file="{ file }">
        <div>
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt="ex"
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon>
                <zoom-in />
              </el-icon>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon>
                <Delete />
              </el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full class="full_img" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from "element-plus";
import { http } from "@/utils/http";

type ShUploadProps = {
  limit?: number;
};

const props = defineProps<ShUploadProps>();

const emit = defineEmits(["change"]);

const fileList = ref([]); // 图片列表
const dialogImageUrl = ref(""); // 预览图url
const dialogVisible = ref(false); // 预览弹窗
const hideUpload = ref(false); // 是否隐藏上传按钮
const upload = ref<UploadInstance>();

defineOptions({
  name: "shUpload"
});

// 更新上传加号按钮显示状态
function updateUploadShown() {
  if (fileList.value.length == 3) {
    hideUpload.value = true;
  } else {
    hideUpload.value = false;
  }
}

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

// 文件改变
function fileChange(_file, resfileList) {
  // const formData = new FormData();

  fileList.value = resfileList;
  console.log(fileList.value);
  const file = fileList.value[0];
  // formData.append(file.name, file);
  // console.log(formData)
  http
    .post(
      `/app/file/upload`,
      {
        data: {
          file: file.raw
        }
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(({ data }) => {
      emit("change", data.fileId);
    });
  updateUploadShown();
}

// 移除图片
const handleRemove = file => {
  const list = fileList.value;
  for (const i in list) {
    if (list[i].uid === file.uid) {
      list.splice(i, 1);
    }
  }
  fileList.value = list;
  updateUploadShown();
};
// 预览图片
const handlePictureCardPreview = file => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
</script>
<style lang="scss" scoped>
:deep(.el-upload-list__item-thumbnail) {
  height: auto;
}

:deep(.el-upload-list--picture-card) {
  flex-wrap: nowrap !important;
}
</style>

<template>
  <div class="feedback_wrapper">
    <div v-if="fileList.length < 1">
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-remove="handleRemove"
        :on-change="fileChange"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        accept="image/*"
      >
        <div
          style="
            border: 1px dashed #9ca3af;
            width: 240px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <Camera style="width: 60px; height: 60px"/>
          <div style="font-size: 18px; font-weight: 600">上传</div>
        </div>
      </el-upload>
    </div>
    <div
      v-else
      style="
        border: 1px dashed #9ca3af;
        width: 240px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      "
    >
      <Close
        style="
          width: 20px;
          height: 20px;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          cursor: pointer;
        "
        @click="removeImage"
      />
      <el-image
        style="width: 100%"
        :src="previewFileList[0]"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="previewFileList"
        :initial-index="0"
        fit="cover"
      />
    </div>

    <!--    <el-upload-->
    <!--      v-else-->
    <!--      ref="upload"-->
    <!--      :class="'upload_wrapper ' + (hideUpload ? 'hide' : '')"-->
    <!--      list-type="picture-card"-->
    <!--      :limit="limit ? limit : 1"-->
    <!--      :file-list="fileList"-->
    <!--      :on-change="fileChange"-->
    <!--      :auto-upload="false"-->
    <!--      accept="image/*"-->
    <!--      :on-exceed="handleExceed"-->
    <!--    >-->
    <!--      <el-icon>-->
    <!--        <Plus />-->
    <!--      </el-icon>-->
    <!--      <template #file="{ file }">-->
    <!--        <div>-->
    <!--          <img-->
    <!--            class="el-upload-list__item-thumbnail"-->
    <!--            :src="file.url"-->
    <!--            alt="ex"-->
    <!--          />-->
    <!--          <span class="el-upload-list__item-actions">-->
    <!--            <span-->
    <!--              class="el-upload-list__item-preview"-->
    <!--              @click="handlePictureCardPreview(file)"-->
    <!--            >-->
    <!--              <el-icon>-->
    <!--                <zoom-in />-->
    <!--              </el-icon>-->
    <!--            </span>-->
    <!--            <span-->
    <!--              class="el-upload-list__item-delete"-->
    <!--              @click="handleRemove(file)"-->
    <!--            >-->
    <!--              <el-icon>-->
    <!--                <Delete />-->
    <!--              </el-icon>-->
    <!--            </span>-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </el-upload>-->
    <el-dialog v-model="dialogVisible">
      <img w-full class="full_img" :src="dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {Delete, Plus, ZoomIn, Camera, Close} from "@element-plus/icons-vue";
import Add from "@iconify-icons/ri/add-box-fill";
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from "element-plus";
import {http} from "@/utils/http";
import {fileToBase64, getBase64} from "@/utils/common";
import {v4 as uuidv4} from "uuid";

type ShUploadProps = {
  limit?: number;
  uploadUrl?: string;
  imgs?: string[];
};

defineOptions({
  name: "ShImageUpload"
});

const props = defineProps<ShUploadProps>();

const emit = defineEmits(["change", "getBase64"]);

const fileList = ref((props.imgs && props.imgs[0]) ? props.imgs.map((i)=>getBase64(i)) : []); // 图片列表
const dialogImageUrl = ref(""); // 预览图url
const dialogVisible = ref(false); // 预览弹窗
const hideUpload = ref(false); // 是否隐藏上传按钮
const upload = ref<UploadInstance>();

const previewFileList = ref((props.imgs && props.imgs[0]) ? props.imgs.map((i)=>getBase64(i)) : []);


watch(() => props.imgs, (value) => {
  if (value && value[0]) {
    previewFileList.value = value.map((item)=>getBase64(item))
    fileList.value = value.map((item)=>getBase64(item))
  }
})

const removeImage = () => {
  fileList.value = [];
  previewFileList.value = [];
  emit("change", "");
  emit("getBase64", "");
};

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
const fileChange = async (_file, resfileList) => {
  // const formData = new FormData();

  fileList.value = resfileList;
  const data = await fileToBase64(fileList.value[0].raw);
  previewFileList.value = [data];
  const file = fileList.value[0];

  emit("getBase64", data);

  // formData.append(file.name, file);
  // console.log(formData)
  if (props.uploadUrl) {
    http.post(props.uploadUrl, {
        data: {
          file: file.raw
        }
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(({data}) => {
      emit("change", data.fileId)
    })
  } else {
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
      .then(({data}) => {
        emit("change", data.fileId);
      });
    updateUploadShown();
  }

};

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

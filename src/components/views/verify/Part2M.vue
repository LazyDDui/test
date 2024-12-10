<script setup lang="ts">
import {ref} from 'vue'
import {genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import { fp } from "@/utils";

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>

<template>
  <div class="body-content">
    <div class="tc head">
      <h2></h2>
    </div>
    <div class="search-area" :style="{background:`url('${fp('verify/vertifyBg.jpg')}')`}">
      <el-upload
          ref="upload"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          @change="(e)=>{console.log(e)}"
      >
        <el-button style="width: 80vw;background-color: white;height: 64px;margin-top: 10px;" @click="submitUpload">
          <img alt="upload" style="width: 30px;height: 20px;" :src="fp('verify/下载.png')">
          <div class="upload">上传PDF、OFD格式文档</div>
        </el-button>
      </el-upload>
      <el-button class="check">
        立即验证
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body-content {
  padding: 50px 0 0 0;
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
    margin-bottom: 30px;
    font-weight: 600;
    color: #333;

    h2 {
      font-size: 24px;
    }
  }


  .search-area {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-size: 100% 100%;
    padding: 50px 5%;
    margin-bottom: 80px;
    width: 100%;
  }
}

.check {
  background-color: #0a4fd3;
  text-align: center;
  color: #fff;
  width: 80vw;
  height: 50px;
  border-radius: 50px;
  font-size: 16px;
  line-height: 64px;
}

.upload {
  cursor: pointer;
  font-size: 16px;
  color: #0a4fd3;
  line-height: 16px;
  margin-left: 10px;
}
</style>

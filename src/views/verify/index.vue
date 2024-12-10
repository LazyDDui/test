<script setup lang="ts">
import {ref, toRaw} from 'vue'
import {genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile, UploadUserFile} from 'element-plus'
import {ElMessage} from 'element-plus'
import {storeToRefs} from "pinia";
import {useMainStore} from "@/store/useMainStore";
import {checkFile} from "@/api/test"
import { fp } from "@/utils";

const isDisabled = ref<boolean>(false)
const centerDialogVisible = ref<boolean>(false)
const uploadRef = ref<UploadInstance>()
const dialogVisible = ref<boolean>(false)
const flag = ref<boolean>(false)
const btnFlag = ref<boolean>(true)
const list = ref<any[]>([])
const name = ref<string>('上传PDF、OFD格式文档')
const chkFile = ref<object>(null)
const isShow = ref<boolean>(false)
const submitUpload = async () => {
  if (!chkFile.value) {
    centerDialogVisible.value = true
  } else {
    if (btnFlag.value) {
      dialogVisible.value = true
      const formData = new FormData();
      formData.append('file', chkFile.value);
      const res = await checkFile(formData)
      console.log(res)
      if (res.code == '00') {
        if (res.data && res.data.length > 0) {
          isShow.value = false
          list.value = res.data
          flag.value = true
          isDisabled.value = true
          btnFlag.value = false
          dialogVisible.value = false
        } else {
          isShow.value = true
          list.value = res.data
          flag.value = true
          isDisabled.value = true
          btnFlag.value = false
          dialogVisible.value = false
        }
      } else {
        ElMessage({
          message: '服务器内部错误',
          type: 'error',
        })
        dialogVisible.value = false
      }
    } else {
      btnFlag.value = true
      flag.value = false
      list.value = []
      isDisabled.value = false
      name.value = '上传PDF、OFD格式文档'
      chkFile.value = null
    }
  }
}
const handleChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile)
  name.value = uploadFile.name
  chkFile.value = uploadFile.raw
}
const handleExceed = (file, files) => {
  console.log('reChange', file, files)
  name.value = files[0].name
  chkFile.value = files[0].raw
}
const handleProgress = (ev, file, files) => {
  console.log('pro', ev, file, files)
}
const {screen} = storeToRefs(useMainStore())
</script>

<template>
  <div class="body-content">
    <div class="tc head">
      <h2>签章验证</h2>
    </div>
    <div class="search-area" :style="{width:`${screen.width - 200}px`,background:`url('${fp('verify/vertifyBg.jpg')}')`}">
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="#"
        :auto-upload="false"
        :limit="1"
        :disabled="isDisabled"
        :on-change="handleChange"
        :on-exceed="handleExceed"
      >
        <el-button style="width: 800px;background-color: white;height: 64px;margin-top: 10px;">
          <img alt="upload" style="width: 30px;height: 20px;" :src="fp('verify/下载.png')">
          <div class="upload">{{ name }}</div>
        </el-button>
      </el-upload>
      <el-button @click="submitUpload()" class="check">
        {{ btnFlag ? '立即验证' : '取消' }}
      </el-button>
    </div>
    <div class="result" v-if="flag">
      <div class="result-title" :style="{backgroundImage:`url('${fp(`verify/line.b0fea2b9.png`)}')`}">
        验证结果
      </div>
      <div class="table-bg">
        <div v-if="!isShow">
          <div class="title">
            <span class="dot"></span>验证结果
          </div>
          <div class="table">
            <div class="row">
              <div class="col">
              <span class="success-color">
                <img style="margin-right: 10px" :src="fp('verify/无标题.png')">
                自签章后，文档未被篡改
                <img style="margin-left: 10px" :src="fp('verify/success.png')">
              </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isShow">
          <div class="title">
            <span class="dot"></span>基本信息
          </div>
          <div class="table">
            <div class="row">
              <div class="col">
                      <span class="warning-color">
                        <span style="color: #000">签章有效性：</span>
                        <span>文档内未检测到有效电子签章</span>
                      </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isShow">
          <div class="title">
            <span class="dot"></span>签署信息<span style="font-size: 14px">（文档中共有 <span
            style="color: #5080f7">{{ list.length }}</span> 个签章）</span>
          </div>
          <div class="bt-table-content" style="display: flex;justify-content: space-between;flex-wrap: wrap;">
            <div class="tb-table" v-for="(item,index) in list" :key="index">
              <div class="tb-row">
                <div class="tb-col seal-sign">
                  <label>印章图像：</label>
                  <span style="line-height: 190px;">
                <img style="width: 142px" :src="'data:image/png;base64,' + item.sealPerPic">
              </span>
                </div>
              </div>
              <div class="tb-row">
                <div class="tb-col">
                  <label>签署主体：</label>
                  <span>{{ item.signSub }}</span>
                </div>
              </div>
              <div class="tb-row">
                <div class="tb-col">
                  <label>签章时间：</label>
                  <span>{{ item.signTime }}</span>
                </div>
              </div>
              <!--              <div class="tb-row">-->
              <!--                <div class="tb-col">-->
              <!--                  <label>印章有效期 ：</label>-->
              <!--                  <span><img src="/verify/guo.png" width="25px" height="25px">&nbsp;&nbsp;{{-->
              <!--                      item.expDate-->
              <!--                    }}</span>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="tb-row">
                <div class="tb-col">
                  <label>制作服务平台：</label>
                  <span><img :src="fp('verify/hui.png')" width="25px" height="25px">&nbsp;&nbsp;全国电子印章管理与服务平台江西省平台 </span>
                </div>
              </div>
              <div class="tb-row">
                <div class="tb-col">
                  <label>备案服务单位：</label>
                  <span><img :src="fp('verify/hui.png')" width="25px"
                             height="25px">&nbsp;&nbsp;公安部第三研究所</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title=""
      width="300"
      align-center
    >
      <div style="text-align: center">
        <img :src="fp('verify/loading.96e04459.gif')">
      </div>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible"
      title="提示"
      width="422"
      align-center
    >
      <span>请选择文件</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
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

  .result {
    padding: 100px 0;

    .result-title {
      width: 1200px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 400;
      color: #1344a1;
      background-size: 100% 100%;
    }

    .table-bg {
      margin-top: 100px;

      .bt-table-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 1200px;
      }

      .tb-table {
        margin-top: 20px;
        margin-bottom: 10px;
        position: relative;
        width: 48.8%;


        .tb-row:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        .tb-row:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-bottom: 1px solid #ccc;
        }

        .tb-row {
          line-height: 45px;
          display: flex;
          line-height: 46px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-bottom-width: 1px;
          border-bottom-style: solid;
          border-bottom-color: rgb(204, 204, 204);
          border-bottom: none;

          .seal-sign {
            height: 190px;
          }

          .tb-col {
            padding: 0 10px 0 30px;
            flex: 1;
            display: flex;
            color: #666;
            font-weight: bold;
            font-size: 16px;

            label {
              color: #333;
              font-weight: bold;
              font-size: 16px;
            }
          }
        }
      }

      .table {
        margin-top: 20px;
        margin-bottom: 10px;
        position: relative;

        .tb-row:first-child {

        }

        .row {
          border: 1px solid #ccc;
          border-radius: 5px;
          height: 45px;
          background-color: #fbfbfb;

          .col {
            padding: 0 10px 0 30px;
            color: #666;
            font-size: 16px;

            .success-color {
              height: 45px;
              color: #5fbf5b;
              display: flex;
              align-items: center;
              flex: 1;
            }

            .warning-color {
              height: 45px;
              color: #e07169;
              font-weight: bold;
              display: flex;
              align-items: center;
              flex: 1;
            }
          }
        }
      }

      .title {
        position: relative;
        text-align: left;
        font-size: 18px;
        font-weight: 400;
        color: #333;
        line-height: 24px;
        margin: 30px 0 0 0;

        .tip {
          font-size: 14px;
        }

        .dot {
          display: block;
          position: absolute;
          left: -16px;
          top: 2px;
          width: 6px;
          height: 20px;
          background: #4081ff;
          border-radius: 0 2px 2px 0;
        }
      }
    }
  }

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

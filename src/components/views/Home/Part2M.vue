<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref} from "vue";
import { fp } from "@/utils";

let timer: any

const list = ["政务服务", "能源行业", "医疗行业", "金融行业", "教育行业", "电商行业", "快消行业"]

const type = ref('政务服务')
const index = ref(0)

onMounted(() => {
  timer = setInterval(() => {
    if (index.value === list.length - 1) {
      index.value = 0
      type.value = list[index.value]
    } else {
      index.value++
      type.value = list[index.value]
    }
  }, 2000)
})

onBeforeUnmount(() => {
  if(timer){
    clearInterval(timer)
  }
})

const pMap = new Map([
  ['政务服务', "实现电子印章在政务服务中的应用，推动行政审批和许可证件的电子化管理，提高政务服务的效率，助力政府数字化转型和智慧政务建设。"],
  ["能源行业", "适用于庞大组织架构下的印控管理，实现用印权限精准分配，确保每一项操作都在授权范围内。"],
  ["医疗行业", "提供通过手写板采集身份证信息、手绘签名的电子签署方案，帮助患者快速签署医疗文书。"],
  ["金融行业", "提供人脸、音频等多种意愿认证签署方式，让金融业务更加安全、合规"],
  ["教育行业", "集成学校教务管理系统，推动电子成绩单、电子学籍证明在线签发、学信网验真。"],
  ["电商行业", "为电商交易提供合规的签署和认证，服务包括订单、物流、供应链管理、售后、交易纠纷等各环节，提高交易的安全性、便捷性，为买卖双方提供更好的交易体验。"],
  ["快消行业", "实现不受时间地域限制的在线签署功能，助力快消企业高效地整合行业优质资源，提升购销流程效率，保障生产经营秩序的正常运行。"]
])

const ImageMap = new Map([
  ["政务服务", fp('index/zwfw.jpg')],
  ["能源行业", fp('index/nyhy.jpg')],
  ["医疗行业", fp('index/ylhy.jpg')],
  ["金融行业", fp('index/jrhy.jpg')],
  ["教育行业", fp('index/jyhy.jpg')],
  ["电商行业", fp('index/dshy.jpg')],
  ["快消行业", fp('index/kxhy.jpg')],
])

</script>

<template>
  <div style="width: 100%;display: flex;background-color: #fff;height: 200px">
    <img style="width: 50%;object-fit: cover;height: 200px;" :src=ImageMap.get(type) :alt="type"/>
    <div
        style="height: 200px;padding: 30px 15px 0 15px;width:50%;background: url('/index/icodouhao.png')no-repeat;background-size:100%;">
      <div style="font-size: 20px;margin-bottom: 10px;font-weight: 600;">{{ type }}</div>
      <p style="color:#999;font-size: 13px;line-height: 20px;">{{ pMap.get(type) }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

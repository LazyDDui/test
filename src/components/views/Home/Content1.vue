<script setup lang="ts">
import {useMainStore} from "@/store/useMainStore";
import {storeToRefs} from "pinia";
import { fp } from "@/utils";

type Content1Props = {
  type: '公安备案' | '全国互认' | '一键核验' | '安全管理' | '安全签署'
}

defineProps<Content1Props>()

const {isMobile} = storeToRefs(useMainStore())

const pMap = new Map([
  ["公安备案", "全国电子印章管理与服务平台省级平台制发的电子印章具备公安部第三研究所开具的唯一电子印章备案证明，具备权威性和公信力。"],
  ["全国互认", "全国电子印章管理与服务平台省级平台制发的电子印章，签署的电子签章文件，能在全国32个省级平台进行统一验证，全国互通互认。"],
  ["一键核验", "全国电子印章管理与服务平台省级平台规范电子印章制作、备案及用章流程，实现电子印章跨区域、跨部门、跨平台应用。"],
  ["安全管理", "基于商用密码技术和完善的电子印章安全防护能力和密钥管理机制，实现密钥全生命周期的安全管理，保障用印安全。"],
  ["安全签署", "电子印章的应用，通过身份认证、意愿认证、商用密码技术、可信时间戳等能力，为用户提供安全、可靠的用印服务。"]
])

const imgMap = new Map([
  ["公安备案", fp('index/gaba.png')],
  ["全国互认", fp('index/qghr.png')],
  ["一键核验", fp('index/yzty.png')],
  ["安全管理", fp('index/aqgl.png')],
  ["安全签署", fp('index/aqqs.png')],
])

const btnMap = [
  {
    type: "公安备案",
    btn: ["即刻申领", "全国备案", "安全应用"]
  },
  {
    type: "全国互认",
    btn: ["签署保密", "统一验证", "全国互认"]
  },
  {
    type: "一键核验",
    btn: ["多端互通", "一键核验", "便捷高效"]
  },
  {
    type: "安全管理",
    btn: ["密钥管理系统", "专用智能密码钥匙"]
  },
  {
    type: "安全签署",
    btn: ["全链路存证", "可信时间戳"]
  }
]

</script>

<template>
  <div :style="{padding:isMobile?`20px 40px`:`40px 80px`}">
    <img :alt="type" :style="{width:'100%'}" :src="imgMap.get(type)"/>
    <div class="title" :style="{fontSize:isMobile?`20px`:`30px`,marginTop:`39px`,marginBottom:`30px`}">{{ type }}</div>
    <p :style="{color:`#999999`,marginBottom:`25px`,fontSize:isMobile?`14px`:`16px`,lineHeight:`24px`}">
      {{ pMap.get(type) }}</p>
    <div
        :style="{marginBottom:`10px`,color:`#1D76F9`,border:`1px solid #1D76F9`,padding:`4px 15px`,fontSize:isMobile?`14px`:`18px`,display:`inline-block`,marginRight:`15px`}"
        v-for="(item,index) in btnMap.find((i)=>i.type=== type)?.btn" :key="index">{{ item }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-weight: 600;
}
</style>

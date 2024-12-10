<script setup lang="ts">

import {useMainStore} from "@/store/useMainStore";
import {ref} from "vue";
import Content1 from '@/components/views/Home/Content1.vue'
import Part2 from '@/components/views/Home/Part2.vue'
import Part2M from '@/components/views/Home/Part2M.vue'
import Part3 from '@/components/views/Home/Part3.vue'
import Part3M from '@/components/views/Home/Part3M.vue'
import Part4 from '@/components/views/Home/Part4.vue'
import Part4M from '@/components/views/Home/Part4M.vue'
import {storeToRefs} from "pinia";
import { fp } from "@/utils";


const banners = [
  fp('index/banner1.jpg'),
  fp('index/banner2.jpg'),
  fp('index/banner3.jpg'),
  fp('index/banner4.jpg'),
]

const content1 = ref([
  {
    label: '公安备案',
    icon: fp('index/icotbas1.png'),
    select: true,
  },
  {
    label: '全国互认',
    icon: fp('index/icotbas2.png'),
    select: false,
  },
  {
    label: '一键核验',
    icon: fp('index/icotbas3.png'),
    select: false,
  },
  {
    label: '安全管理',
    icon: fp('index/icotbas4.png'),
    select: false,
  },
  {
    label: '安全签署',
    icon: fp('index/icotbas4.png'),
    select: false,
  }
])

const part2 = ref([
  {
    label: "政务服务",
    icon: fp('index/icocase1.png'),
    select: true
  },
  {
    label: "能源行业",
    icon: fp('index/icocase2.png'),
    select: false
  },
  {
    label: "医疗行业",
    icon: fp('index/icocase3.png'),
    select: false
  },
  {
    label: "金融行业",
    icon: fp('index/icocase4.png'),
    select: false
  },
  {
    label: "教育行业",
    icon: fp('index/icocase5.png'),
    select: false
  },
  {
    label: "电商行业",
    icon: fp('index/icocase6.png'),
    select: false
  },
  {
    label: "快消行业",
    icon: fp('index/icocase7.png'),
    select: false
  }
])

const renderComponent = () => {
  return content1.value.find((item) => item.select)?.label
}

const part2Render = () => {
  return part2.value.find((item) => item.select)?.label
}

const content1Change = (label: string) => {
  content1.value.forEach((item) => {
    item.select = item.label === label;
  })
}

const part2Change = (label: string) => {
  part2.value.forEach((item) => {
    item.select = item.label === label;
  })
}

const mainStore = useMainStore()
const {isMobile} = storeToRefs(useMainStore())

</script>

<template>
  <div style="position: relative;">
    <div v-if="!mainStore.isMobile"
         style="left: 50vw;transform: translateX(-50%);position: absolute;top:30vh;color:#fff;z-index: 2">
      <div style="display: flex;align-items: center;white-space: nowrap;">
        <v-img :width="60" :height="68" :src="fp('index/icoguohui.png')"></v-img>
        <div style="font-size: 40px;margin-left:10px;font-weight: 600;">全国电子印章管理与服务平台省级平台</div>
      </div>
      <div style="display: flex;font-size: 33px;width: 100%;justify-content: space-between;">
        <div class="head-desc">公安备案</div>
        <div class="head-desc">全国互认</div>
        <div class="head-desc">一键核验</div>
      </div>
    </div>
    <div v-if="mainStore.isMobile"
         style="left: 50vw;transform: translateX(-50%);margin:0 auto;position: absolute;top:30vh;color:#fff;z-index: 2">
      <div style="display: flex;flex-direction: column;align-items: center;white-space: nowrap;">
        <v-img :width="60" :height="68" :src="fp('index/icoguohui.png')"></v-img>
        <div style="font-size: 20px;margin-top:10px;font-weight: 600;">全国电子印章管理与服务平台省级平台</div>
      </div>
      <div style="display: flex;font-size: 18px;width: 100%;justify-content: space-between;">
        <div class="head-desc-m ">公安备案</div>
        <div class="head-desc-m ">全国互认</div>
        <div class="head-desc-m ">一键核验</div>
      </div>
    </div>
    <el-carousel :style="{width:`${mainStore.deviceInfo.width}px`}"
                 :height="mainStore.deviceInfo.height+'px'"
                 arrow="nenver" motion-blur>
      <el-carousel-item v-for="(banner, i) in banners" :key="i">
        <v-img cover :width="mainStore.deviceInfo.width" :height="mainStore.deviceInfo.height" :src="banner"></v-img>
      </el-carousel-item>
    </el-carousel>
    <div style="display: flex;justify-content: center;width: 100vw;margin:80px 0;">
      <div
          :style="{width:mainStore.isMobile?`${mainStore.deviceInfo.width}px`:`${mainStore.screen.width - 260}px`,height:mainStore.isMobile?`calc(${mainStore.deviceInfo.height}px - 20vh)`:`${mainStore.screen.height - 180}px`,display:`flex`}">
        <div
            style="padding-top: 58px;flex:1;height: 100%;margin-right: 20px;background-color: #F5F8FF;display: flex;flex-direction: column">
          <div
              @mouseenter="content1Change(item.label)"
              :class="{
            content:!mainStore.isMobile,
            contentM:mainStore.isMobile,
            shActive:item.select
              }"
              v-for="(item,index) in content1" :key="index">
            <img :alt="item.label" :width="mainStore.isMobile?20:30" :height="mainStore.isMobile?20:30"
                 :src="item.icon"/>
            <div :class="{
              contentLabel:!mainStore.isMobile,
              contentLabelM:mainStore.isMobile
            }">{{ item.label }}
            </div>
          </div>
        </div>
        <div style="flex:3;height: 100%;background-color: #F5F8FF">
          <Content1 :type="renderComponent() as any"/>
        </div>
      </div>
    </div>
    <div
        v-if="!isMobile"
        class="part2"
        :style="{background: `url('${fp('index/part2bg.jpg')}')`,padding:isMobile?`50px 0 40px 0`:`80px 0 100px 0`,width:`100vw`,display:'flex',justifyContent:'center'}">
      <div
          :style="{width:mainStore.isMobile?`${mainStore.deviceInfo.width}px`:`${mainStore.screen.width - 260}px`,height:mainStore.isMobile?`calc(${mainStore.deviceInfo.height}px - 20vh)`:`${mainStore.screen.height - 180}px`}">
        <div :style="{textAlign:`center`,paddingBottom:`20px`,fontSize:isMobile?`24px`:`36px`,fontWeight:600}">
          智能解决方案
        </div>
        <p :style="{marginBottom:`50px`,padding:`0 100px`,textAlign:'center',fontSize:isMobile?`14px`:`16px`,color:`#999`,lineHeight:isMobile?`22px`:`30px`,}">
          构建场景化电子签章应用，依照业务需求提供丰富的行业及场景的签字签章应用选项，满足多样化签署需求，围绕政务服务、能源、医疗、金融、教育、电商、快消等行业，输出细分领域解决方案，提供全面市场支持服务。</p>
        <div style="display: flex;justify-content: center;width: 100%;">
          <div v-for="(item,index) in part2" :key="index"
               style="flex:1;border-bottom: 2px solid #eee;display: flex;justify-content: center;">
            <div
                @mouseenter="part2Change(item.label)"
                :class="{
              partActive:item.select
            }"
                style="border-bottom:transparent 3px solid;width: 90px;flex-direction: column;align-items: center;display: flex;cursor: pointer;">
              <img :style="{width:`90px`,height:`90px`}" :alt="item.label" :src="item.icon"/>
              <div style="margin-top: 25px;margin-bottom: 30px;font-size: 20px;">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <Part2 :type="part2Render() as any"></Part2>
      </div>


    </div>
    <div v-if="isMobile"
         :style="{background: `url('${fp('index/part2bg.jpg')}')`,padding:isMobile?`50px 0 40px 0`:`80px 0 100px 0`,width:`100vw`,display:'flex',flexDirection:'column',justifyContent:'center'}">
      <div :style="{textAlign:`center`,paddingBottom:`20px`,fontSize:isMobile?`24px`:`36px`,fontWeight:600}">
        智能解决方案
      </div>
      <p :style="{marginBottom:`10px`,padding:`10px`,textAlign:'center',fontSize:`14px`,color:`#999`,lineHeight:`22px`}">
        构建场景化电子签章应用，依照业务需求提供丰富的行业及场景的签字签章应用选项，满足多样化签署需求，围绕政务服务、能源、医疗、金融、教育、电商、快消等行业，输出细分领域解决方案，提供全面市场支持服务。</p>
      <Part2M></Part2M>
    </div>
    <div
        :style="{padding:isMobile?`50px 0 40px 0`:`80px 0 100px 0`,width:`100vw`,display:'flex',justifyContent:'center'}">
      <div
          :style="{width:mainStore.isMobile?`${mainStore.deviceInfo.width}px`:`${mainStore.screen.width - 260}px`,}">
        <div :style="{textAlign:`center`,paddingBottom:`20px`,fontSize:isMobile?`24px`:`36px`,fontWeight:600}">
          多平台 全场景
        </div>
        <p :style="{marginBottom:`10px`,padding:`10px`,textAlign:'center',fontSize:`14px`,color:`#999`,lineHeight:`22px`}">
          构建场景化电子签章应用，依照业务需求提供丰富的行业及场景的签字签章应用选项，满足多样化签署需求，围绕政务服务、能源、医疗、金融、教育、电商、快消等行业，输出细分领域解决方案，提供全面市场支持服务。</p>
        <Part3 v-if="!isMobile"></Part3>
        <Part3M v-else></Part3M>
      </div>
    </div>

    <div
        :style="{backgroundColor:'#f5f7fa',padding:isMobile?`50px 0 40px 0`:`80px 0 100px 0`,width:`100vw`,display:'flex',justifyContent:'center'}">
      <div
          :style="{width:mainStore.isMobile?`${mainStore.deviceInfo.width}px`:`${mainStore.screen.width - 260}px`,}">
        <div :style="{textAlign:`center`,paddingBottom:`20px`,fontSize:isMobile?`24px`:`36px`,fontWeight:600}">
          资讯动态
        </div>
        <Part4 v-if="!isMobile"></Part4>
        <Part4M v-else></Part4M>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
:deep(.el-carousel__button) {
  // 自定义按钮的背景颜色
  background-color: #ffffff;
  // 自定义按钮的边框
  border: 2px solid #ffffff;
  // 自定义按钮的宽度和高度
  width: 40px;
  height: 2px;
  // 自定义按钮的阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 1;
}

:deep(.el-carousel__indicators) {
  white-space: nowrap;
}

:deep(.is-active .el-carousel__button) {
  // 自定义按钮的背景颜色
  background-color: #1D76F9;
  // 自定义按钮的边框
  border: 2px solid #1D76F9;
  // 自定义按钮的宽度和高度
  width: 40px;
  height: 2px;
  // 自定义按钮的阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.el-carousel__button--active) {
  background-color: #1D76F9;
}

:deep(.el-carousel__button:hover) {
  // 悬停和激活状态下的样式
  background-color: #1D76F9;
  border-color: #1D76F9;
}

.head-desc {
  margin-top: 30px;
  //padding: 0 38px;
  letter-spacing: 16px;
  padding: 0 16px;
  font-weight: 600;
}

.head-desc-m {
  margin-top: 20px;
  //padding: 0 38px;
  letter-spacing: 0;
  padding: 0 16px;
  font-weight: 600;
}

.contentM {
  cursor: pointer;
  height: 80px;
  margin-bottom: 37px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-left: transparent 2px solid;
}

.contentLabel {
  font-size: 28px;
  margin-left: 20px;
  font-weight: 500;
}

.contentLabelM {
  font-size: 16px;
  font-weight: 500;
}

.content {
  cursor: pointer;
  height: 80px;
  margin-bottom: 37px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: transparent 2px solid;
}

.shActive {
  border-left: #1D76F9 2px solid;
  background-color: #E3ECFC;
}

.partActive {
  border-bottom: #007aff 3px solid !important;
}
</style>

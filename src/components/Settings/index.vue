<template>
  <div style="position: fixed; right: 20px; top: 60vh; z-index: 99">
    <div style="display: flex;flex-direction: column;">
      <div class="feedback"
           :style="{width:isMobile?`72px`:`90px`,height:isMobile?`72px`:`90px`}"
             @click="()=> router.push(`/feedback`)">
        <div style="display: flex;flex-direction: column;align-items: center">
          <v-img :width="isMobile?26:32" :height="isMobile?26:32" :src="fp('index/icofeedback.png')"></v-img>
          <div class="mt-1" :style="{fontSize:isMobile?`12px`:`16px`}">意见反馈</div>
        </div>
      </div>
      <div v-if="toTopShow" class="feedback mt-10"
           :style="{width:isMobile?`72px`:`90px`,height:isMobile?`72px`:`90px`}"
           @click="toTop">
        <div style="display: flex;flex-direction: column;align-items: center">
          <v-img :width="isMobile?26:32" :height="isMobile?26:32" :src="fp('index/toTop.png')"></v-img>
          <div class="mt-1" :style="{fontSize:isMobile?`12px`:`16px`}">返回顶部</div>
        </div>
      </div>
      <!--      <v-btn style="margin-top: 10px;" icon="" size="large" color="primary" @click="mainStore.onDrawer">-->
      <!--        <v-icon icon="mdi-cog" size="large"/>-->
      <!--      </v-btn>-->
    </div>

  </div>
</template>
<script setup lang="ts">
import {useMainStore} from '@/store/useMainStore'
import {useRouter} from "vue-router";
import { fp } from "@/utils";
import {storeToRefs} from "pinia";

const router = useRouter()

const toTop = () => {
  window.scrollTo(0, 0)
}

const {toTopShow,isMobile} = storeToRefs(useMainStore())
</script>
<style lang="scss">
.settings-btns-picker {
  display: flex;
  flex-wrap: wrap;

  .v-btn {
    margin-right: 16px;
    margin-bottom: 16px;
  }
}

.feedback {
  position: relative;
  transition: 1s;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(25,43,68,0.1);
}

.feedback:hover {
  transform: translateY(10px);
  background-color: rgb(230, 240, 254);
}
</style>

<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());
</script>

<template>
  <div style="background-color: #f5f7fa">
    <ShContainer :is-mob="isMobile">
      <div
        :class="{
          p4: !isMobile,
          p4M: isMobile
        }"
      >
        <div class="title">关注我们</div>
        <ul class="flex">
          <li class="flex">
            <div class="img">
              <img alt="" :src="fp('about/a1.jpg')" />
            </div>
            <p>腾讯视频号</p>
          </li>
          <li class="flex">
            <div class="img">
              <img alt="" :src="fp('about/a2.jpg')" />
            </div>
            <p>抖音视频号</p>
          </li>
          <li class="flex">
            <div class="img">
              <img alt="" :src="fp('about/a3.jpg')" />
            </div>
            <p>微信公众号</p>
          </li>
        </ul>
      </div>
    </ShContainer>
  </div>
</template>

<style scoped lang="scss">
.p4 {
  padding: 100px 0;

  .flex {
    display: flex;
  }

  .title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 20px;
  }

  ul {
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;

    li {
      justify-content: center;
      flex-direction: column;
      background: #fff;
      width: 384px;
      height: 280px;
      box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
      text-align: center;
      list-style: none;

      img {
        width: 130px;
        height: 130px;
        border: 0;
        vertical-align: middle;
      }

      p {
        padding: 30px 0 0 0;
        font-weight: 500;
        font-size: 18px;
        color: #344264;
        line-height: 24px;
      }
    }
  }
}

.p4M {
  padding: 50px 0;

  .title {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 15px;
  }

  ul {
    padding-top: 25px;
    display: block;

    li {
      padding: 20px 0;
      width: 100%;
      height: auto;
      justify-content: center;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
      text-align: center;
      list-style: none;

      img {
        width: 150px;
        height: 150px;
        border: 0;
        vertical-align: middle;
      }

      p {
        padding: 15px 0 0 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        color: #344264;
      }
    }
  }
}
</style>

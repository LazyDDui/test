<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());
</script>

<template>
  <ShContainer :is-mob="isMobile">
    <div
      :class="{
        p3: !isMobile,
        p3M: isMobile
      }"
    >
      <div class="title">联系我们</div>
      <ul class="flex">
        <li>
          <div class="item">
            <div class="top">
              <img alt="1" :src="fp('about/icoc1.png')" />
              <strong>渠道合作</strong>
            </div>
            <div class="desc">咨询商务、媒体、渠道、活动等市场合作</div>
            <div class="no">19308027881</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="top">
              <img alt="1" :src="fp('about/icoc2.png')" />
              <strong>产品服务</strong>
            </div>
            <div class="desc">专业客户支持，极速解决技术难题</div>
            <div class="no">13810805842</div>
          </div>
        </li>
      </ul>
    </div>
  </ShContainer>
</template>

<style scoped lang="scss">
.p3 {
  padding: 100px 0;
  width: 100%;

  .title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 20px;
  }

  li {
    width: 588px;
    height: 280px;
    box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
    background: #f9fbff url("/about/icobg1.png") right bottom no-repeat;
  }

  .flex {
    display: flex;
    justify-content: space-between;

    .item {
      padding: 60px 0 0 60px;

      strong {
        font-size: 32px;
        color: #333;
        vertical-align: middle;
        margin-left: 16px;
      }

      .desc {
        font-size: 16px;
        color: #666;
        padding: 20px 0 40px 0;
      }

      .no {
        color: #1d76f9;
        font-size: 32px;
        font-family: Arial;
        font-weight: 600;
      }
    }
  }
}

.p3M {
  padding: 50px 0;

  .title {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 15px;
  }

  .flex {
    display: block;
    padding: 0 15px;

    li {
      width: 100%;
      height: auto;
      margin-top: 20px;
      box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
      background: #f9fbff url("/about/icobg1.png") right bottom no-repeat;

      .item {
        padding: 30px 0 30px 30px;

        .top {
          img {
            width: 36px;
            height: 36px;
          }

          strong {
            font-size: 22px;
            margin-left: 12px;
          }
        }

        .desc {
          padding: 20px 0 20px 0;
          font-size: 14px;
          color: #666;
        }

        .no {
          font-size: 28px;
          font-weight: 600;
          color: #1d76f9;
          font-family: Arial;
        }
      }
    }
  }
}
</style>

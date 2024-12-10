<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());
const list = [
  {
    t: "成都国信公链科技有限公司",
    p: "地址：成都市温江区新光天地"
    // i:"/about/p1.png"
  },
  {
    t: "福建国信公链印章有限公司",
    p: "地址：福州市鼓楼区华润万象城"
  },
  {
    t: "甘肃国信公链高科技有限公司",
    p: "地址：兰州市城关区名城广场"
  },
  {
    t: "广西国信公链科技有限公司",
    p: "地址：南宁市青秀区龙光世纪中心"
  },
  {
    t: "海南国信公链科技有限公司",
    p: "地址：三亚市崖州区雅布伦产业园"
  },
  {
    t: "江苏国信公链印章有限公司",
    p: "地址：南京市建邺区艺树家工场"
  },
  {
    t: "江西国信公链科技有限公司",
    p: "地址：南昌市东湖区七里大厦"
  },
  {
    t: "陕西国信公链科技有限公司",
    p: "地址：西安市雁塔区金贸国际"
  },
  {
    t: "国信公链(广东)电子印章科技有限公司",
    p: "地址：深圳市南山区前海世贸大厦"
  },
  {
    t: "四川国信公链印章有限公司",
    p: "地址：成都市锦江区创世纪大厦"
  },
  {
    t: "浙江国信公链印章有限公司",
    p: "地址：杭州市滨江区滨江阿里中心"
  },
  {
    t: "重庆国信公链印章有限公司",
    p: "地址：重庆市南岸区国瑞中心"
  }
];
</script>

<template>
  <div style="background-color: #f5f7fa">
    <ShContainer :is-mob="isMobile">
      <div
        :class="{
          p2: !isMobile,
          p2M: isMobile
        }"
      >
        <div class="title">办公地址</div>
        <div class="p1-box">
          <div v-for="(item, index) in list" :key="index" class="p-item">
            <div class="img">
              <img :alt="item.t" :src="fp(`about/p${index + 1}` + `.png`)" />
            </div>
            <div class="t">{{ item.t }}</div>
            <div class="p">{{ item.p }}</div>
          </div>
        </div>
      </div>
    </ShContainer>
  </div>
</template>

<style scoped lang="scss">
.p2 {
  padding: 100px 0;

  .title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 20px;
  }

  .p1-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .p-item {
      box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
      background-color: #fff;
      height: 290px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: default;

      .img {
        height: 200px;
        overflow: hidden;
      }

      img {
        transition: 0.5s;
      }

      &:hover img {
        transform: scale(1.1);
      }

      .t {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        height: 48px;
        line-height: 130%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .p {
        font-size: 16px;
        color: #999;
        line-height: 145%;
      }
    }
  }
}

.p2M {
  padding: 50px 0;
  background-color: #f5f7fa;

  .title {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 15px;
  }

  .p1-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .p-item {
      box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
      background-color: #fff;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: default;
      width: 48%;

      .img {
        overflow: hidden;
        width: 100%;
      }

      img {
        width: 100%;
        transition: 0.5s;
      }

      &:hover img {
        transform: scale(1.1);
      }

      .t {
        padding: 0 5px;
        font-weight: 500;
        color: #333;
        height: 40px;
        line-height: 130%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .p {
        font-size: 14px;
        color: #999;
        line-height: 140%;
        padding: 0 5px;
        height: 50px;
        display: block;
      }
    }
  }
}
</style>

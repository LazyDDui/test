<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import {fp} from "@/utils";
import {useRouter} from "vue-router";

const router = useRouter()

const list = [
  {
    label: "全国电子印章管理与服务平台广东省平台",
    href: "https://www.cic-gd.com/",
    name: "广东"
  },
  {
    label: "全国电子印章管理与服务平台山东省平台",
    href: "https://www.cic-shd.com/",
    name: "山东"
  },
  {
    label: "全国电子印章管理与服务平台四川省平台",
    href: "https://www.cic-sc.com/",
    name: "四川"
  },
  {
    label: "全国电子印章管理与服务平台广西壮族自治区平台",
    href: "https://www.cic-gx.com/",
    name: "广西"
  },
  {
    label: "全国电子印章管理与服务平台贵州省平台",
    href: "https://www.cic-gzh.com/",
    name: "贵州"
  },
  {
    label: "全国电子印章管理与服务平台江苏省平台",
    href: "https://www.cic-js.com/",
    name: "江苏"
  },
  {
    label: "全国电子印章管理与服务平台浙江省平台",
    href: "https://www.cic-zhj.com/",
    name: "浙江"
  },
  {
    label: "全国电子印章管理与服务平台重庆市平台",
    href: "https://www.cic-cq.com/",
    name: "重庆"
  },
  {
    label: "全国电子印章管理与服务平台湖北省平台",
    href: "https://www.cic-hb.com/",
    name: "湖北"
  },
  {
    label: "全国电子印章管理与服务平台河北省平台",
    href: "https://www.cic-heb.com/",
    name: "河北"
  },
  {
    label: "全国电子印章管理与服务平台福建省平台",
    href: "https://www.cic-fj.com/",
    name: "福建"
  },
  {
    label: "全国电子印章管理与服务平台江西省平台",
    href: "https://www.cic-jx.com/",
    name: "江西"
  },
  {
    label: "全国电子印章管理与服务平台陕西省平台",
    href: "https://www.cic-shx.com/",
    name: "陕西"
  },
  {
    label: "全国电子印章管理与服务平台湖南省平台",
    href: "https://www.cic-hun.com/",
    name: "湖南"
  },
  {
    label: "全国电子印章管理与服务平台河南省平台",
    href: "https://www.cic-hen.com/",
    name: "河南"
  },
  {
    label: "全国电子印章管理与服务平台海南省平台",
    href: "https://www.cic-hain.com/",
    name: "海南"
  }
]


</script>

<template>
  <div class="site-box" :style="{background:`url('${fp('service/sitesbg.jpg')}') #fff no-repeat`}">
    <div class="w">
      <div class="tc head">
        <h2>全国电子印章管理与服务平台省级服务门户</h2>
      </div>
      <ShContainer class="sites flex">
        <a @click="()=>{
            router.push(`/mh/platform?name=${item.name}`)
        }" v-for="(item,index) in list" :key="index.toString()">

          <div style="display: flex">
            <img :alt="item.label" style="width: 21px;height: 24px;" :src="fp('index/icoguohui.png')"/>
            <p style="padding: 0 2px 0 10px;">{{ item.label }}</p>
          </div>
          <span> > </span>
        </a>
      </ShContainer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site-box {
  width: 100vw;
  background-size: 100% auto;
  background-position: center bottom;
  min-height: 880px;

  h2 {
    font-weight: 600;
    color: #333;
    padding-bottom: 20px;
    font-size: 36px;
  }

  .w {
    padding: 100px 0;
  }

  .tc {
    text-align: center;
  }

  .head {
    padding: 0 90px;
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .sites {
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 50px;

    a {
      font-size: 14px;
      color: black;
      white-space: nowrap;
      width: 32%;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.4);
      border-radius: 3px;
      background-color: #fff;
      height: 70px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid transparent;
      margin-bottom: 20px;
      display: flex;
      cursor: pointer;

      &:hover {
        border: #1890FF solid 1px;
        background-color: #E2F3FF;
      }
    }

    span {
      color: #808080;
    }
  }
}
</style>

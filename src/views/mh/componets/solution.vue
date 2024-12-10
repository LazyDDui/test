<script setup lang="ts">
// import {useMainStore} from "@/store/useMainStore";
// import {storeToRefs} from "pinia";
import Header from "@/components/Common/Header.vue";
import { fp } from "@/utils";

const title = '智能解决方案'
const sub = "通过签署模式革新，助力各行各业数字化转型，针对不同行业的需求，\n" +
    "提供专业的智能解决方案"
// const {isMobile} = storeToRefs(useMainStore())
const list = [
  {
    name: '效率低',
    desc: '异地签署纸质合同签署周期长、流程繁琐，线下办理业务体验差，无法满足用户的紧急需求',
    src: fp('solve/icos1.png')
  },
  {
    name: '成本高',
    desc: '纸质合同面签成本过高：如纸张成本、打印成本、快递成本、管理成本等',
    src: fp('solve/icos2.png')
  },
  {
    name: '管理难',
    desc: '纸质合同签订之后的保管归档需要大量人力，日后查看审计等都是庞大的工作量',
    src: fp('solve/icos3.png')
  },
  {
    name: '风险大',
    desc: '物理印章不易鉴别，纸质合同易被篡改，存在较高风险',
    src: fp('solve/icos4.png')
  },
]

const list2 = [
  {
    name: '内部办公',
    src: fp('solve/spic1.jpg')
  },
  {
    name: '电子签章',
    src: fp('solve/spic2.jpg')
  },
  {
    name: '业务系统',
    src: fp('solve/spic3.jpg')
  },
]

const list3 = [
  {
    name: '内部办公',
    desc: '与内部OA系统、审批系统集成，实现签署场景全程数字化。',
    src: fp('solve/icos07.png')
  },
  {
    name: '企/事业单位注册',
    desc: '权威数据源支撑，实名认证流程快、有保障，企/事业单位注册效率高。',
    src: fp('solve/icos08.png')
  },
  {
    name: '电子政务',
    desc: '平台提供跨部门、跨区域协同签章办公，通过电子印章助力网上预约、网上申请、网上查询、咨询投诉的一体化政务服务平台建立，为其完整性、真实性、安全性提供更加便捷、可靠的保障。',
    src: fp('solve/icos10.png')
  },
  {
    name: '风控管理',
    desc: '支持角色、权限、印章进行统一管控，确保印章全生命周期操作符合印章管理制度要求，强化内外部风险管控能力。',
    src: fp('solve/icos09.png')
  },
]
</script>

<template>
  <Header type="search" :title="title" :subtitle="sub"/>
  <div class="pain">
    <div class="w">
      <div class="head">
        <h2>行业痛点</h2>
      </div>
      <ul class="flex">
        <li v-for="item in list" :key="item.name">
          <div class="item">
            <v-img :src="item.src" width="70px" height="70px"></v-img>
            <div class="name">{{ item.name }}</div>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="application" :style="{background:`url(${fp(`solve/solution2bg.jpg`)})`}">
    <div class="w">
      <div class="head">
        <h2>应用场景</h2>
      </div>
      <ul class="flex">
        <li v-for="item in list2" :key="item.name">
          <div class="item">
            <div class="name">
              {{ item.name }}
            </div>
            <v-img class="img" :src="item.src"></v-img>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="solve">
    <div class="w">
      <div class="head">
        <h2>解决方案</h2>
      </div>
      <ul class="flex">
        <li v-for="(item,index) in list3" :key="index">
          <div class="box">
            <v-img style="flex:none" width="36" height="36" :src="item.src"></v-img>
            <div class="tip">
              <h2>{{ item.name }}</h2>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped lang="scss">
.solve {
  .w {
    width: 1200px;
    padding: 50px 0;
    margin: 0 auto;

    .head {
      h2 {
        text-align: center;
        font-weight: 600;
        color: #333;
        padding-bottom: 20px;
        font-size: 36px;
      }
    }

    .flex {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 589px;
        height: 180px;
        background: #F5F8FF;
        margin-top: 24px;
        box-sizing: border-box;
        padding: 40px 0 0 40px;

        .box {
          display: flex;
          flex-direction: row;
          align-items: normal;

          .tip {
            margin-left: 27px;
            width: 520px;

          }

          h2 {
            margin-bottom: 28px;
            font-weight: bold;
            font-size: 24px;
            color: #333333;
            line-height: 25px;
          }

          p {
            font-weight: bold;
            font-size: 14px;
            color: #999999;
            line-height: 24px;
            padding-right: 56px;
            text-align: justify;
          }
        }
      }
    }
  }
}

.application {
  background-size: 100% 100%;
  background-position: center bottom;

  .w {
    width: 1200px;
    padding: 100px 0;
    margin: 0 auto;

    .head {
      h2 {
        text-align: center;
        font-weight: 600;
        color: #333;
        padding-bottom: 20px;
        font-size: 36px;
      }
    }

    .flex {
      display: flex;
      justify-content: space-between;
      margin-top: 60px;

      li {
        width: 384px;
        height: 300px;
        position: relative;

        .item {
          overflow: hidden; /* 防止放大后图片溢出 */
          .img {
            transition: transform 0.3s ease; /* 平滑的过渡效果 */
          }

          .img:hover {
            transform: scale(1.1); /* 放大图片 */
          }
        }

        .name {
          position: absolute;
          left: 40px;
          top: 40px;
          z-index: 999;
          font-weight: bold;
          font-size: 24px;
          color: #FFFFFF;
          line-height: 5px;
        }

        .name:after {
          content: "";
          display: block;
          width: 31px;
          height: 3px;
          background: #FFFFFF;
          margin-top: 30px;
        }
      }
    }
  }
}

.pain {
  .w {
    width: 1200px;
    padding: 100px 0;
    margin: 0 auto;

    .head {
      padding: 0 90px;

      h2 {
        text-align: center;
        font-weight: bold;
        color: #333;
        padding-bottom: 20px;
        font-size: 36px;
      }
    }

    .flex {
      display: flex;

      li {
        width: 25%;
        padding-top: 60px;
      }

      .item {
        text-align: center;
        padding: 0 32px;

        div {
          margin: 0 auto;
          padding: 36px 0 18px 0;
          font-weight: bold;
          font-size: 24px;
          color: #333333;
        }

        p {
          color: #999;
          font-size: 14px;
          font-width: 400;
          font-weight: bold;
          line-height: 20px;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { fp } from "@/utils";

const info = [
  {
    icon: fp('verify/01.png'),
    title: "文档验证",
    sub: "支持对电子签章的文档进行有效性验证"
  },
  {
    icon: fp('verify/02.png'),
    title: "上传需要验证的文档",
    sub: "上传需要待验证的文档"
  },
  {
    icon: fp('verify/03.png'),
    title: "执行验证",
    sub: "点击“立即验证”"
  },
  {
    icon: fp('verify/04.png'),
    title: "验证文档有效性",
    sub: "验证结果包括：签署主体、签署平台、签章图像等信息"
  }
]

</script>

<template>
  <div class="part">
    <div class="head">
      <h2>验证指南</h2>
    </div>
    <div class="card">
      <div class="item" v-for="(item,index) in info" :key="index">
        <div class="box">
          <img :alt="index.toString()" :src="item.icon">
          <div class="line" v-if="index < info.length -1">
            <div class="c1"></div>
            <img alt="c2" :src="fp('verify/dw.png')"/>
            <div class="c1"></div>
          </div>
        </div>
        <div class="name">{{ item.title }}</div>
        <p class="desc">{{ item.sub }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.part {
  padding: 100px 0 0 0;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
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

  .card {
    margin: 0 auto;
    display: flex;
    width: 90vw;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;

      .name {
        margin: 17px 0;
        font-size: 18px;
        font-weight: 500;
        color: #333;
      }

      .desc {
        text-align: center;
        font-size: 14px;
        color: #999;
        line-height: 24px;
      }

      .box {
        position: relative;

        img {
          width: 134px;
          height: 134px;
        }

        .line {
          position: absolute;
          right: -11vw;
          top: 60px;
          display: flex;
          align-items: center;

          .c1 {
            width: 4vw;
            height: 3px;
            background-color: #e4e4e4;
          }

          img {
            width: 27px;
            height: 31px;
          }
        }
      }

    }
  }
}
</style>

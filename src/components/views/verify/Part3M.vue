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
        <img :alt="index.toString()" :src="item.icon">
        <div style="font-size: 17px;font-weight:500;margin-top:5px;">{{ item.title }}</div>
        <p style="font-size: 14px;line-height: 30px;color: #999;">{{ item.sub }}</p>
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
  margin-bottom: 20px;
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

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px 0;
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
}
</style>

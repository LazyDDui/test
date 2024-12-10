<script setup lang="ts">

import { fp } from "@/utils";
</script>

<template>
  <div class="part4">
    <div class="item">
      <div class="img">
        <img :src="fp('index/default.jpg')"/>
      </div>
      <div class="desc">
        <div>电子印章引领数字化转型新篇章 助力高效便捷服务</div>
        <div class="detail">
          <span>2024-09-14</span>
          <span>详情 ></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="img">
        <img :src="fp('index/default.jpg')"/>
      </div>
      <div class="desc">
        <div>电子印章在线核验 保障信息安全 助力绿色办公</div>
        <div class="detail">
          <span>2024-09-14</span>
          <span>详情 ></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="img">
        <img :src="fp('index/default.jpg')"/>
      </div>
      <div class="desc">
        <div>具备这3个要素 才能称得上合格的电子印章</div>
        <div class="detail">
          <span>2024-09-14</span>
          <span>详情 ></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="img">
        <img :src="fp('index/default.jpg')"/>
      </div>
      <div class="desc">
        <div>保安全 增效率 数字工具赋能政企服务“加速跑”</div>
        <div class="detail">
          <span>2024-09-14</span>
          <span>详情 ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.part4 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 45%;
    box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
  }
}

img {
  width: 100%;
  transition: .5s;
}

.img {
  overflow: hidden;

  &:hover img {
    transform: scale(1.1);
  }
}


.desc {
  padding: 12px 12px 6px 12px;

  div:nth-of-type(1) {
    color: #344264;
    cursor: pointer;
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 500;

    &:hover {
      color: #1D76F9;
    }
  }
}

.detail {
  display: flex;
  justify-content: space-between;
  color: #98A3B7;

  span:nth-of-type(2) {
    color: #808080;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      color: #1D76F9;
    }
  }
}
</style>

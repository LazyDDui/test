<script setup lang="ts">
import { http } from "@/utils/http";

// const getData = async () => {
//   const {data} = await http.get(`/app/app`)
//   console.log(data)
// }
//
// getData()
</script>

<template>
  <el-row>
    <div class="shbox">
      <div class="title">我的api</div>
      <div class="innerBox" style="display: flex">
        <div class="count">4</div>
        <el-button type="text">获取密钥</el-button>
      </div>
    </div>
    <div class="shbox">
      <div class="title">调用次数</div>
      <div class="innerBox" style="display: flex">
        <div style="display: flex; flex-direction: column">
          <div style="color: #9ca3af">19,998/20,000</div>
          <div>剩余调用次数 总调用次数</div>
        </div>
        <el-button type="text">查看调用记录</el-button>
      </div>
    </div>
  </el-row>
</template>

<style scoped lang="scss">
.shbox {
  background-color: #ffffff;
  padding: 20px;
  margin-right: 20px;
  width: 400px;

  .innerBox {
    width: 100%;
    justify-content: space-between;
  }

  .title {
    font-size: 24px;
    font-weight: 500;
  }

  .count {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>

<script setup lang="ts">
import {http} from "@/utils/http";

const getData = async () => {
  const {data} = await http.get(`/app/app`)
  console.log(data)
}

getData()
</script>

<template>
  <el-row>
    <div class="">
      <div>我的api</div>
      <div style="display: flex">
        <div>4</div>
        <el-button type="text">获取密钥</el-button>
      </div>
    </div>
    <div>
      <div>调用次数</div>
      <div style="display: flex">
        <div style="display: flex">
          <div>19,998/20,000</div>
          <div>剩余调用次数 总调用次数</div>
        </div>
        <el-button type="text">查看调用记录</el-button>
      </div>
    </div>
  </el-row>
</template>

<style scoped lang="scss">
.shbox {

}
</style>

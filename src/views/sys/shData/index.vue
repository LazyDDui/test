<script setup lang="ts">
import { http } from "@/utils/http";
import { ref } from "vue";

const state = ref({
  useNum: 0,
  appId: "",
  secret: "",
  setNum: ""
});

const empty = ref(true);

const s = ref("");

const getData = async () => {
  const res = await http.get(`/app/app`);
  if (res.data) {
    state.value = res.data;
    empty.value = false;
  } else {
    empty.value = true;
  }
};

getData();
</script>

<template>
  <el-row v-if="!empty" style="display: flex">
    <div class="shbox">
      <div class="title">我的api</div>
      <div class="innerBox" style="display: flex">
        <div class="count">{{ state.appId }}</div>
        <el-button type="text" @click="s = state.secret">获取密钥</el-button>
      </div>
      <div v-if="s">{{ s }}</div>
    </div>
    <div class="shbox">
      <div class="title">调用次数</div>
      <div class="innerBox" style="display: flex">
        <div style="display: flex; flex-direction: column">
          <div style="color: #9ca3af">
            {{ state.useNum }}/{{ state.setNum }}
          </div>
          <div>剩余调用次数 总调用次数</div>
        </div>
        <!--        <el-button type="text">查看调用记录</el-button>-->
      </div>
    </div>
  </el-row>
  <el-row v-else>
    <div class="shbox" style="width: 100%;height: 500px;">用户暂未开通api</div>
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

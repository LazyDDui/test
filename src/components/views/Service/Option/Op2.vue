<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { h, ref } from "vue";
import Op2c from "@/components/views/Service/Option/Op2/Op2c.vue";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());

const list = ref([
  {
    label: "国信公链电子印章小程序",
    icon: fp("service/icoClient.png"),
    content: h(Op2c, {
      type: "国信公链电子印章小程序"
    })
  },
  {
    label: "国信公链电子印章签章客户端",
    icon: fp("service/icoXcx.png"),
    content: h(Op2c, {
      type: "国信公链电子印章签章客户端"
    })
  }
]);

const activeName = ref(list.value[0].label);
</script>

<template>
  <div
    :class="{
      op2: !isMobile,
      op2M: isMobile
    }"
  >
    <div class="title">操作视频</div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.label"
        :name="item.label"
      >
        <template #label>
          <div>
            <img :src="item.icon" :alt="item.label" />
            {{ item.label }}
          </div>
        </template>
        <component :is="item.content" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.op2 {
  width: 100%;

  img {
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }

  :deep(.el-tabs) {
    --el-tabs-header-height: auto;
  }

  :deep(.el-tabs__nav) {
    width: 100%;
  }

  :deep(.el-tabs__item) {
    width: 50%;
    font-size: 24px;
    padding-bottom: 24px;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 40px 0;

    .input {
      width: 600px;
      height: 50px;
      margin-right: 20px;
    }

    .btn {
      width: 180px;
      height: 50px;
      line-height: 50px;
      background-color: #1d76f9;
      border-radius: 8px;
      font-size: 16px;
      color: #fff;
    }
  }

  .title {
    text-align: center;
    font-weight: 500;
    font-size: 31px;
    color: #333333;
    margin: 0 0 30px 0;
  }
}

.op2M {
  width: 100%;
  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
  :deep(.el-tabs) {
    --el-tabs-header-height: auto;
  }

  :deep(.el-tabs__nav) {
    width: 100%;
  }

  :deep(.el-tabs__item) {
    width: 50%;
    font-size: 16px;
    padding-bottom: 12px;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 40px 0;

    .input {
      width: 200px;
      height: 42px;
      margin-right: 20px;
    }

    .btn {
      width: 92px;
      height: 42px;
      line-height: 42px;
      background-color: #1d76f9;
      border-radius: 8px;
      font-size: 14px;
      color: #fff;
    }
  }

  .title {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    color: #333333;
    margin: 0 0 20px 0;
  }
}
</style>

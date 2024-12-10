<script setup lang="ts">
import { h, ref, watch } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useMainStore } from "@/store/useMainStore";
import { storeToRefs } from "pinia";
import Op1c from "@/components/views/Service/Option/Op1/Op1c.vue";

const keyWords = ref("");

const { isMobile } = storeToRefs(useMainStore());

let gs: (e: string) => void;

let sl: (e: string) => void;

let ba: (e: string) => void;

let sy: (e: string) => void;

let gl: (e: string) => void;

const list = ref([
  {
    label: "概述",
    content: h(Op1c, {
      type: "概述",
      onFnGive: e => {
        gs = e;
      }
    })
  },
  {
    label: "申领",
    content: h(Op1c, {
      type: "申领",
      onFnGive: e => {
        sl = e;
      }
    })
  },
  {
    label: "备案",
    content: h(Op1c, {
      type: "备案",
      onFnGive: e => {
        ba = e;
      }
    })
  },
  {
    label: "使用",
    content: h(Op1c, {
      type: "使用",
      onFnGive: e => {
        sy = e;
      }
    })
  },
  {
    label: "管理",
    content: h(Op1c, {
      type: "管理",
      onFnGive: e => {
        gl = e;
      }
    })
  }
]);

const activeName = ref(list.value[0].label);

watch(activeName, _value => {});

const handleClick = (_tab: TabsPaneContext, _event: Event) => {
  // console.log(tab, event)
};

const search = () => {
  gs(keyWords.value);
  sl(keyWords.value);
  ba(keyWords.value);
  sy(keyWords.value);
  gl(keyWords.value);
};
</script>

<template>
  <div
    :class="{
      op1: !isMobile,
      op1M: isMobile
    }"
  >
    <div class="title">常见问题</div>
    <div class="search">
      <el-input
        v-model="keyWords"
        class="input"
        placeholder="请输入问题的关键词搜索"
        clearable
      />
      <el-button class="btn" @click="search">立即查询</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.label"
        :name="item.label"
      >
        <component :is="item.content" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.op1 {
  width: 100%;

  :deep(.el-tabs) {
    --el-tabs-header-height: auto;
  }

  :deep(.el-tabs__nav) {
    width: 100%;
  }

  :deep(.el-tabs__item) {
    width: 20%;
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

.op1M {
  width: 100%;

  :deep(.el-tabs) {
    --el-tabs-header-height: auto;
  }

  :deep(.el-tabs__nav) {
    width: 100%;
  }

  :deep(.el-tabs__item) {
    width: 20%;
    font-size: 18px;
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

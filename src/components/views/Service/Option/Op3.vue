<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { h, ref } from "vue";
import Page1 from "@/components/views/Service/Option/Op3/Op3p/Page1.vue";
import Page2 from "@/components/views/Service/Option/Op3/Op3p/Page2.vue";
import Page3 from "@/components/views/Service/Option/Op3/Op3p/Page3.vue";
import Page4 from "@/components/views/Service/Option/Op3/Op3p/Page4.vue";
import Page5 from "@/components/views/Service/Option/Op3/Op3p/Page5.vue";
import Page6 from "@/components/views/Service/Option/Op3/Op3p/Page6.vue";
import Page7 from "@/components/views/Service/Option/Op3/Op3p/Page7.vue";
import Page8 from "@/components/views/Service/Option/Op3/Op3p/Page8.vue";
import { ArrowRight } from "@element-plus/icons-vue";
import BackBtd from "@/components/Common/BackBtd.vue";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());
const show = ref(false);

const info = ref({
  label: "",
  render: null
});

const list = [
  {
    label: "如何注册账号",
    render: h(Page1)
  },
  {
    label: "企业单位如何申领启用单位电子公章？",
    render: h(Page2)
  },
  {
    label: "事业单位如何申领启用单位电子公章？",
    render: h(Page3)
  },
  {
    label: "个人如何申领启用个人电子私章？",
    render: h(Page4)
  },
  {
    label: "如何签署文件？",
    render: h(Page5)
  },
  {
    label: "如何校验文件真伪？",
    render: h(Page6)
  },
  {
    label: "电子印章的管理",
    render: h(Page7)
  },
  {
    label: "企业/事业单位管理",
    render: h(Page8)
  }
];

const seeMore = (item: any) => {
  show.value = true;
  info.value = item;
};
</script>

<template>
  <div
    :class="{
      op3: !isMobile,
      op3M: isMobile
    }"
  >
    <div class="title">使用手册</div>
    <div>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="seeMore(item)"
      >
        <div class="sub">
          <img alt="desc" :src="fp('service/icorecord.png')" />
          <div>{{ item.label }}</div>
        </div>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
    </div>

    <el-dialog v-model="show" align-center fullscreen>
      <template #title>
        <div>
          <back-btd @click="() => (show = false)" />
          <h1
            style="
              text-align: center;
              border-bottom: 1px solid rgb(238, 238, 238);
              padding-bottom: 10px;
            "
          >
            {{ info.label }}
          </h1>
        </div>
      </template>
      <template #default>
        <div class="dialog-content">
          <component :is="info.render" />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.op3 {
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 31px;
    color: #333333;
    margin: 0 0 30px 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 5px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #1d76f9;
    }

    .sub {
      display: flex;
      align-items: center;

      img {
        margin-right: 18px;
      }
    }
  }
}

.op3M {
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    color: #333333;
    margin: 0 0 20px 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 2.5px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #1d76f9;
    }

    .sub {
      display: flex;
      align-items: center;

      img {
        margin-right: 18px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import { computed, h, ref } from "vue";
import { useMainStore } from "@/store/useMainStore";
import { storeToRefs } from "pinia";
import Op1 from "@/components/views/Service/Option/Op1.vue";
import Op2 from "@/components/views/Service/Option/Op2.vue";
import Op3 from "@/components/views/Service/Option/Op3.vue";
import Op4 from "@/components/views/Service/Option/Op4.vue";
import { fp } from "@/utils";

const { isMobile } = storeToRefs(useMainStore());

const list = ref([
  {
    icon: fp("service/icoser1.png"),
    label: "常见问题",
    desc: "高效、贴心、专业的服务体验",
    component: h(Op1),
    render: false
  },
  {
    icon: fp("service/icoser2.png"),
    label: "操作视频",
    desc: "丰富全面的操作视频",
    component: h(Op2),
    render: false
  },
  {
    icon: fp("service/icoser2.png"),
    label: "使用手册",
    desc: "迅速上手电子印章",
    component: h(Op3),
    render: false
  },
  {
    icon: fp("service/icoser2.png"),
    label: "在线客服",
    desc: "高效、贴心、专业的服务体验",
    component: h(Op4),
    render: true
  }
]);

const renderComponent = computed(() => {
  const find = list.value.find(item => item.render);
  if (find) {
    return find.component;
  }
  return null;
});

const seeDetail = (label: string) => {
  list.value.forEach(item => {
    item.render = item.label === label;
  });
};
</script>

<template>
  <ShContainer
    :is-mob="isMobile"
    :class="{
      service: !isMobile,
      serviceM: isMobile
    }"
  >
    <div class="flex">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="item">
            <img :alt="item.label" :src="item.icon" />
            <div class="name">{{ item.label }}</div>
            <div class="desc">{{ item.desc }}</div>
            <el-button class="btn" @click="seeDetail(item.label)"
              >查看详情</el-button
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="render">
      <component :is="renderComponent" />
    </div>
  </ShContainer>
</template>

<style scoped lang="scss">
.serviceM {
  padding-top: 20px;
  width: 100%;
  .render {
    margin-top: 50px;
  }
  .btn {
    background-color: #1d76f9;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
    width: 120px;
    line-height: 32px;
    height: 32px;
  }

  ul {
    width: 100%;
    padding: 0 15px 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    li {
      padding-top: 15px;
      width: 48%;
      height: 220px;
      margin-bottom: 15px;
      list-style: none;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          font-size: 20px;
          color: #333;
          font-weight: 500;
          margin-top: 15px;
        }

        .desc {
          font-size: 14px;
          color: #999;
          font-weight: 400;
          padding: 10px 0 15px 0;
        }
      }
    }
  }

  img {
    width: 45px;
    height: 45px;
  }
}

.service {
  padding-top: 100px;
  width: 100%;

  .render {
    margin-top: 100px;
  }
  li {
    width: 282px;
    height: 320px;
    background: #f5f8ff;
    list-style: none;
    display: flex;
    justify-content: center;
    padding-top: 60px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .name {
        font-size: 24px;
        color: #333;
        font-weight: 500;
        margin-top: 30px;
      }

      .desc {
        font-size: 14px;
        color: #999;
        font-weight: 400;
        padding: 20px 0 30px 0;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .btn {
    background-color: #1d76f9;
    color: #fff;
    font-size: 17px;
    border-radius: 8px;
    width: 130px;
    line-height: 40px;
    height: 40px;
  }
}
</style>

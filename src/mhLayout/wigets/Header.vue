<template>
  <header
    class="header"
    :style="{ backgroundColor: mainStore.scroll ? `#fff` : `transparent` }"
  >
    <v-img
      style="justify-self: left"
      class="mr-4"
      :width="mainStore.isMobile ? 359 / 1.5 : 320"
      :height="mainStore.isMobile ? 41 / 1.5 : 36.539"
      :src="fp(`index/` + (mainStore.scroll ? `logo.png` : `logo_white.png`))"
    />
    <div v-if="!mainStore.isMobile" style="display: flex">
      <div
        v-for="(item, index) in navBars"
        :key="index"
        style="width: 85px; position: relative; margin-right: 10px"
        @mouseenter="
          () => {
            seeMore(item.children);
          }
        "
        @mouseleave="
          () => {
            closeSeeMore(item.children);
          }
        "
        @click="
          () => {
            if(!item.children){
                          router.push(item.route);
            }
          }
        "
      >
        <div
          class="navItem"
          :style="{ color: mainStore.scroll ? `black` : `#fff` }"
        >
          {{ item.label }}
        </div>
        <div v-if="item?.children" class="dropDown">
          <div
            v-for="(i, j) in item.children"
            :key="j"
            class="innerNav"
            @click="()=>{
              console.log(i.route)
              router.push(i.route)
            }"
          >
            {{ i.label }}
          </div>
        </div>
        <div
          :class="{
            active: routeActive(item.route)
          }"
        />
      </div>
    </div>
    <v-spacer/>
    <v-spacer/>
    <v-btn
      v-if="mainStore.isMobile"
      variant="text"
      icon="mdi-menu"
      @click="onShowMenu"
    >
      <v-img
        v-if="!mainStore.scroll"
        :width="24"
        :height="24"
        :src="fp('index/menuf.png')"
      />
      <v-img v-else :width="24" :height="24" :src="fp('index/menu.png')"/>
    </v-btn>
  </header>
</template>
<script lang="ts" setup>
import {useMainStore} from "@/store/useMainStore";
import {defineEmits, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {fp} from "@/utils";

const emit = defineEmits(["update:rail", "update:mini", "update:visible"]);
const route = useRoute();
const router = useRouter();

const show = ref(false);

const navBars = ref([
  {
    label: "首页",
    route: "/mh/home"
  },
  {
    label: "产品中心",
    route: "/mh/product"
  },
  {
    label: "解决方案",
    route: "/mh/solution"
  },
  {
    label: "服务与支持",
    route: "",
    children: [
      {
        label: "签章验证",
        route: "/mh/mhVerify"
      },
      {
        label: "省级门户",
        route: "/mh/service"
      },
      {
        label: "企业登陆",
        route: "/login"
      }
    ]
  },
  {
    label: "资讯动态",
    route: "/mh/news"
  },
  {
    label: "关于我们",
    route: "/mh/about"
  }
]);

const routeActive = (routes: string) => {
  if (routes === "" && (route.path == "/verify" || route.path == "/service")) {
    return true;
  }
  return routes == route.path;
};

const mainStore = useMainStore();
const onShowMenu = () => {
  emit("update:visible", true);
};

const seeMore = (children: any[] | undefined) => {
  if (children) {
    //开启弹窗动画
    show.value = true;
  }
};

const closeSeeMore = (children: any[] | undefined) => {
  if (children) {
    //关闭弹窗动画
    show.value = false;
  }
};
</script>
<style lang="scss">
.navItem {
  font-size: 17px;
  cursor: pointer;
  position: relative;
  text-align: center;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &:hover {
    color: #1d76f9;
  }

  &:hover + .dropDown {
    transform: scaleY(1);
  }
}

.active {
  width: 16px;
  height: 4px;
  background-color: #1d76f9;
  position: absolute;
  z-index: 100;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
}

.dropDown {
  position: absolute;
  text-align: center;
  width: 100%;
  background-color: #ffffff;
  height: 80px;
  bottom: -95px;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  box-sizing: content-box;
  z-index: -1;
  transition: 0.15s;
  transform: scaleY(0);
  transform-origin: 0 0;

  &:hover {
    transform: scaleY(1);
  }

  .innerNav {
    justify-content: center;
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      color: #1d76f9;
    }
  }
}
</style>

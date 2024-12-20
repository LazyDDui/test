/*
 * @Descripttion:
 * @Author: zheng xinyi
 * @Date: 2024-05-11 10:59:32
 * @LastEditors: zheng xinyi
 * @LastEditTime: 2024-05-11 17:05:49
 */
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

const noScroll = ["/mh/product", "/mh/home"];

export const useMainStore = defineStore("main", () => {
  const route = useRoute();
  // 初始化是否是移动端设备
  window.addEventListener("resize", () => {
    const res = getMobile();
    if (res !== isMobile.value) {
      isMobile.value = res;
    }
  });

  const toTopShow = ref(false);

  const scroll = ref(false);
  const setScroll = (s: boolean) => {
    scroll.value = s;
  };

  window.addEventListener("scroll", function () {
    // 获取当前垂直方向上的滚动位置

    const scrollPosition = window.scrollY || window.pageYOffset;
    if (noScroll.includes(route.path)) {
      scroll.value = scrollPosition > 10;
      toTopShow.value = scrollPosition > 10;
    }
  });

  const deviceInfo = ref({
    width: 0,
    height: 0
  });
  const screen = ref({
    width: 0,
    height: 0
  });
  const getMobile = () => {
    const rect = document.body.getBoundingClientRect();
    deviceInfo.value.width = window.innerWidth;
    deviceInfo.value.height = window.innerHeight;
    screen.value.width = window.screen.width;
    screen.value.height = window.screen.height;
    if (!document.hidden) {
      const res = rect.width - 1 < 777;
      return res;
    } else {
      return false;
    }
  };
  const isMobile = ref(getMobile());

  const scheme = window.matchMedia("(prefers-color-scheme: light)");
  scheme.addEventListener("change", () => {
    theme.value = scheme.matches ? "dark" : "light";
  });
  const root = document.querySelector(":root");
  // root?.setAttribute('theme', scheme.matches ? 'dark' : 'light')
  root?.setAttribute("theme", "light");
  // const theme = ref(scheme.matches ? 'dark' : 'light')
  const theme = ref("light");

  const onTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    root?.setAttribute("theme", "light");
  };

  const settings: Settings = reactive({
    welt: false,
    backgroundColor: "#ffffff",
    drawer: false,
    primary: "#7F85F9",
    cardStyle: "shadow", // border // default
    backgroundColors: ["#ffffff", "#f8f8f8", "#e5eaef"],
    // highlightNav: true,
    primaryColors: [
      "#7F85F9",
      "#2196F3",
      "#03A9F4",
      "#8E24AA",
      "#3F51B5",
      "#0A7EA4",
      "#01C0C8",
      "#8BC34A",
      "#CDDC39",
      "#F44336",
      "#FF5722",
      "#FA896B"
    ]
  });

  const onDrawer = () => {
    settings.drawer = !settings.drawer;
  };

  const onBackgroundColor = (val: string) => {
    settings.backgroundColor = val;
  };

  return {
    theme,
    isMobile,
    onTheme,
    settings,
    onDrawer,
    onBackgroundColor,
    deviceInfo,
    screen,
    scroll,
    setScroll,
    toTopShow
  };
});

interface Settings {
  welt: boolean;
  backgroundColor: string;
  drawer: boolean;
  // highlightNav: boolean;
  primary: string;
  cardStyle: "shadow" | "border" | "none";
  primaryColors: string[];
  backgroundColors: string[];
}

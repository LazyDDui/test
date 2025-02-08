import {$t} from "@/plugins/i18n";
import {home} from "@/router/enums";

const {VITE_HIDE_HOME} = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  meta: {
    icon: "ep:home-filled",
    title: "电子印章",
    rank: home
  },
  children: [
    {
      path: "/shData",
      name: "shData",
      component: () => import("@/views/sys/shData/index.vue"),
      meta: {
        title: "数据看板",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    },
    {
      path: "/shApi",
      name: "shApi",
      component: () => import("@/views/sys/shApi/index.vue"),
      meta: {
        title: "接口调用记录",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    },
    {
      path: "/shPdf",
      name: "shPdf",
      component: () => import("@/views/sys/shPdf/index.vue"),
      meta: {
        title: "接口文档",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;

import {$t} from "@/plugins/i18n";

const {VITE_HIDE_HOME} = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/shPdf",
  name: "shPdf",
  // component: Layout,
  component: () => import("@/views/sys/shPdf/index.vue"),

  meta: {
    icon: "ep:home-filled",
    title: "接口文档",
    rank: 3
  },
  // children: [
  //   {
  //     path: "/shPdf",
  //     name: "shPdf",
  //     component: () => import("@/views/sys/shPdf/index.vue"),
  //     meta: {
  //       title: "数据看板",
  //       showLink: VITE_HIDE_HOME === "true" ? false : true
  //     }
  //   }
  // ]
} satisfies RouteConfigsTable;

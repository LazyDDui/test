import {$t} from "@/plugins/i18n";

const {VITE_HIDE_HOME} = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/shApi",
  name: "shApi",
  // component: Layout,
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 3
  },
  children: [
    {
      path: "/shApi",
      name: "shApi",
      component: () => import("@/views/sys/shApi/index.vue"),
      meta: {
        title: "接口调用记录",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;

import {$t} from "@/plugins/i18n";
import {home} from "@/router/enums";

const {VITE_HIDE_HOME} = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/SignManage",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: home
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/sys/shData/index.vue"),
      meta: {
        title: "数据看板",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;

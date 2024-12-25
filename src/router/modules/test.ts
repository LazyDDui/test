import { $t } from "@/plugins/i18n";

const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/test",
  name: "test",
  // component: Layout,
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 3,
    showLink: false
  },
  children: [
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/sys/test/index.vue"),
      meta: {
        title: "test",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;

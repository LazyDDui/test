import { $t } from "@/plugins/i18n";

const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/t",
  name: "t",
  meta: {
    title: "签章首页",
    icon: "mdi-cube-scan",
    showLink: false,
  },
  component: () => import("@/views/signSeal/index.vue"),
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

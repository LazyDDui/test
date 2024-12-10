import { $t } from "@/plugins/i18n";

const Layout = () => import("@/layout/index.vue");
const mhLayout = () => import("@/mhLayout/index.vue");

export default [
  {
    path: "/pdf",
    name: "pdf",
    meta: {
      title: "签署盖章",
      icon: "mdi-cube-scan"
    },
    component: () => import("@/views/mh/pdf/index.vue")
  },
  {
    path: "/mh",
    redirect: "/home",
    name: "home",
    meta: {
      title: "Componets",
      icon: "mdi-cube-scan"
    },
    component: mhLayout,
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "全国电子印章管理与服务平台—公安备案、全国互认、一键核验",
          icon: "mdi-alpha-s",
          keepAlive: false
        },
        component: () => import("@/views/mh/home.vue"),
        children: []
      },
      {
        path: "product",
        name: "product",
        meta: {
          title: "产品中心-全国电子印章管理与服务平台",
          icon: "mdi-alpha-c",
          keepAlive: false
        },
        component: () => import("@/views/mh/product.vue"),
        children: []
      },
      {
        path: "solution",
        name: "solution",
        meta: {
          title: "解决方案-全国电子印章管理与服务平台",
          icon: "mdi-alpha-t",
          keepAlive: false
        },
        component: () => import("@/views/mh/solution.vue"),
        children: []
      },
      {
        path: "news",
        name: "news",
        meta: {
          title: "资讯动态-全国电子印章管理与服务平台",
          icon: "mdi-alpha-t",
          keepAlive: false
        },
        component: () => import("@/views/mh/news.vue"),
        children: []
      },
      {
        path: "about",
        name: "about",
        meta: {
          title: "关于我们-全国电子印章管理与服务平台",
          icon: "mdi-alpha-t",
          keepAlive: false
        },
        component: () => import("@/views/mh/about.vue"),
        children: []
      },
      {
        path: "verify",
        name: "verify",
        meta: {
          title: "签章验证-全国电子印章管理与服务平台",
          icon: "mdi-alpha-t",
          keepAlive: false
        },
        component: () => import("@/views/mh/verify.vue"),
        children: []
      },
      {
        path: "service",
        name: "service",
        meta: {
          title: "服务与支持-全国电子印章管理与服务平台",
          icon: "mdi-alpha-t",
          keepAlive: false
        },
        component: () => import("@/views/mh/service.vue"),
        children: []
      }
    ]
  },
  {
    path: "/signSeal",
    name: "signSeal",
    meta: {
      title: "签章首页",
      icon: "mdi-cube-scan"
    },
    component: () => import("@/views/signSeal/index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: $t("menus.pureLogin"),
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: $t("status.pureLoad"),
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  // 下面是一个无layout菜单的例子（一个全屏空白页面），因为这种情况极少发生，所以只需要在前端配置即可（配置路径：src/router/modules/remaining.ts）
  {
    path: "/empty",
    name: "Empty",
    component: () => import("@/views/empty/index.vue"),
    meta: {
      title: $t("menus.pureEmpty"),
      showLink: false,
      rank: 103
    }
  },
  {
    path: "/account-settings",
    name: "AccountSettings",
    component: () => import("@/views/account-settings/index.vue"),
    meta: {
      title: $t("buttons.pureAccountSettings"),
      showLink: false,
      rank: 104
    }
  }
] satisfies Array<RouteConfigsTable>;

import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

const teekConfig = defineTeekConfig({
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
    shape: "square",
    name: "天客",
    slogan: "朝圣的使徒，正在走向编程的至高殿堂！",
  },
  docAnalysis: {
    createTime: "2021-10-19",
    statistics: {
      provider: "busuanzi",
    },
    wordCount: true,
    readingTime: true,
  },
  banner: {
    bgStyle: "partImg",
    descStyle: "types",
  },

  friendLink: {
    list: [
      { avatar: "/img/other.png", name: "测试1", desc: "这是一个友链测试1" },
      { avatar: "/img/ui.png", name: "测试2", desc: "这是一个友链测试2222111啊" },
      { avatar: "/img/web.png", name: "测试3测试3测试3测试3测试3测试3", desc: "这是一个友链测试3" },
      { avatar: "/img/more.png", name: "测试4", desc: "这是一个友链测试4" },
      { avatar: "/img/ui.png", name: "测试22", desc: "这是一个友链测试2" },
      { avatar: "/img/other.png", name: "测试11", desc: "这是一个友链测试1" },
      { avatar: "/img/more.png", name: "测试44", desc: "这是一个友链测试4" },
      { avatar: "/img/web.png", name: "测试33", desc: "这是一个友链测试3" },
      { avatar: "/img/other.png", name: "测试111", desc: "这是一个友链测试1" },
      { avatar: "/img/web.png", name: "测试333", desc: "这是一个友链测试3" },
      { avatar: "/img/more.png", name: "测试444", desc: "这是一个友链测试4" },
      { avatar: "/img/ui.png", name: "测试222", desc: "这是一个友链测试2" },
    ],
  },

  footerInfo: {
    topMessage: ["下面的内容和图标都可以修改（本条内容也可以隐藏的）"],
    bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
    copyright: {
      createYear: 2021,
      suffix: "天客 Blog",
    },
    icpRecord: {
      name: "桂ICP备2021009994号",
      link: "http://beian.miit.gov.cn/",
    },
  },
  social: [
    {
      icon: "icon-github",
      iconType: "iconfont",
      name: "GitHub",
      link: "https://github.com/kele-bingtang",
    },
    {
      icon: "icon-gitee2",
      iconType: "iconfont",
      name: "Gitee",
      link: "https://gitee.com/kele-bingtang",
    },
    {
      icon: "icon-qq",
      iconType: "iconfont",
      name: "QQ",
      link: "http://wpa.qq.com/msgrd?v=3&uin=28761025&site=qq&menu=yes",
    },
    {
      icon: "icon-mobile",
      iconType: "iconfont",
      name: "联系我",
      link: "https://www.youngkbt.cn/?contact=true",
    },
  ],
  comment: {
    provider: "giscus",
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      // envId: "https://twikoo.youngkbt.cn/",
      // link: "https://gcore.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js",

      // waline 配置，官网：https://waline.js.org/
      // serverURL: "https://tk.waline.youngkbt.cn/",
      // jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
      // cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",

      // giscus 配置，官网：https://giscus.app/zh-CN
      repo: "Kele-Bingtang/vitepress-theme-teek",
      repoId: "R_kgDONpVfBA",
      category: "Announcements",
      categoryId: "DIC_kwDONpVfBM4Cm3v9",

      // artalk 配置，官网：https://artalk.js.org/
      // server: "",
      // site: "",
    },
  },

  vitePlugins: {
    sidebarOption: {
      localeRootDir: "zh",
      initItems: false,
    },
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "Hd Security",
  cleanUrls: false,
  lastUpdated: true,

  rewrites: {
    "zh/:rest*": ":rest*",
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Teek | VitePress Theme" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { name: "author", content: "Teek" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/png" }],
    ["link", { rel: "stylesheet", href: "//at.alicdn.com/t/font_2989306_w303erbip9.css" }], // 阿里在线矢量库
  ],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
    socialLinks: [{ icon: "github", link: "https://github.com/Kele-Bingtang/hd-security" }],
    search: {
      provider: "local",
    },
  },
});

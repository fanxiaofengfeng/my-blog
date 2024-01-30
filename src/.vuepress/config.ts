import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  dest: 'dist',

  lang: "zh-CN",
  title: "梵梵博客网站",
  description: "vuepress-theme-hope 的博客演示",

  theme: hopeTheme({
    plugins: {
      search: true,
      // search: {
      //   插件选项
      // },
    },
  }),
  // Enable it with pwa
  // shouldPrefetch: false,
});

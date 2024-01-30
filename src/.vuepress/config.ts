import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  dest: 'dist',

  lang: "zh-CN",
  title: "梵梵爱学习",
  description: "vuepress-theme-hope 的博客演示",

  theme: hopeTheme({
    darkmode: "enable"
  }),
  // Enable it with pwa
  // shouldPrefetch: false,
});

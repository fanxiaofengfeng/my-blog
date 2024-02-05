import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  dest: 'dist',

  lang: "zh-CN",
  title: "梵梵博客网站",
  description: "vuepress-theme-hope 的博客演示",
  theme,
  head: [
    [
      "script",
      {type:"text/javascript"},
      `\
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "kwdfftxvk4");
      `,
    ],
  ],
  // theme: hopeTheme({
  //   sidebar: "heading",
  // }),
  // Enable it with pwa
  // shouldPrefetch: false,
});

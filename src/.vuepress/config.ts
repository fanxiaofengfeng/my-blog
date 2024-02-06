import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",
  dest: 'dist',
  lang: "zh-CN",
  title: "晓峰博客",
  description: "晓峰博客",
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
  plugins: [
  ],
});

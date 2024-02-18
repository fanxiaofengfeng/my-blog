import { navbar } from "vuepress-theme-hope";

export default navbar([
  //"/", //首页路径
  {
    text: "主页",
    icon: "home",
    link: "/",
  },
  {
    text: "Java系列",
    icon: "book",
    link: "/post"
  },
  {
    text: "MySQL",
    icon: "mysql",
    link: "/posts/mysql",
  },
  {
    text: "MongoDB",
    icon: "pen-to-square",
    link: "/post/mongodb"
  },
  {
    text: "Spring系列",
    icon: "book",
    link: "/post/spring"
  }
]);

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
    link: "/posts/java"
  },
  {
    text: "MySQL",
    icon: "mysql",
    link: "/posts/mysql",
  },
  {
    text: "MongoDB",
    icon: "book",
    link: "/posts/mongodb"
  },
  {
    text: "Spring系列",
    icon: "book",
    link: "/posts/spring"
  },
  {
    text: "踩坑系列",
    icon: "book",
    link: "/posts/bug"
  }
]);

import { navbar } from "vuepress-theme-hope";

export default navbar([
  //"/", //首页路径
  {
    text: "主页",
    icon: "iconfont icon-home",
    link: "/",
  },
  //"/posts/mysql", //mysql
  {
    text: "MySQL",
    icon: "iconfont icon-mysql",
    link: "/posts/mysql",
  },
  {
    text: "博文",
    icon: "iconfont icon-pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "spring",
        icon: "iconfont icon-pen-to-square",
        prefix: "spring/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "pen-to-square",
        prefix: "资源/",
        children: [
          {
            text: "香蕉 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "pen-to-square",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },

  {
    text: "spring系列",
    icon: "iconfont icon-book",
    prefix: "/posts/spring",
    children: [
    ],
  },
  {
    text: "文档",
    icon: "iconfont icon-book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);

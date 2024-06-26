import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import {MR_HOPE_AVATAR} from "./logo.js";
import {SearchProOptions} from "vuepress-plugin-search-pro";

export default hopeTheme({
    hostname: "https://code.anli.live",

    author: {
        name: "晓峰",
        url: "https://code.anli.live",
    },


    // iconAssets: [
    //     "iconfont",
    //     "iconify",
    //     "fontawesome",
    //     "fontawesome-with-brands"
    // ],
    iconAssets: "iconify",

    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "src",

    // navbar
    navbar,

    // sidebar
    sidebar,

    footer: "默认页脚",

    displayFooter: true,

    blog: {
        description: "一个后端开发者",
        intro: "/intro.html",
        medias: {
            Baidu: "https://example.com",
            BiliBili: "https://example.com",
       //     Bitbucket: "https://example.com",
            Dingding: "https://example.com",
            Discord: "https://example.com",
        //    Dribbble: "https://example.com",
            Email: "mailto:info@example.com",
       //     Evernote: "https://example.com",
       //     Facebook: "https://example.com",
       //     Flipboard: "https://example.com",
            Gitee: "https://example.com",
            GitHub: "https://example.com",
        //    Gitlab: "https://example.com",
            Gmail: "mailto:info@example.com",
        //    Instagram: "https://example.com",
       //     Lark: "https://example.com",
        //    Lines: "https://example.com",
         //   Linkedin: "https://example.com",
         //   Pinterest: "https://example.com",
         //   Pocket: "https://example.com",
            QQ: "https://example.com",
           // Qzone: "https://example.com",
           // Reddit: "https://example.com",
            //Rss: "https://example.com",
            //Steam: "https://example.com",
            //Twitter: "https://example.com",
            Wechat: "https://example.com",
            // Weibo: "https://example.com",
            // Whatsapp: "https://example.com",
            // Youtube: "https://example.com",
            // Zhihu: "https://example.com",
            // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
        },
    },

    encrypt: {
        config: {
            "/demo/encrypt.html": ["1234"],
        },
    },

    // page meta
    metaLocales: {
        editLink: "在 GitHub 上编辑此页",
    },

    plugins: {
        searchPro: {
            indexContent: true,
            autoSuggestions: true,
            customFields: [
                {
                    getter: (page) => page.frontmatter.description,
                    formatter: {
                        "/": "Category: $content",
                        "/zh/": "分类：$content",
                    },
                },
                {
                    getter: (page) => page.frontmatter.title,
                    formatter: {
                        "/": "Tag: $content",
                        "/zh/": "标签：$content",
                    },
                },
            ],
        },
        //开启博客功能
        blog: true,
       // search: true,

        // install @waline/client before enabling it
        // WARNING: This is a test server for demo only.
        // You should create and use your own comment service in production.
        // comment: {
        //   provider: "Waline",
        //   serverURL: "https://waline-comment.vuejs.press",
        // },

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            codetabs: true,
            component: true,
            demo: true,
            figure: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            mark: true,
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,

            // install chart.js before enabling it
            // chart: true,

            // insert component easily

            // install echarts before enabling it
            // echarts: true,

            // install flowchart.ts before enabling it
            // flowchart: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            // install katex before enabling it
            // katex: true,

            // install mathjax-full before enabling it
            // mathjax: true,

            // install mermaid before enabling it
            // mermaid: true,

            // playground: {
            //   presets: ["ts", "vue"],
            // },

            // install reveal.js before enabling it
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            // install @vue/repl before enabling it
            // vuePlayground: true,
        }

        // uncomment these if you want a PWA
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },

});

**独自完成整个项目，包括设计、前端、后端、运维。**

**功能完整**，具有评论系统、后台、文章编辑器等 CMS 所需的功能；**性能强大**，Lighthouse 接近满分。
  - [更详细的介绍](https://blog.kaciras.com/article/20/kaciras-blog-v1-release-note)

组件化的开发模式，将常用的代码封装为通用的组件，使用 StoryBook 对组件进行独立地开发和调试。
  - [StoryBook 展示页面](https://kaciras-blog.github.io/uikit)

**直接使用 Webpack，并编写加载器和插件**，提供了资源压缩、优化、SSR 热重载等丰富的功能。

**实现了图片上传后自动优化、压缩，转码为 WebP 格式的功能**，节约了79.7%的流量（根据文章里的图片计算）。
  - [Web 图片优化（一）：压缩方案简介](https://blog.kaciras.com/article/19/Introduction-to-Web-Image-Formats)

[扩展 Markdown 转换器使其能够插入视频](https://blog.kaciras.com/article/18/add-video-support-to-markdown)

**支持PWA技术**，使用自定义的 ServiceWorker，支持离线访问，还可以添加到手机桌面。

支持的服务端渲染，让动态内容同样被搜索引擎收录，并提升首屏速度。

使用 [Sentry](https://sentry.io) 跟踪页面里的错误，做到及时响应并修复问题。

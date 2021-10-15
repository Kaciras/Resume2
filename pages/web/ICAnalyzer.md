ICAnalyzer (Image Compression Analyzer) 是一个**方便（在线使用）、直观（交互丰富）、定量（使用相似度指标）的图片压缩分析工具**。

* [更详细的介绍](https://blog.kaciras.com/article/23/icanalyzer-development-log)
* [应用实例：WebP 转换参数分析](https://blog.kaciras.com/article/24/analyze-WebP-encode-options)

**独自完成整个项目，包括设计、前端、部署。**

**全程使用 React Hooks**，以简洁清晰的代码实现了美观的界面。同时使用 Devtool 对应用进行分析并优化性能。

* [React 嵌套对象的性能优化](https://blog.kaciras.com/article/25/optimize-react-performace-with-nested-object)

所有计算都运行于浏览器中，无需后端服务，**通过 WebWorker 实现多线程**，充分利用 CPU。

使用 Emscripten 将 [Google Butteraugli](https://github.com/google/butteraugli) 编译为 WebAssembly，使其运行于浏览器上。

通过 Highcharts 绘制图表，并添加交互功能，在有限的空间内展示了各种变量和指标。

使用 GitHub Actions 自动构建并部署到 GitHub Pages 和 Vercel，极大地降低了运维成本。

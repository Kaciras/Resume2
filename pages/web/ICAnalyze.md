ICAnalyze (Image Compression Analyzer) 是一个**方便（在线使用）、直观（多种视图）、定量（支持相似度指标）的图片压缩效果分析工具**。

基于控制变量法，对参数的值其进行采样，并将结果绘制成 Echarts 图表，直观的展示出。

使用 Emscripten 将 [Google Butteraugli](https://github.com/google/butteraugli) 编译为 WebAssembly，使其运行于浏览器上。

支持最新的 WebP、AVIF、WebP2 编码，未来会添加更多的转换器。

使用 GitHub Actions 自动构建并部署到 GitHub Pages，极大地简化了发布流程。

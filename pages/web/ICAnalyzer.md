ICAnalyzer (Image Compression Analyzer) 是一个**方便（在线使用）、直观（多种视图）、定量（使用相似度指标）的图片压缩效果分析工具**。核心思想是基于控制变量法，分析不同参数对图片质量和体积的影响，并将结果绘制成图表，直观地展示出不同编码及其参数对转换结果的影响。

**独自完成整个项目，包括设计、前端、后端、运维。**

支持最新的 WebP、WebP2、AVIF、JPEG XL 编码，支持 SSIM、PSNR、Butteraugli 相似度指标，未来会添加更多。

**全程使用 React Hooks**，以简洁清晰的代码实现了美观的界面。

使用 Emscripten 将 [Google Butteraugli](https://github.com/google/butteraugli) 编译为 WebAssembly，使其运行于浏览器上。

所有计算都运行于浏览器中，**通过 WebWorker 多线程运行**，无需后端服务，并充分利用 CPU 的计算能力。

使用 GitHub Actions 自动构建并部署到 GitHub Pages 和 Vercel，极大地降低了运维成本。

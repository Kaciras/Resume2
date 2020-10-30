ICAnalyze (Image Compression Analyzer) 是一个在线查看图片编码优化效果的应用。

随着前端对图片优化的重视、WebP 的普及和 AVIF 逐渐走入开发者的视线，对图片编码压缩的评测层出不穷，但它们都使用各自的方式来分析，缺乏一个通用且方便的工具，并且鲜有对各个转换参数的细致对比。

大多新格式的使用者从未关心过它们的转换参数，然而有事实证明默认的参数并不是最好的，甚至可能产生极差的结果。

本项目旨在提供一个**方便（在线使用）、直观（多种视图并支持缩放和移动）、定量（支持图片相似度指标）的图片编码分析工具**，以解决这方面的空缺，希望能推动新一代编码的普及。

- 使用 Emscripten 将 [Google Butteraugli](https://github.com/google/butteraugli) 编译为 WebAssembly，让浏览器能够运行 C++ 代码。

- 支持最新的 WebP、AVIF 编码（同样是使用了 WebAssembly 和 WebWorker），未来会添加更多的转换器。

- 支持完整的转换参数，可以对其进行采样，并将结果绘制到 Echart 图表上。

- 使用 GitHub Actions 自动构建并部署到 GitHub Pages，大大简化了流程，提交即发布。

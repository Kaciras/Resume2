import withBundleAnalyzer from "@next/bundle-analyzer";

function customWebpack(config) {
	/*
	 * image-loader 将 SVG 转换为 URL，而图标又需要支持设置属性，
 	 * 所以选择 svgr 作为加载器，并用 oneOf 避免重复处理。
	 */
	const loaders = [
		{
			test: /\.(md|aes)$/,
			type: "asset/source",
		},
		{
			test: /\.svg$/,
			resourceQuery: /react/,
			use: "@svgr/webpack",
		},
		{
			rules: config.module.rules,
		},
	];

	config.module.rules = [{ oneOf: loaders }];
	return config;
}

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})({
	webpack: customWebpack,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		formats: ["image/avif", "image/webp"],
	},
});

/**
 * 把别名记录在该文件里，让 WebStorm 能够识别。
 * 在 File -> Settings -> Languages & Frameworks -> JavaScript -> Webpack 选择该文件。
 */
export default {
	resolve: {
		alias: {
			"@": process.cwd(),
		},
	},
};

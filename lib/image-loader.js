const { extname } = require("path");
const { interpolateName } = require("loader-utils");
const sharp = require("sharp");
const { optimize } = require("svgo");

// next 似乎限制了输出目录的结构，资源必须放在 static 下否则直接忽略。
const filename = "static/images/[name].[contenthash:5].[ext]";

const WebPLossy = {
	quality: 75,
	smartSubsample: true,
	effort: 5,
};

const plugins = [{
	name: "preset-default",
	params: {
		overrides: {
			removeViewBox: false,
		},
	},
}];

/**
 * 图片加载器，能够优化图片并声称额外的新格式，支持光栅图和 SVG。
 *
 * 该加载器最好搭配 components/StaticImg 组件使用，以支持渐进升级，
 * 当然直接用 <img> 也行，因为该加载器也包含了 file-loader 的行为，
 * 但此时额外生成的新格式就浪费了。
 *
 * <h1>为何不用 next/image</h1>
 * <ul>
 *     <li>它并不生成 <picture> + <source> 组合，没法做前端升级。</li>
 *     <li>不支持自定义转码比如 SharpYUV 且不开启，一些图片失真较重。</li>
 *     <li>默认不支持 next export，扩展性是在太差。</li>
 * </ul>
 *
 * 总之一个词形容：垃圾！所以还是自己写一个吧……
 */
module.exports = async function (buffer) {
	const { mode, resourcePath, context } = this;
	const callback = this.async();
	const isProd = mode === "production";

	const outputPath = interpolateName(this, filename, {
		context,
		content: buffer,
	});

	if (isProd) {
		const ext = extname(outputPath);
		const stem = outputPath.slice(0, -ext.length);

		if (ext === ".svg") {
			buffer = optimize(buffer, { plugins }).data;
		} else {
			const image = sharp(buffer);
			const assetInfo = {
				immutable: true,
				minimized: true,
				sourceFilename: resourcePath,
			};

			const avif = await image.avif().toBuffer();
			this.emitFile(stem + ".avif", avif, null, assetInfo);

			const webp = await image.webp(WebPLossy).toBuffer();
			this.emitFile(stem + ".webp", webp, null, assetInfo);
		}
	}

	this.emitFile(outputPath, buffer, null, {
		immutable: true,
		minimized: isProd,
		sourceFilename: resourcePath,
	});

	callback(null, `export default __webpack_public_path__  + "${outputPath}"`);
};

module.exports.raw = true; // CJS 必须放在后面……

const { extname } = require("path");
const sharp = require("sharp");
const { interpolateName } = require("loader-utils");
const { optimize } = require("svgo");

const WebPLossy = {
	quality: 75,
	smartSubsample: true,
	reductionEffort: 5,
};

const svgoPlugins = [{
	name: "preset-default",
	params: {
		overrides: {
			removeViewBox: false,
		},
	},
}];

module.exports = async function (buffer) {
	const { mode, resourcePath } = this;
	const callback = this.async();

	// next 似乎限制了输出目录的结果，必须放在 static 下
	const filename = interpolateName(this, "static/images/[name].[ext]", {
		context: this.context,
		content: buffer,
	});

	if (mode === "production") {
		const ext = extname(filename);
		const stem = filename.slice(0, -ext.length);

		if (ext === ".svg") {
			buffer = optimize(buffer, { plugins: svgoPlugins }).data;
		} else {
			const webp = await sharp(buffer).webp(WebPLossy).toBuffer();
			this.emitFile(stem + ".webp", webp, null, {
				immutable: true,
				minimized: true,
				sourceFilename: resourcePath,
			});

			const avif = await sharp(buffer).avif().toBuffer();
			this.emitFile(stem + ".avif", avif, null, {
				immutable: true,
				minimized: true,
				sourceFilename: resourcePath,
			});
		}
	}

	this.emitFile(filename, buffer, null, {
		immutable: true,
		minimized: false,
		sourceFilename: resourcePath,
	});

	callback(null, `export default __webpack_public_path__  + "${filename}"`);
};

module.exports.raw = true;

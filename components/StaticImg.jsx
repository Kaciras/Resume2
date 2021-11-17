const isDev = process.env.NODE_ENV !== "production";

const upgrades = [
	{ type: "image/avif", ext: ".avif" },
	{ type: "image/webp", ext: ".webp" },
];

/**
 * 支持升级的图片元素，在生产模式下会将光栅图渲染为 <picture> 来支持新一代编码。
 * 如果是 SVG 则渲染为一个 <img>，图片类型以 src 属性的扩展名区分。
 *
 * 该组件需要与 lib/image-loader.js 一同使用，请将加载器加入构建配置。
 */
export default function StaticImg(props) {
	const { src } = props;

	// 开发模式下光栅图渲染为 <img> 与 <picture> 不同，
	// 但根据标准 <picture> 不影响样式，所以应该没问题。
	if (src.endsWith(".svg") || isDev) {
		return <img {...props}/>;
	}

	const stem = src.slice(0, src.lastIndexOf("."));
	const sources = upgrades.map(i =>
		<source key={i.ext} srcSet={stem + i.ext} type={i.type}/>,
	);

	return <picture>{sources}<img {...props}/></picture>;
}

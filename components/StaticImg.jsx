// noinspection HtmlRequiredAltAttribute

const isDev = process.env.NODE_ENV !== "production";

const upgrades = [
	{ type: "image/avif", ext: ".avif" },
	{ type: "image/webp", ext: ".webp" },
];

/**
 * 支持升级的图片元素，在生产模式下会将光栅图渲染为 <picture> 来支持新一代编码。
 * 如果是 SVG 则渲染为一个 <img>，图片类型以 src 属性的扩展名区分。
 *
 * 该组件需要与 lib/image-loader.js 一同使用，请将其加入构建配置。
 *
 * <h1>最佳选择功能</h1>
 * 目前没有实现对新编码的筛选，默认新的一定更好，若要实现可以让加载器返回更多信息。
 *
 * <h1>为什么不用 next/image</h1>
 * next/image 只渲染一个 <img>，它采用了后端选择机制，不能在静态网站中使用。
 * 这意味着 GitHub Pages 没法用，只能放到 Vercel 或自托管。
 */
export default function StaticImg(props) {
	const { src } = props;

	// 开发模式下光栅图渲染为 <img> 与生产模式的 <picture> 不同，
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

const isDev = process.env.NODE_ENV !== "production";

const upgrades = [
	{ type: "image/avif", ext: ".avif" },
	{ type: "image/webp", ext: ".webp" },
];

export default function StaticImg(props) {
	const { src } = props;

	if (src.endsWith(".svg") || isDev) {
		return <img {...props}/>;
	}

	const stem = src.slice(0, src.lastIndexOf("."));
	const sources = upgrades.map(i =>
		<source key={i.ext} srcSet={stem + i.ext} type={i.type}/>,
	);

	return <picture>{sources}<img {...props}/></picture>;
}

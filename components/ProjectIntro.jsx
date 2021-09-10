import ExternalLink from "@/components/ExternalLink";
import TechLabels from "@/components/TechLabels";
import ReactMarkdown from "react-markdown";
import styles from "./ProjectIntro.module.scss";

// 因为在链接内的伪元素能够点击，所以用个 span 并禁用选中来做分隔。
function Delimiter() {
	return <span className={styles.delimiter} role="separator">|</span>;
}

/**
 * 编程项目简介的模板，包含名字、链接（GitHub等）、使用的技术、
 * 一张大图片、和一段用 Markdown 渲染的介绍。
 */
export default function ProjectIntro(props) {
	const { children } = props;
	const { name, links, techStack, banner, content } = children;

	const linkNodes = links.map(link =>
		<ExternalLink
			key={link.href}
			href={link.href}
		>
			{link.text}
		</ExternalLink>,
	);

	// 可惜数组的 join 不能使用函数，还得循环做。
	const items = [];
	for (let i = 0; i < linkNodes.length - 1; i++) {
		items.push(linkNodes[i]);
		items.push(<Delimiter key={i}/>);
	}
	items.push(linkNodes[linkNodes.length - 1]);

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h2 className={styles.name}>
					{name}
				</h2>
				<div>{items}</div>
			</header>
			<TechLabels stack={techStack}/>
			<img
				src={banner}
				alt="banner"
				className={styles.banner}
			/>
			<div className={styles.markdown}>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</section>
	);
}

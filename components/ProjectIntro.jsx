import ReactMarkdown from "react-markdown";
import ExternalLink from "@/components/ExternalLink";
import TechLabels from "@/components/TechLabels";
import styles from "./ProjectIntro.module.scss";

// 因为链接内的伪元素能够点击，所以用个 span 并禁用选中来做分隔。
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

	// 可惜数组的 join 不能使用函数，还得循环做。
	const items = [];
	for (let i = 0; i < links.length; i++) {
		const { href, text } = links[i];
		items.push(
			<ExternalLink
				key={href}
				href={href}
			>
				{text}
			</ExternalLink>,
		);
		items.push(<Delimiter key={i}/>);
	}

	items.pop(); // 去掉末尾的分隔符。

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

import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Section from "@/components/Section";
import PersonalDetails from "@/components/PersonalDetails";
import TechLabels from "@/components/TechLabels";
import ExternalLink from "@/components/ExternalLink";
import PageLayout from "@/components/PageLayout";
import screenshot from "@/assets/screenshot.png";
import icAnalyze from "@/assets/icAnalyze.png";
import styles from "./web.module.scss";
import blogMarkdown from "./Blog.md";
import icAnalyzeMarkdown from "./ICAnalyze.md";
import skillMarkdown from "./Skills.md";

const blogProject = {
	name: "个人网站",
	links: [
		{
			href: "https://blog.kaciras.com",
			text: "blog.kaciras.com",
		},
		{
			href: "https://github.com/kaciras-blog",
			text: "GitHub",
		},
	],
	techStack: {
		lang: ["JAVA", "TypeScript"],
		frontend: ["NodeJS", "Webpack", "PWA", "Vue.js", "Storybook"],
		backend: ["SpringBoot", "Redis", "MySQL", "MyBatis"],
		operation: ["Nginx", "Debian", "Travis CI"],
	},
	banner: screenshot,
	content: blogMarkdown,
};

const ICAnalyze = {
	name: "图片压缩分析工具",
	links: [
		{
			href: "https://ic-analyze.kaciras.com",
			text: "ic-analyze.kaciras.com",
		},
		{
			href: "https://github.com/Kaciras/ICAnalyze",
			text: "GitHub",
		},
	],
	techStack: {
		lang: ["TypeScript", "C++", "WebAssembly"],
		frontend: ["React", "Webpack", "WebWorker", "SCSS", "Echarts"],
		operation: ["GitHub Actions"],
	},
	banner: icAnalyze,
	content: icAnalyzeMarkdown,
};

// 因为在链接内的伪元素能够点击，所以还是单独用元素禁用选中来做分隔。
function Delimiter() {
	return <span className={styles.delimiter} role="separator">|</span>;
}

function ProjectIntro(props) {
	const { name, links, techStack, banner, content } = props;

	const linkNodes = links.map(link => (
		<ExternalLink
			key={link.href}
			href={link.href}
		>
			{link.text}
		</ExternalLink>
	));

	// 可惜数组的 join 不能使用函数，还得自己循环做。
	const items = [];
	for (let i = 0; i < linkNodes.length - 1; i++) {
		items.push(linkNodes[i]);
		items.push(<Delimiter key={i}/>);
	}
	items.push(linkNodes[linkNodes.length - 1]);

	return (
		<section className={styles.project}>
			<header className={styles.projectHeader}>
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

export default function FrontendResume() {
	return (
		<PageLayout>
			<Head>
				<title>Web 前端开发工程师 | 简历</title>
				<base target="_blank"/>
			</Head>

			<PersonalDetails title="Web 前端开发工程师"/>

			<Section
				title="项目展示"
				subtitle="编织有艺术感的代码"
				type="projects"
			>
				{ProjectIntro(blogProject)}
				{ProjectIntro(ICAnalyze)}
			</Section>

			<Section
				title="拥有全栈技能树"
				subtitle="广泛的知识不惧任何挑战"
			>
				<div className={styles.markdown}>
					<ReactMarkdown>{skillMarkdown}</ReactMarkdown>
				</div>
			</Section>
		</PageLayout>
	);
}

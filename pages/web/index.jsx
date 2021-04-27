import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Section from "@/components/Section";
import PersonalDetails from "@/components/PersonalDetails";
import TechLabels from "@/components/TechLabels";
import ExternalLink from "@/components/ExternalLink";
import PageLayout from "@/components/PageLayout";
import logo from "@/assets/web-logo.svg";
import blog from "@/assets/blog.png";
import icAnalyzer from "@/assets/ic-analyzer.png";
import styles from "./web.module.scss";
import blogDescription from "./Blog.md";
import icAnalyzerDescription from "./ICAnalyze.md";
import skills from "./Skills.md";

/*
 * 为什么不用新出的 next/image？
 * 1）它使用了一个 div 容器包裹图片，但不支持给容器设置类名。
 * 2）它不支持自定义转码选项比如 SharpYUV，且默认不开启，导致图片质量很差。
 * 3）防布局移动虽然好，但却要求写明宽高，没法自动检测，实在麻烦。
 */

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
		frontend: ["NodeJS", "Webpack", "PWA", "Vue", "Storybook"],
		backend: ["SpringBoot", "Redis", "MySQL", "MyBatis"],
		operation: ["Nginx", "Debian", "GitHub Actions", "Travis CI"],
	},
	banner: blog,
	content: blogDescription,
};

const ICAnalyze = {
	name: "图片压缩分析工具",
	links: [
		{
			href: "https://ic-analyzer.kaciras.com",
			text: "ic-analyzer.kaciras.com",
		},
		{
			href: "https://github.com/Kaciras/ICAnalyzer",
			text: "GitHub",
		},
	],
	techStack: {
		lang: ["TypeScript", "C++", "WebAssembly"],
		frontend: ["React", "Webpack", "Emscripten", "SCSS", "Highcharts"],
		operation: ["Vercel", "GitHub Actions", "GitHub Pages"],
	},
	banner: icAnalyzer,
	content: icAnalyzerDescription,
};

// 因为在链接内的伪元素能够点击，所以用个 span 并禁用选中来做分隔。
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

	// 可惜数组的 join 不能使用函数，还得循环做。
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

			<PersonalDetails title="Web 前端开发工程师" logo={logo}/>

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
					<ReactMarkdown>{skills}</ReactMarkdown>
				</div>
			</Section>
		</PageLayout>
	);
}

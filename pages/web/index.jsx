import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Section from "@/components/Section";
import PersonalDetails from "@/components/PersonalDetails";
import TechLabels from "@/components/TechLabels";
import ExternalLink from "@/components/ExternalLink";
import PageLayout from "@/components/PageLayout";
import screenshot from "@/assets/screenshot.png";
import style from "./web.module.scss";
import blogMarkdown from "./Blog.md";
import icAnalyzeMarkdown from "./ICAnalyze.md";
import skillMarkdown from "./Skill.md";

const blogStack = {
	lang: ["JAVA", "TypeScript"],
	frontend: ["NodeJS", "Webpack", "PWA", "Vue.js", "Storybook"],
	backend: ["SpringBoot", "Redis", "MySQL", "MyBatis"],
	operation: ["Nginx", "Debian", "Travis CI"],
};

const icaStack = {
	lang: ["TypeScript", "C++", "WebAssembly"],
	frontend: ["React", "Webpack", "WebWorker", "Echarts"],
	operation: ["GitHub Actions"],
};

function ProjectIntro(props) {
	const { name, links, techStack, banner, content } = props;
	return (
		<section className={style.project}>
			<header className={style.projectHeader}>
				<h3>个人网站</h3>
				<div>
					<ExternalLink href="https://blog.kaciras.com">blog.kaciras.com</ExternalLink>
					&nbsp;|&nbsp;
					<ExternalLink href="https://github.com/kaciras-blog">GitHub</ExternalLink>
				</div>
			</header>
			<TechLabels stack={blogStack}/>
			<img
				src={screenshot}
				alt="screenshot"
				className={style.screenshot}
			/>
			<div className={style.markdown}>
				<ReactMarkdown>{blogMarkdown}</ReactMarkdown>
			</div>
		</section>
	);
}

export default function FrontendResume() {
	return (
		<PageLayout>
			<Head>
				<title>前端工程师 | 简历</title>
				<base target="_blank"/>
			</Head>

			<PersonalDetails title="Web前端开发工程师"/>

			<Section title="项目展示" subtitle="编织有艺术感的代码" type="projects">

				<section className={style.project}>
					<header className={style.projectHeader}>
						<h3>个人网站</h3>
						<div>
							<ExternalLink href="https://blog.kaciras.com">blog.kaciras.com</ExternalLink>
							&nbsp;|&nbsp;
							<ExternalLink href="https://github.com/kaciras-blog">GitHub</ExternalLink>
						</div>
					</header>
					<TechLabels stack={blogStack}/>
					<img
						src={screenshot}
						alt="screenshot"
						className={style.screenshot}
					/>
					<div className={style.markdown}>
						<ReactMarkdown>{blogMarkdown}</ReactMarkdown>
					</div>
				</section>

				<section className={style.project}>
					<header className={style.projectHeader}>
						<h3 className={style.projectName}>在线图片编码分析工具</h3>
						<div>
							<ExternalLink href="https://ic-analyze.kaciras.com">ic-analyze.kaciras.com</ExternalLink>
							&nbsp;|&nbsp;
							<ExternalLink href="https://github.com/Kaciras/ICAnalyze">GitHub</ExternalLink>
						</div>
					</header>

					<TechLabels stack={icaStack}/>
					<img
						src={screenshot}
						alt="screenshot"
						className={style.screenshot}
					/>
					<div className={style.markdown}>
						<ReactMarkdown>{icAnalyzeMarkdown}</ReactMarkdown>
					</div>
				</section>
			</Section>

			<Section title="拥有全栈技能树" subtitle="广泛的知识不惧任何挑战">
				<div className={style.markdown}>
					<ReactMarkdown>{skillMarkdown}</ReactMarkdown>
				</div>
			</Section>
		</PageLayout>
	);
}

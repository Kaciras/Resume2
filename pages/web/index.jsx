import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Section from "@/components/Section";
import ResumeHeader from "@/components/ResumeHeader";
import TechLabels from "@/components/TechLabels";
import Footer from "@/components/Footer";
import OutLink from "@/components/OutLink";
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

export default function FrontendResume() {
	return (
		<>
			<Head>
				<title>前端工程师 | 简历</title>
				<base target="_blank"/>
			</Head>

			<ResumeHeader title="Web前端开发工程师"/>

			<Section title="项目展示" subtitle="编织有艺术感的代码" type="projects">

				<section className={style.project}>
					<div className={style.projectHeader}>
						<h3>个人网站</h3>
						<div>
							<OutLink href="https://blog.kaciras.com">blog.kaciras.com</OutLink>
							&nbsp;|&nbsp;
							<OutLink href="https://github.com/kaciras-blog">GitHub</OutLink>
						</div>
					</div>
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
					<div className={style.projectHeader}>
						<h3 className={style.projectName}>在线图片编码分析工具</h3>
						<div>
							<OutLink href="https://ic-analyze.kaciras.com">ic-analyze.kaciras.com</OutLink>
							&nbsp;|&nbsp;
							<OutLink href="https://github.com/Kaciras/ICAnalyze">GitHub</OutLink>
						</div>
					</div>

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

			<Footer/>
		</>
	);
}

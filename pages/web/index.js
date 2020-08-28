import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Section from "../../components/Section";
import ResumeHeader from "../../components/ResumeHeader";
import TechLabels from "../../components/TechLabels";
import Footer from "../../components/Footer";
import blogMarkdown from "./Blog.md";
import skillMarkdown from "./Skill.md";
import style from "./web.module.scss";

const stack = {
	lang: ["JAVA", "TypeScript"],
	frontend: ["NodeJS", "Webpack", "PWA", "Vue.js", "Storybook"],
	backend: ["Spring Boot", "Redis", "MySQL", "MyBatis"],
	operation: ["Nginx", "Debian"],
};

export default function FrontendResume() {
	return (
		<>
			<Head>
				<title>前端工程师 | 简历</title>
				<base target="_blank" />
			</Head>

			<ResumeHeader title="Web前端开发工程师" />

			<Section title="项目展示" subtitle="编织有艺术感的代码">
				<div className={style.project}>
					<h3>个人网站项目</h3>
					<div>
						<a href="https://blog.kaciras.com">blog.kaciras.com</a>
						&nbsp;|&nbsp;
						<a href="https://github.com/kaciras-blog">GitHub</a>
					</div>
				</div>

				<TechLabels stack={stack} />

				<img className={style.screenshot} alt="screenshot" src={require("@/assets/screenshot.png")} />

				<ReactMarkdown source={blogMarkdown} />
			</Section>

			<Section title="拥有全栈技能树" subtitle="广泛的知识不惧任何挑战">
				<ReactMarkdown source={skillMarkdown} />
			</Section>

			<Footer />
		</>
	);
}

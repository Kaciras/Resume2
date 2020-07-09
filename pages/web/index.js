import React from "react";
import ReactMarkdown from "react-markdown";
import Section from "../../components/section";
import ResumeHeader from "../../components/header";
import TechLabels from "../../components/tech-labels";
import blogMarkdown from "./Blog.md";
import skillMarkdown from "./Skill.md";

const techstack = {
	lang: ["JAVA", "TypeScript"],
	frontend: ["NodeJS", "Webpack", "PWA", "Vue.js"],
	backend: ["Spring Boot", "Redis", "MySQL"],
	operation: ["Nginx", "Debian"],
};

export default function WebResume() {
	return (
		<>
			<ResumeHeader title="Web前端开发工程师" />

			<Section title="项目展示" subtitle="编织有艺术感的代码">
				<div className="project-header">
					<h3>个人网站项目</h3>
					<div>
						<a href="https://blog.kaciras.com">blog.kaciras.com</a>
						&nbsp;|&nbsp;
						<a href="https://github.com/kaciras-blog">GitHub</a>
					</div>
				</div>

				<TechLabels stack={techstack} />

				<img
					src="/screenshot.png"
					alt="screenshot"
					className="screenshot"
				/>

				<ReactMarkdown source={blogMarkdown} />
			</Section>

			<Section title="拥有全栈技能树" subtitle="广泛的知识不惧任何挑战">
				<ReactMarkdown source={skillMarkdown} />
			</Section>

			<footer>
				<span>Copyright &copy; Kaciras 2020</span>
				<img id="qrcode" alt="QR Code" src="/QR.png" />
			</footer>
		</>
	);
}

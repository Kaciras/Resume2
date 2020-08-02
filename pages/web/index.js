import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import QRCode from "qrcode";
import Section from "../../components/Section";
import ResumeHeader from "../../components/ResumeHeader";
import TechLabels from "../../components/TechLabels";
import blogMarkdown from "./Blog.md";
import skillMarkdown from "./Skill.md";

const stack = {
	lang: ["JAVA", "TypeScript"],
	frontend: ["NodeJS", "Webpack", "PWA", "Vue.js"],
	backend: ["Spring Boot", "Redis", "MySQL"],
	operation: ["Nginx", "Debian"],
};

function createQRCode(canvas) {
	const options = {
		margin: 1,
		color: { light: "#fafafaff" },
	};
	QRCode.toDataURL(canvas, location.href, options, (err, url) => {
		canvas.onclick = () => window.open(url, "_blank");
	});
}

export default function FrontendResume() {
	const qrCodeRef = useRef(null);
	useEffect(() => createQRCode(qrCodeRef.current), []);

	return (
		<>
			<Head>
				<title>前端工程师 | 简历</title>
				<base target="_blank" />
			</Head>

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

				<TechLabels stack={stack} />

				<img className="screenshot" alt="screenshot" src={require("@/assets/screenshot.png")} />

				<ReactMarkdown source={blogMarkdown} />
			</Section>

			<Section title="拥有全栈技能树" subtitle="广泛的知识不惧任何挑战">
				<ReactMarkdown source={skillMarkdown} />
			</Section>

			<footer>
				<div>
					<p>Copyright &copy; Kaciras 2020</p>
					<p>
						<a href="https://github.com/Kaciras/Resume2">https://github.com/Kaciras/Resume2</a>
					</p>
				</div>
				<canvas id="qrcode" ref={qrCodeRef} />
			</footer>
		</>
	);
}

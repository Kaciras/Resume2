import ReactMarkdown from "react-markdown";
import Section from "@/components/Section";
import PersonalDetails from "@/components/PersonalDetails";
import PageLayout from "@/components/PageLayout";
import Attachment from "@/components/Attachment";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectCard from "@/components/ProjectCard";
import logo from "@/assets/web-logo.svg";
import blogScreenshot from "@/assets/blog.png";
import ICAnalyzerImage from "@/assets/ic-analyzer.png";
import FileDownloadIcon from "@/assets/icon/file-download.svg";
import blogDescription from "./Blog.md";
import icAnalyzerDescription from "./ICAnalyzer.md";
import skills from "./Skills.md";
import styles from "./index.module.scss";

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
	banner: blogScreenshot,
	content: blogDescription,
};

const icAnalyzer = {
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
	banner: ICAnalyzerImage,
	content: icAnalyzerDescription,
};

export default function FrontendResume() {
	return (
		<PageLayout title="Web 前端开发工程师">
			<PersonalDetails title="Web 前端开发工程师">
				<div className={styles.custom}>
					<img
						className={styles.logo}
						alt="logo"
						src={logo}
					/>
					<Attachment
						name="前端.pdf"
						type="application/pdf"
						encrypted={true}
					>
						<FileDownloadIcon className={styles.buttonIcon}/>
						下载 PDF 版简历
					</Attachment>
				</div>
			</PersonalDetails>

			<Section
				title="项目展示"
				subtitle="编织有艺术感的代码"
				type="projects"
			>
				<ProjectIntro>{icAnalyzer}</ProjectIntro>
				<ProjectIntro>{blogProject}</ProjectIntro>

				<section>
					<h1 className={styles.h1}>其它项目</h1>
					<div className={styles.cards}>
						<ProjectCard
							name="deasync"
							description="一个能将异步代码转为同步的 NodeJS 库。"
							url="https://github.com/Kaciras/deasync"
						/>
						<ProjectCard
							name="pac-maker"
							description="自动代理配置（PAC）文件生成 & 维护工具。"
							url="https://github.com/Kaciras/pac-maker"
						/>
						<ProjectCard
							name="browser-theme"
							description="仿 Firefox 的新标签页，使用 WebComponent 构建和 Rollup 打包。"
							url="https://github.com/Kaciras/browser-theme"
						/>
					</div>
				</section>
			</Section>

			<Section
				title="全栈技能树"
				subtitle="广泛的知识不惧任何挑战"
			>
				<div className={styles.markdown}>
					<ReactMarkdown>{skills}</ReactMarkdown>
				</div>
			</Section>
		</PageLayout>
	);
}

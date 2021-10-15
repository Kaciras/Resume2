import ReactMarkdown from "react-markdown";
import Section from "@/components/Section";
import PersonalDetails from "@/components/PersonalDetails";
import PageLayout from "@/components/PageLayout";
import Attachment from "@/components/Attachment";
import ProjectIntro from "@/components/ProjectIntro";
import logo from "@/assets/web-logo.svg";
import blog from "@/assets/blog.png";
import ICAnalyzerImage from "@/assets/ic-analyzer.png";
import FileDownloadIcon from "@/assets/icon/file-download.svg";
import blogDescription from "./Blog.md";
import icAnalyzerDescription from "./ICAnalyzer.md";
import skills from "./Skills.md";
import styles from "./index.module.scss";

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

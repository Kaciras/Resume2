import ReactMarkdown from "react-markdown";
import Image from "next/image";
import TitledSection from "../../components/TitledSection.jsx";
import PersonalDetails from "../../components/PersonalDetails.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import Attachment from "../../components/Attachment.jsx";
import ProjectIntro from "../../components/ProjectIntro.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import { TechMeter, TechMeterList } from "../../components/TechMeter.jsx";
import logo from "../../assets/web-site.svg";
import blogScreenshot from "../../assets/blog.png";
import ICAnalyzerImage from "../../assets/ic-analyzer.png";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import blogDescription from "./Blog.md";
import icAnalyzerDescription from "./ICAnalyzer.md";
import skills from "./Skills.md";
import styles from "./index.module.scss";
import wcLogo from "../../assets/logo/webcomponent.svg";
import vueLogo from "../../assets/logo/vue.svg";
import reactLogo from "../../assets/logo/react.svg";
import viteLogo from "../../assets/logo/vite.svg";
import typescriptLogo from "../../assets/logo/typescript.svg";
import webpackLogo from "../../assets/logo/webpack.svg";
import nodeLogo from "../../assets/logo/node.svg";
import cssLogo from "../../assets/logo/css.svg";
import screenIcon from "../../assets/logo/screen.svg";
import mobileIcon from "../../assets/logo/mobile.svg";

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
		frontend: ["NodeJS", "Vite", "Vitest", "PWA", "Vue3", "Storybook"],
		backend: ["Spring Boot", "Redis", "MySQL", "MyBatis"],
		operation: ["Nginx", "Debian", "Sentry", "GitHub Actions", "Travis CI"],
	},
	banner: blogScreenshot,
	content: blogDescription,
};

const icAnalyzer = {
	name: "ICAnalyzer",
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
		frontend: ["React", "Webpack", "Emscripten", "SWC", "Highcharts"],
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
					<Image
						src={logo}
						alt="logo"
						className={styles.logo}
					/>
					<Attachment
						name="front-end.pdf"
						type="application/pdf"
					>
						<BsFillFileEarmarkArrowDownFill className={styles.buttonIcon}/>
						下载 PDF 版简历
					</Attachment>
				</div>
			</PersonalDetails>

			<section className={styles.proficiency}>
				<TechMeterList name="页面框架">
					<TechMeter name="Vue" value="100" logo={vueLogo}/>
					<TechMeter name="React" value="75" logo={reactLogo}/>
					<TechMeter name="WebComponent & VanillaJS" value="60" logo={wcLogo}/>
				</TechMeterList>
				<TechMeterList name="平台" color="#bb00cb">
					<TechMeter name="NodeJS" value="100" logo={nodeLogo}/>
					<TechMeter name="Browser (Desktop)" value="90" logo={screenIcon}/>
					<TechMeter name="Browser (Mobile)" value="65" logo={mobileIcon}/>
				</TechMeterList>
				<TechMeterList name="构建工具" color="#0053c7">
					<TechMeter name="Vite & Rollup" value="100" logo={viteLogo}/>
					<TechMeter name="Webpack" value="70" logo={webpackLogo}/>
				</TechMeterList>
				<TechMeterList name="语言" color="#d40b15">
					<TechMeter name="TypeScript & JavaScript" value="100" logo={typescriptLogo}/>
					<TechMeter name="HTML + CSS" value="75" logo={cssLogo}/>
				</TechMeterList>
			</section>

			<TitledSection
				title="项目展示"
				subtitle="编织有艺术感的代码"
				type="projects"
			>
				<ProjectIntro>{icAnalyzer}</ProjectIntro>
				<ProjectIntro>{blogProject}</ProjectIntro>

				<article>
					<h1 className={styles.h1}>其它项目</h1>
					<div className={styles.cards}>
						<ProjectCard
							name="bookshelf"
							description="仅 20KB 的极简新标签页，使用 WebComponent 和 Rollup 构建。"
							url="https://github.com/Kaciras/bookshelf"
						/>
						<ProjectCard
							name="deasync"
							description="能将异步代码转为同步的 NodeJS 库。"
							url="https://github.com/Kaciras/deasync"
						/>
						<ProjectCard
							name="pac-maker"
							description="自动代理配置（PAC）文件生成 & 执行工具，支持代理 fetch()。"
							url="https://github.com/Kaciras/pac-maker"
						/>
						<ProjectCard
							name="vite-plugin-svg-sfc"
							description="将 SVG 转为 Vue 组件的 Vite 插件，支持热更新、Scoped CSS"
							url="https://github.com/Kaciras/vite-plugin-svg-sfc"
						/>
					</div>
				</article>
			</TitledSection>

			<TitledSection
				title="全栈技能树"
				subtitle="广泛的知识不惧任何挑战"
			>
				<div className={styles.markdown}>
					<ReactMarkdown>{skills}</ReactMarkdown>
				</div>
			</TitledSection>
		</PageLayout>
	);
}

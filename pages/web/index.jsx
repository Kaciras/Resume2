import Image from "next/image";
import TitledSection from "../../components/TitledSection.jsx";
import PersonalDetails from "../../components/PersonalDetails.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import Attachment from "../../components/Attachment.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import { TechMeter, TechMeterList } from "../../components/TechMeter.jsx";
import logo from "../../assets/web-site.svg";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import ESBenchProject from "./ESBench.mdx";
import BlogProject from "./Blog.mdx";
import ICAnalyzerProject from "./ICAnalyzer.mdx";
import Skills from "./Skills.mdx";
import styles from "./index.module.scss";
import wcLogo from "../../assets/logo/webcomponent.svg";
import vueLogo from "devicon/icons/vuejs/vuejs-original.svg";
import reactLogo from "devicon/icons/react/react-original.svg";
import viteLogo from "../../assets/logo/vite.svg";
import typescriptLogo from "devicon/icons/typescript/typescript-original.svg";
import javascriptLogo from "devicon/icons/javascript/javascript-original.svg";
import csharpLogo from "devicon/icons/csharp/csharp-original.svg";
import webpackLogo from "devicon/icons/webpack/webpack-original.svg";
import nodeLogo from "devicon/icons/nodejs/nodejs-original.svg";
import cssLogo from "devicon/icons/css3/css3-original.svg";
import screenIcon from "../../assets/logo/screen.svg";
import mobileIcon from "../../assets/logo/mobile.svg";

export default function FrontendResume() {
	return (
		<PageLayout title="Web 前端开发工程师">
			<PersonalDetails title="Web 前端开发工程师">
				<div className={styles.custom}>
					<Image src={logo} alt="logo" className={styles.logo}/>
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

			<TitledSection title="全栈技能树" subtitle="广泛的知识不惧任何挑战" type="skills">
				<div className="markdown"><Skills/></div>
			</TitledSection>

			<TitledSection title="项目展示" subtitle="编织有艺术感的代码">
				<ESBenchProject/>
				<ICAnalyzerProject/>
				<BlogProject/>

				<article>
					<h1 className={styles.h1}>其它项目</h1>
					<div className={styles.cards}>
						<ProjectCard
							name="ts-directly"
							description="7.5 KB（压缩后）库让 Node 直接运行 TS，自动选择已安装的编译器，支持 SWC、esbuild、tsc。"
							url="https://github.com/Kaciras/ts-directly"
							icon={typescriptLogo}
						/>
						<ProjectCard
							name="deasync"
							description="能将异步代码转为同步的 NodeJS 库。"
							url="https://github.com/Kaciras/deasync"
							icon={typescriptLogo}
						/>
						<ProjectCard
							name="vite-plugin-svg-sfc"
							description="将 SVG 转为 Vue 组件的 Vite 插件，支持热更新、Scoped CSS"
							url="https://github.com/Kaciras/vite-plugin-svg-sfc"
							icon={typescriptLogo}
						/>
						<ProjectCard
							name="bookshelf"
							description="仅 20KB 的极简新标签页，使用 WebComponent 和 Rollup 构建。"
							url="https://github.com/Kaciras/bookshelf"
							icon={javascriptLogo}
						/>
						<ProjectCard
							name="CodingFS"
							description="将项目映射到虚拟分区，里面仅显示特定类型（源码、依赖、构建结果）的文件"
							url="https://github.com/Kaciras/CodingFS"
							icon={csharpLogo}
						/>
					</div>
				</article>
			</TitledSection>
		</PageLayout>
	);
}

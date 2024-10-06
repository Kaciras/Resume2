import Image from "next/image";
import TitledSection from "../../components/TitledSection.jsx";
import PersonalDetails from "../../components/PersonalDetails.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import Attachment from "../../components/Attachment.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import CommitCalendar from "../../components/CommitCalendar.jsx";
import logo from "../../assets/web-site.svg";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import ESBenchProject from "./ESBench.mdx";
import BlogProject from "./KsBlog.mdx";
import ICAnalyzerProject from "./ICAnalyzer.mdx";
import WebSkills from "./WebSkills.mdx";
import typescriptLogo from "devicon/icons/typescript/typescript-original.svg";
import javascriptLogo from "devicon/icons/javascript/javascript-original.svg";
import commits from "../../lib/commits.json" with { type: "json" };
import styles from "./index.module.scss";

export default function FrontendResume() {
	return (
		<PageLayout title="Web 前端开发工程师">
			<PersonalDetails title="Web 前端开发工程师">
				<div className={styles.custom}>
					{/* 这个图片没什么用，但右边太空荡不好看 */}
					<Image src={logo} alt="logo" className={styles.logo}/>
					<Attachment
						name="front-end.pdf"
						type="application/pdf"
					>
						<BsFillFileEarmarkArrowDownFill className={styles.buttonIcon}/>
						PDF 版简历
					</Attachment>
				</div>
			</PersonalDetails>

			<TitledSection title="全栈技能树" subtitle="广泛的知识不惧任何挑战" type="skills">
				<div className="markdown"><WebSkills/></div>
				<CommitCalendar className="center" commits={commits}/>
			</TitledSection>

			<TitledSection title="项目经历" subtitle="编织有艺术感的代码">
				<ESBenchProject/>
				<ICAnalyzerProject/>
				<BlogProject/>

				<article>
					<h1 className={styles.h1}>其它项目</h1>
					<div className={styles.cards}>
						<ProjectCard
							name="deasync"
							description="能将异步转为同步的 NodeJS 库。"
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
							name="ts-directly"
							description="使用 ESM Hooks 让 Node 运行 TS 文件，自动选择主流的编译器，自动搜索 tsconfig.json"
							url="https://github.com/Kaciras/ts-directly"
							icon={typescriptLogo}
						/>
					</div>
				</article>
			</TitledSection>
		</PageLayout>
	);
}

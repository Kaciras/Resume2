import React from "react";
import Section from "../components/section";
import "../scss/index.scss"
import ResumeHeader from "../components/resume-header";
import TechLabels from "../components/tech-labels";
import { graphql } from "gatsby";

const techstack = {
	lang: ["JAVA", "TypeScript"],
	frontend: ["NodeJS", "Webpack", "PWA", "Vue.js"],
	backend: ["Spring Boot", "Redis", "MySQL"],
	operation: ["Nginx", "Debian"],
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export default function WebResume({ data }) {
	const { markdownRemark: post } = data
	return (
		<>
			<ResumeHeader title="Web前端开发工程师"/>

			<Section title="项目展示" subtitle="编织有艺术感的代码">

				<div className="project-header">
					<h3>个人网站项目</h3>
					<div>
						<a href="https://blog.kaciras.com">blog.kaciras.com</a>
						|
						<a href="https://github.com/kaciras-blog">GitHub</a>
					</div>
				</div>

				<TechLabels stack={techstack}/>

				<img className="screenshot" src="../images/screenshot.png" alt="screenshot"/>

				<div dangerouslySetInnerHTML={{ __html: post.html }}/>
			</Section>

			<Section title="拥有全栈技能树" subtitle="广泛的知识不惧任何挑战">
				<div dangerouslySetInnerHTML={{ __html: post.html }}/>
			</Section>

			<Section tag="footer">
				<span>Copyright &copy; Kaciras 2020</span>
				<img id="qrcode" alt="QR Code" src="../images/QR.png"/>
			</Section>
		</>
	);
}
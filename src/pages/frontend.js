import React from "react";
import Section from "../components/section";
import Tech from "../components/tech";
import "../scss/index.scss"
import ResumeHeader from "../components/resume-header";

const FrontendPage = () => (
	<>
		<Section tag="header">
			<ResumeHeader title="Web前端开发工程师"/>
		</Section>
		<Section>
			<div className="hgroup">
				<h1>项目展示</h1>
				<h2 className="subtitle">编织有艺术感的代码</h2>
			</div>
			<div className="project-header">
				<h3>个人网站项目</h3>
				<div>
					<a href="https://blog.kaciras.com">blog.kaciras.com</a> |
					<a href="https://github.com/kaciras-blog">GitHub</a>
				</div>
			</div>

			<div>
				<Tech type="frontend">NodeJS</Tech>
				<Tech type="frontend">Webpack</Tech>
				<Tech type="frontend">PWA</Tech>
				<Tech type="frontend">Vue.js</Tech>
				<Tech type="lang">JAVA</Tech>
				<Tech type="lang">TypeScript</Tech>
				<Tech type="backend">Spring Boot</Tech>
				<Tech type="backend">Redis</Tech>
				<Tech type="backend">MySQL</Tech>
				<Tech type="ops">Nginx</Tech>
				<Tech type="ops">Debian</Tech>
			</div>

			<img className="screenshot" src="../images/screenshot.png" alt="screenshot"/>

			<ul>
				<li><strong>独立完成整个项目，包括前端、后端、运维部署</strong></li>
				<li>使用 NodeJS + Koa.js + TypeScript 构建前端服务器，具有良好的性能和扩展性</li>
				<li>
					<strong>手动配置Webpack，并编写加载器和插件</strong>
					，提供了资源压缩，图片裁剪、优化、生成额外的WebP格式，SSR热重载等丰富的功能
				</li>
				<li>使用 grid布局、transition、transform 等较新的CSS功能，以少量的代码实现了美观的布局和效果</li>
				<li>响应式布局，能够适配各种宽度的屏幕</li>
				<li>
					<strong>实现了图片上传后自动优化、压缩，转码为WebP格式的功能</strong>
					，节约了76.2%的流量（根据文章里的图片计算）
				</li>
				<li>
					<strong>支持PWA技术</strong>
					，使用ServiceWorker提升加载速度，支持离线访问，还可以添加到手机桌面
				</li>
				<li>
					<strong>支持Vue的服务端渲染技术（SSR）</strong>
					，让动态内容同样被收录，并提升首屏速度
				</li>
				<li>
					使用Vue组件化开发模式，将常用的代码封装为通用的组件，使用StoryBook对组件进行独立地开发和展示
					<ul>
						<li>
							<a href="https://kaciras-blog.github.io/uikit/" target="_blank">
								StoryBook 展示页面
							</a>
						</li>
					</ul>
				</li>
				<li>大量使用最新的ES特性，如 Optional Chain、字符串模板、async/await等，简化了代码、避免回调地狱</li>
				<li>拥有自己编写的 Markdown 编辑器用来写文章，支持LaTeX、上传图片和视频</li>
			</ul>
		</Section>
		<Section>
			<div className="hgroup">
				<h1>拥有全栈技能树</h1>
				<h2 className="subtitle">广泛的知识不惧任何挑战</h2>
			</div>
			<ul>
				<li>
					熟悉多种编程语言：C#，JavaScript，TypeScript，Python，JAVA
				</li>
				<li>
					了解 Linux 的基本操作，了解 Nginx 作为反向代理的配置方法
				</li>
				<li>
					能够熟练地使用CSS实现复杂的布局和组件
					<ul>
						<li>
							<a href="https://blog.kaciras.com/article/5/implement-multi-level-label-styles-by-CSS">
								纯CSS实现多级标签样式
							</a>
						</li>
						<li>
							<a href="https://blog.kaciras.com/article/13/implement-token-bucket-with-redis-and-lua">
								在Redis里使用Lua脚本实现令牌桶限流器
							</a>
						</li>
					</ul>
				</li>
				<li>
					了解Redis、MySQL等流行数据库，<strong>能够独立设计数据库结构和算法</strong>
					<ul>
						<li>
							<a href="https://blog.kaciras.com/article/6/store-tree-in-database">
								使用ClosureTable设计在MySQL里存储树结构，实现无限级分类
							</a>
						</li>
						<li>
							<a href="https://blog.kaciras.com/article/13/implement-token-bucket-with-redis-and-lua">
								在Redis里使用Lua脚本实现令牌桶限流器
							</a>
						</li>
					</ul>
				</li>
				<li>
					对编程拥有真正的热爱，坚持不断地学习新的知识技术
					<ul>
						<li>
							<a href="https://blog.kaciras.com/article/9/Introduction-of-java11-feature-nest-based-access-control">
								JAVA11新特性简介：Nest-Based Access Control
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</Section>
		<Section tag="footer">
			<span>Copyright &copy; Kaciras 2020</span>
			<img id="qrcode" alt="QR Code" src="../images/QR.png"/>
		</Section>
	</>
);

export default FrontendPage;
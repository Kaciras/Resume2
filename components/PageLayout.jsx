import PageFooter from "./PageFooter";
import Head from "next/head";

export default function PageLayout(props) {
	const { title, children } = props;

	// 不能用 JSX 组合，因为会生成两个文本节点。
	const fullTitle = title + " | 简历";

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
				<base target="_blank"/>
			</Head>
			{children}
			<PageFooter/>
		</>
	);
}

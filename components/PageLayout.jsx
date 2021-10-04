import PageFooter from "./PageFooter";
import Head from "next/head";

export default function PageLayout(props) {
	const { title, children } = props;

	return (
		<>
			<Head>
				<title>{title} | 简历</title>
				<base target="_blank"/>
			</Head>
			{children}
			<PageFooter url={location.href}/>
		</>
	);
}

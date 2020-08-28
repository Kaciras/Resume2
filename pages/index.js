import React from "react";
import Link from "next/link";
import style from "./index.module.scss";
import Head from "next/head";

function ResumeCard({ title, href, background }) {
	if (typeof location !== "undefined" && location.search) {
		href += location.search;
	}
	return (
		<Link href={href}>
			<a className={style.card}>
				<img className={style.background} alt="background" src={background} />
				<h2 className={style.title}>{title}</h2>
			</a>
		</Link>
	);
}

export default function Home() {
	return (
		<div className={style.container}>
			<Head>
				<title>导航页 | 简历</title>
			</Head>
			<ResumeCard title="Web前端开发工程师" href="/web" background={require("../assets/frontend.png")} />
			<ResumeCard title="JAVA开发工程师" href="/backend" background={require("../assets/java.png")} />
		</div>
	);
}

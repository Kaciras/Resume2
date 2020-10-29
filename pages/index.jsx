import React from "react";
import Head from "next/head";
import Link from "next/link";
import style from "./index.module.scss";

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

// TODO: 丑死了，得重新设计一下
export default function Home() {
	return (
		<div className={style.container}>
			<Head>
				<title>导航页 | 简历</title>
			</Head>
			<ResumeCard title="Web前端开发工程师" href="/web" background={require("@/assets/frontend.png")} />
			<ResumeCard title="JAVA开发工程师" href="/backend" background={require("@/assets/java.png")} />
		</div>
	);
}

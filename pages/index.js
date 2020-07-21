import React from "react";
import Link from "next/link";
import style from "./home.module.scss";

function ResumeCard({ title, href, banner }) {
	if (typeof location !== "undefined" && location.search) {
		href += location.search;
	}
	return (
		<Link href={href}>
			<a className={style.card}>
				<img className={style.banner} alt="banner" src={banner}/>
				<h2 className={style.title}>{title}</h2>
			</a>
		</Link>
	);
}

export default function Home() {
	return (
		<div className={style.container}>
			<ResumeCard
				title="Web前端开发工程师"
				href="/web/"
				banner={require("../assets/website-design.svg")}
			/>
		</div>
	);
}

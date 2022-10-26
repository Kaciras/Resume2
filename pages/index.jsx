import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import PageLayout from "@/components/PageLayout";
import home from "@/assets/icon/home.svg?react";
import { ImGithub } from "react-icons/im";
import styles from "./index.module.scss";

function Position({ title, children, href }) {
	if (typeof location !== "undefined" && location.search) {
		href += location.search;
	}

	return (
		<div className={styles.card}>
			<div className={styles.caption}>
				<div className={styles.title}>{title}</div>
				<p>{children}</p>
				<Link className="button" href={href}>查看详情</Link>
			</div>
		</div>
	);
}

function SocialLink({ url, SvgIcon, name }) {
	return <a href={url} title={name}><SvgIcon className={styles.social}/></a>;
}

function BodyDesktop() {

}

export default function Home() {
	const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });

	return (
		<PageLayout title="首页">
			<section className={styles.header}>
				<h1 className={styles.name}>Kaciras</h1>

				<img
					className={styles.avatar}
					title="GitHub Avatar"
					alt="avatar"
					src="https://avatars.githubusercontent.com/u/16855468?s=460"
				/>
				<div>TODO</div>
				<h2 className={styles.sub}>Full-stack developer</h2>
				<div className={styles.socialList}>
					<SocialLink name="Home" url="https://blog.kaciras.com/" SvgIcon={home}/>
					<SocialLink name="GitHub" url="https://github.com/Kaciras" SvgIcon={ImGithub}/>
				</div>
			</section>
			<section className={styles.cardList}>
				<Position href="/web" title="前端开发">前端是我最擅长的领域</Position>
				<Position href="/ops" title="运维">VPS 的维护工作也在干</Position>
				<Position href="/backend" title="后端工程师">各种后端服务同样写过不少</Position>
			</section>
		</PageLayout>
	);
}

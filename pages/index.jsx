import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import styles from "./index.module.scss";

/*
 * TODO: 首页正在设计中，反正目前用不上慢慢搞了。
 *
 * https://vincent-cotro.welovedevs.com 中规中矩，个人展示我还是希望有点创意。
 */

function ResumeCard({ title, href, image }) {
	if (typeof location !== "undefined" && location.search) {
		href += location.search;
	}
	const style = {
		backgroundImage: `url("${image}")`,
	};
	return (
		<Link href={href}>
			<a className={styles.card} style={style}>
				<div className={styles.title}>{title}</div>
			</a>
		</Link>
	);
}

export default function Home() {
	return (
		<PageLayout title="首页">
			<section className={styles.header}>
				<img
					className={styles.avatar}
					title="真实相貌以面试为准"
					alt="avatar"
					src="https://avatars.githubusercontent.com/u/16855468?s=460"
				/>
				<div className={styles.info}>
					<h1>Kaciras</h1>
					<h2 className={styles.sub}>Full-stack developer</h2>
					<a href="https://blog.kaciras.com">Blog</a>
				</div>
			</section>
			<section className={styles.cardList}>
				<ResumeCard href="/web" title="TODO" image={require("@/assets/frontend.png")}/>
				<ResumeCard href="/web" title="JAVA 工程师" image={require("@/assets/frontend.png")}/>
				<ResumeCard href="/web" title="JAVA 工程师" image={require("@/assets/frontend.png")}/>
			</section>
		</PageLayout>
	);
}

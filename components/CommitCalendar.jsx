import clsx from "clsx";
import commits from "../lib/commits.json" with { type: "json" };
import styles from "./CommitCalendar.module.scss";

export default function CommitCalendar(props) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const fromMonth = new Date(commits[0].date).getMonth();
	months.push(...months.splice(0, fromMonth), months[0]);

	let totalCommits = 0;

	const tiles = commits.map(c => {
		totalCommits += c.count;
		let title;
		if (c.level !== 0) {
			const date = new Date(c.date).toISOString().split("T")[0];
			const x = c.count > 1 ? "contributions" : "contribution";
			title = `${c.count} ${x} on ${date}`;
		}
		return <i className={styles.tile} title={title} data-level={c.level}/>;
	});

	return (
		<div className={clsx(styles.container, props.className)}>
			<div className={styles.header}>
				{months.map(m => <span>{m}</span>)}
			</div>
			<div className={styles.weeks}>
				<span>Mon</span>
				<span>Wed</span>
				<span>Fri</span>
			</div>
			<div className={styles.tiles}>
				{tiles}
			</div>
			<span className={styles.total}>
				{totalCommits} contributions
			</span>
			<div className={styles.legend}>
				Less
				<i className={styles.tile} data-level={1}/>
				<i className={styles.tile} data-level={2}/>
				<i className={styles.tile} data-level={3}/>
				<i className={styles.tile} data-level={4}/>
				More
			</div>
		</div>
	);
}

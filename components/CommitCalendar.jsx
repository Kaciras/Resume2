import clsx from "clsx";
import data from "../lib/commits.json" with { type: "json" };
import styles from "./CommitCalendar.module.scss";

function getTooltip(commit) {
	if (commit.level === -1) {
		return null;
	}
	const date = new Date(commit.date).toISOString().split("T")[0];
	switch (commit.count) {
		case 0:
			return `No contributions on ${date}`;
		case 1:
			return `1 contribution on ${date}`;
		default:
			return `${commit.count} contributions on ${date}`;
	}
}

export default function CommitCalendar(props) {
	const { begin, end, commits } = data;
	const fromMonth = new Date(begin).getMonth();
	const toMonth = new Date(end).getMonth();

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	months.push(...months.splice(0, fromMonth));
	months.push(toMonth === fromMonth ? months[0] : "");

	let totalCommits = 0;

	const tiles = commits.map(c => {
		totalCommits += c.count;
		return <i className={styles.tile} data-level={c.level} title={getTooltip(c)}/>;
	});

	return (
		<div className={clsx(styles.container, props.className)}>
			<div style={{ gridColumn: `1/5`, gridRow: "1/2" }}></div>

			{months.map(m => <span className={styles.month}>{m}</span>)}

			<span className={styles.week}>Mon</span>
			<span className={styles.week}>Wed</span>
			<span className={styles.week}>Fri</span>

			<div className={styles.tiles}>
				{tiles}
			</div>
			<div className={styles.total}>
				{totalCommits} contributions in the last year
			</div>
			<div className={styles.legend}>
				Less
				<i className={styles.tile} data-level={0}/>
				<i className={styles.tile} data-level={1}/>
				<i className={styles.tile} data-level={2}/>
				<i className={styles.tile} data-level={3}/>
				<i className={styles.tile} data-level={4}/>
				More
			</div>
		</div>
	);
}

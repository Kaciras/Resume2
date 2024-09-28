import clsx from "clsx";
import commits from "../lib/commits.json" with { type: "json" };
import styles from "./CommitCalendar.module.scss";

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 英语就是有个复数的麻烦
function getTooltip(commit, date) {
	if (commit.level === -1) {
		return null;
	}
	const s = date.toISOString().split("T")[0];
	switch (commit.count) {
		case 0:
			return `No contributions on ${s}`;
		case 1:
			return `1 contribution on ${s}`;
		default:
			return `${commit.count} contributions on ${s}`;
	}
}

// 获取 date 所在的月份有几天，比如 daysInMonth(new Date("2008-2-16")) -> 29
function daysInMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export default function CommitCalendar(props) {
	const padStart = new Date(commits[0].date).getDay();
	const months = [];

	let totalCommits = 0;

	const tiles = commits.map((c, i) => {
		const date = new Date(c.date);
		totalCommits += c.count;

		if (date.getDate() === daysInMonth(date)) {
			const gridColumnStart = 2 + Math.floor((i + padStart) / 7);
			months.push(
				<div
					className={styles.month}
					key={i}
					style={{ gridColumnStart }}
				>
					{MONTH[date.getMonth()]}
				</div>,
			);
		}

		return (
			<i
				className={styles.tile}
				key={i}
				data-level={c.level}
				title={getTooltip(c, date)}
			/>
		);
	});

	return (
		<div className={clsx(styles.container, props.className)}>
			{months}

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

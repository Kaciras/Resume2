import React from "react";
import clsx from "clsx";
import commits from "../lib/commits.json" with { type: "json" };
import styles from "./CommitCalendar.module.scss";

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 生成气泡提示的内容，主要就是处理英语就的复数词尾，中文就没这破事。
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

// 里头需要循环 365 到 372 次，耗时 3ms，还是用 memo 包装下吧。
export default React.memo(props => {
	const padStart = new Date(commits[0].date).getDay();
	const months = [];
	let totalCommits = 0;
	let latestMonth = -1;

	const tiles = commits.map((c, i) => {
		const date = new Date(c.date);
		const month = date.getMonth();
		totalCommits += c.count;

		// 在星期天的月份出现变化的列上面显示月份。
		if (date.getDay() === 0 && month !== latestMonth) {
			// 计算月份对应的列，从 1 开始、左上角格子留空所以 +2
			const gridColumn = 2 + Math.floor((i + padStart) / 7);
			latestMonth = month;
			months.push(
				<div
					className={styles.month}
					key={i}
					style={{ gridColumn }}
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

	// 俩月份之间至少隔三格，避免重叠，只可能出现在第一个月。
	if (months[1].props.style.gridColumn - months[0].props.style.gridColumn < 3) {
		months[0] = null;
	}
	// 如果最后一个月在最后一格，则会超出布局范围，故隐藏。
	if (months.at(-1).props.style.gridColumn > 53) {
		months[months.length - 1] = null;
	}

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
});

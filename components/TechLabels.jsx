import React from "react";
import clsx from "clsx";
import styles from "./TechLabels.module.scss";

export default function TechLabels({ stack }) {
	const labels = [];

	function render(type) {
		(stack[type] || []).forEach(name =>
			labels.push(
				<span key={name} className={clsx(styles.label, styles[type])}>
					{name}
				</span>
			)
		);
	}

	render("lang");
	render("frontend");
	render("backend");
	render("operation");

	return <div className={styles.container}>{labels}</div>;
}

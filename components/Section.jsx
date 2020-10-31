import React from "react";
import styles from "./Section.module.scss";

export default function Section(props) {
	const { title, subtitle, children, type } = props;

	let header = null;
	if (title) {
		header = (
			<div className={styles.header}>
				<h1>{title}</h1>
				{subtitle && <h2>{subtitle}</h2>}
			</div>
		);
	}

	return (
		<section className={styles[type]}>
			<div className={styles.content}>
				{header}
				{children}
			</div>
		</section>
	);
}

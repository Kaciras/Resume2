import React from "react";
import clsx from "clsx";
import styles from "./Section.module.scss";

export default function Section(props) {
	const { title, subtitle, children, type } = props;

	let header = null;
	if (title) {
		header = (
			<header className={styles.header}>
				<h1>{title}</h1>
				{subtitle && <h2>{subtitle}</h2>}
			</header>
		);
	}

	return (
		<section className={clsx("content", styles[type])}>
			{header}
			{children}
		</section>
	);
}

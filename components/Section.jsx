import clsx from "clsx";
import styles from "./Section.module.scss";

export default function Section(props) {
	const { title, subtitle, children, type } = props;

	let header = null;
	if (title) {
		header = (
			<header className={styles.header}>
				<h1>{title}</h1>
				{subtitle && <span>{subtitle}</span>}
			</header>
		);
	}

	const clazz = clsx("content", styles[type]);
	return <section className={clazz}>{header}{children}</section>;
}

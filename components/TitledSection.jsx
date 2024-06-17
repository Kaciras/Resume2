import clsx from "clsx";
import styles from "./TitledSection.module.scss";

export default function TitledSection({ title, subtitle, children, type }) {
	const header = (
		<header className={styles.header}>
			<h1>{title}</h1>
			{subtitle && <h2>{subtitle}</h2>}
		</header>
	);
	const clazz = clsx("content", styles[type]);
	return <section className={clazz}>{header}{children}</section>;
}

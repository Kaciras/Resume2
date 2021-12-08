import clsx from "clsx";
import styles from "./TitledSection.module.scss";

export default function TitledSection(props) {
	const { title, subtitle, children, type } = props;

	const header = (
		<header className={styles.header}>
			<h1 className={styles.h1}>{title}</h1>
			{
				subtitle &&
				<h2 className={styles.h2}>{subtitle}</h2>
			}
		</header>
	);

	const clazz = clsx("content", styles[type]);

	return <section className={clazz}>{header}{children}</section>;
}

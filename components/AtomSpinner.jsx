import clsx from "clsx";
import styles from "./AtomSpinner.module.scss";

export default function AtomSpinner({ className }) {
	return (
		<div className={clsx(styles.container, className)}>
			<div className={styles.spinnerLine}/>
			<div className={styles.spinnerLine}/>
			<div className={styles.spinnerLine}/>
		</div>
	);
}

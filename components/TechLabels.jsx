import clsx from "clsx";
import styles from "./TechLabels.module.scss";

/**
 * 一组彩色的标签，表示项目中用到的各种技术，不同的种类有不同的颜色。
 * 请保证技术名不要超出单行宽度，过长的名字请使用简称。
 *
 * @param stack 技术栈
 */
export default function TechLabels({ stack }) {
	const labels = [];

	function render(type) {
		const clazz = clsx(styles.label, styles[type]);
		(stack[type] || []).forEach(name => {
			labels.push(<li key={name} className={clazz}>{name}</li>);
		});
	}

	render("lang");
	render("frontend");
	render("backend");
	render("operation");

	return <ul className={styles.container}>{labels}</ul>;
}

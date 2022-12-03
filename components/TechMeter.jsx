import styles from "./TechMeter.module.scss";

export function TechMeterList({ name, children, color }) {
	return (
		<div style={{ "--optimum": color }}>
			<h2 className={styles.title}>{name}</h2>
			<ul className={styles.list}>{children}</ul>
		</div>
	);
}

// 度量条仍用 <div> + 伪元素实现，没用 <meter>，因为它的兼容性不好，难以自定义样式。

export function TechMeter({ name, value, logo }) {
	return (
		<li className={styles.item}>
			<img className={styles.logo} alt="logo" src={logo}/>
			{name}
			<div className={styles.meter} style={{ "--value": `${value}%` }}/>
		</li>
	);
}

import Image from "next/image";
import styles from "./ProjectCard.module.scss";

/**
 * 简单的小卡片，用于不重要的项目，包含标题、图标和一句话简介。
 *
 * 项目名最多只能两行，超了布局会乱。
 */
export default function ProjectCard(props) {
	const { name, description, url, icon } = props;

	return (
		<a className={styles.card} href={url}>
			<span className={styles.header}>
				<h2>{name}</h2>
				<Image src={icon} alt="language"/>
			</span>
			{description}
		</a>
	);
}

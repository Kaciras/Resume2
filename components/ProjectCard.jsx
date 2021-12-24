import GitHubIcon from "@/assets/icon/github.svg";
import styles from "./ProjectCard.module.scss";

/**
 * 简单的小卡片，用于不重要的项目，包含标题、图标和一句话简介。
 *
 * 项目名最多只能两行，超了布局会乱。
 */
export default function ProjectCard(props) {
	const { name, description, url } = props;

	return (
		<a className={styles.card} href={url}>
			<div className={styles.header}>
				<h2 className={styles.name}>{name}</h2>
				<GitHubIcon className={styles.icon}/>
			</div>
			{description}
		</a>
	);
}

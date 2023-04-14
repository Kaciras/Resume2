import MergedIcon from "../assets/icon/merged.svg?react";
import ExternalLink from "./ExternalLink.jsx";
import styles from "./PRLink.module.scss";

export default function PRLink({ repo, id }) {
	const url = `https://github.com/${repo}/pull/${id}`;
	return (
		<ExternalLink href={url}>
			<MergedIcon className={styles.icon}/>{repo}#{id}
		</ExternalLink>
	);
}

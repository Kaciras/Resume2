import { useEffect, useState } from "react";
import styles from "./SideTOC.module.scss";

// TODO: 写一半发现没啥用，简历没长到需要目录的地步。
export default function SideTOC() {
	const [headings, setHeadings] = useState([]);

	useEffect(() => {
		setHeadings([...document.querySelectorAll("h1,h2")]);
	});

	const links = headings.map(h =>
		<a
			key={h.textContent}
			href={"#" + h.textContent}
			target="_self"
			className={styles[h.tagName]}
		>
			{h.textContent}
		</a>,
	);

	return <nav className={styles.sideTOC}>{links}</nav>;
}

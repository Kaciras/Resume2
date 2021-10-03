import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { downloadSecret } from "@/lib/common.mjs";
import styles from "./Attachment.module.scss";

export default function Attachment(props) {
	const { className, name, type, encrypted, children } = props;

	const { key } = useRouter().query;
	const [running, setRunning] = useState(false);
	const [url, setUrl] = useState();

	useEffect(() => () => URL.revokeObjectURL(url), [url]);

	if (encrypted && key === undefined) {
		return null;
	}

	async function loadResource() {
		const buffer = await downloadSecret(`/${name}.aes`, key);
		setUrl(URL.createObjectURL(new Blob([buffer], { type })));
	}

	async function handleClick(event) {
		const { target } = event;

		// 已经设置了 href，直接走默认点击流程。
		if (url) return;

		event.preventDefault();
		setRunning(true);
		try {
			await loadResource();

			// 似乎 React 能立即更新 DOM 啊
			target.click();
		} catch (e) {
			alert(`下载失败，${e.message}`);
		} finally {
			setRunning(false);
		}
	}

	const clazz = clsx(
		styles.button,
		className,
		{ [styles.busy]: running },
	);

	return <a className={clazz} download={name} href={url} onClick={handleClick}>{children}</a>;
}

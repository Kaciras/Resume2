import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { downloadSecret } from "@/lib/common.mjs";
import styles from "./Attachment.module.scss";

function triggerDownload(url, filename) {
	const a = document.createElement("a");
	a.download = filename;
	a.href = url;
	document.body.append(a);
	a.click();
	document.body.removeChild(a);
}

export default function Attachment(props) {
	const { className, name, type, encrypted, children } = props;

	const router = useRouter();
	const [running, setRunning] = useState(false);
	const objectUrl = useRef(null);

	useEffect(() => () => URL.revokeObjectURL(objectUrl.current), []);

	const { key } = router.query;

	if (encrypted && !key) {
		return null;
	}

	async function handleClick() {
		if (!objectUrl.current) {
			setRunning(true);
			try {
				const buffer = await downloadSecret(`/${name}.aes`, key);
				const blob = new Blob([buffer], { type });
				objectUrl.current = URL.createObjectURL(blob);
			} catch (e) {
				return alert(`下载失败，${e.message}`);
			} finally {
				setRunning(false);
			}
		}
		triggerDownload(objectUrl.current, name);
	}

	const clazz = clsx(
		styles.button,
		className,
		{ [styles.busy]: running },
	);

	return <button className={clazz} type="button" onClick={handleClick}>{children}</button>;
}

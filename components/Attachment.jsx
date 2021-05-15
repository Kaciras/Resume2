import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import FileDownloadIcon from "@/assets/file-download.svg";
import * as webCrypto from "@/lib/crypto-web.mjs";
import styles from "./Attachment.module.scss";

async function decrypt(password, data) {
	if ("subtle" in window.crypto) {
		return webCrypto.decrypt(password, data);
	} else {
		const nodeCrypto = await import("@/lib/crypto-node");
		return nodeCrypto.decrypt(password, data);
	}
}

function download(url, filename) {
	const a = document.createElement("a");
	a.download = filename;
	a.href = url;
	document.body.append(a);
	a.click();
	document.body.removeChild(a);
}

export default function Attachment(props) {
	const { className, name, type, encrypted, children } = props;

	const [state, setState] = useState();
	const objectUrl = useRef(null);
	const router = useRouter();

	useEffect(() => () => URL.revokeObjectURL(objectUrl.current), []);

	const { key } = router.query;

	if (encrypted && !key) {
		return null;
	}

	async function loadAndDecrypt() {
		const response = await fetch(`/${name}.aes`);
		if (!response.ok) {
			alert(`文件下载失败：${response.status}`);
		}
		const buffer = await decrypt(key, await response.text());
		const blob = new Blob([buffer], { type });
		objectUrl.current = URL.createObjectURL(blob);
	}

	async function handleClick() {
		if (!objectUrl.current) {
			await loadAndDecrypt();
		}
		download(objectUrl.current, name);
	}

	const clazz = clsx(
		styles.button,
		className,
		{ [styles.busy]: state },
	);

	return <button className={clazz} type="button" onClick={handleClick}>{children}</button>;
}

import { useEffect, useState } from "react";
import * as webCrypto from "@/lib/crypto-web";
import AtomSpinner from "@/components/AtomSpinner";
import styles from "./PersonalDetails.module.scss";

/**
 * 用于演示的身份信息，尽量保证与真实信息渲染出来的高度一样，以避免布局移动。
 */
const Placeholder = {
	name: "演示姓名",
	degree: "某某大学，本科，某某很强的专业，2014-2018",
	addresses: {
		电话和微信: 12345678900,
		QQ: 100000000,
		Email: "foobar@example.com",
	},
};

const DecryptState = {
	Free: 0,
	Running: 1,
	Failed: 2,
};

/**
 * 解密由 script/secret-file.mjs 加密的敏感数据。
 *
 * 【性能优化】
 * 优先使用浏览器原生的加密API，如果浏览器不支持则回退到 Polyfill。
 * Polyfill 文件很大要动态加载，以便 webpack 分割。
 *
 * @param data 加密的数据
 * @param password 密码
 * @returns {Promise<BufferSource>} 解密的数据，如果密码错误则为 undefined
 */
async function decrypt(password, data) {
	if ("subtle" in window.crypto) {
		return webCrypto.decrypt(password, data);
	} else {
		const nodeCrypto = await import("@/lib/crypto-node");
		return nodeCrypto.decrypt(password, data);
	}
}

/**
 * 解密指示器，用于提示用户等待解密完成再看。
 *
 * 虽然不太可能在解密上卡很久，但还是指示下保险些。
 */
function DecryptingIndicator({ state }) {
	if (state === DecryptState.Free) {
		return null;
	}
	if (state === DecryptState.Failed) {
		return <div className={styles.failed}>个人信息加载失败！</div>;
	}
	return (
		<div className={styles.indicator}>
			<AtomSpinner className={styles.spinner}/>
			正在加载个人信息...
		</div>
	);
}

/**
 * 初始解密状态，SSR 时为 Free，客户端若有密码则为 Running。
 *
 * @return {number} 状态
 */
function initDecryptState() {
	if (typeof window === "undefined") {
		return DecryptState.Free;
	}
	return new URLSearchParams(location.search).has("key")
		? DecryptState.Running : DecryptState.Free;
}

/**
 * 简历最上方的个人信息栏，可以使用演示信息或真实信息。
 *
 * 如果 URL 带有 key=[password] 参数则尝试解密真实的身份，
 * 如果没有或者密码错误则使用演示信息（Placeholder）
 *
 * <h2>静态站与禁用JS</h2>
 * 如果使用静态构建并部署到开源平台（比如 GitHub），那么预渲染的结果会包含真实信息，
 * 所以这种情况下只能构建含演示信息的版本，真实信息在客户端解密。
 * 这么一来要求客户端不能禁用JS，否则无法解密。
 */
export default function PersonalDetails({ title, children }) {
	const [state, setState] = useState(initDecryptState);
	const [info, setInfo] = useState(Placeholder);

	async function tryUseRealData(password) {
		setState(DecryptState.Running);
		const response = await fetch("/secret.json.aes");

		if (response.status === 404) {
			return setState(DecryptState.Free);
		} else if (!response.ok) {
			console.error("用户信息加载失败，status=" + response.status);
			return setState(DecryptState.Failed);
		}
		const data = await response.text();

		try {
			const json = await decrypt(password, data);
			setInfo(JSON.parse(new TextDecoder().decode(json)));
			setState(DecryptState.Free);
		} catch (e) {
			setState(DecryptState.Failed);
			console.error(`用户信息解密失败：密码错误（${password}）`);
		}
	}

	function refreshPersonalInfo() {
		const key = new URLSearchParams(location.search).get("key");
		key && tryUseRealData(key).catch(e => console.error(e));
	}

	useEffect(refreshPersonalInfo, []);

	const { name, degree, addresses } = info;
	const addressRows = [];
	for (const [k, v] of Object.entries(addresses)) {
		addressRows.push(<dt key={k}>{k}</dt>);
		addressRows.push(<dd key={v}>{v}</dd>);
	}

	// 解密后的内容与示例内容不同，会显示一个预渲染警告，
	// 又因为加密内容不能预渲染，所以只能 suppressHydrationWarning。
	return (
		<section
			suppressHydrationWarning={true}
			className={styles.container}
		>
			<div className={styles.info}>
				<header className={styles.nameGroup}>
					<h1 className={styles.name}>
						{name}
					</h1>
					<h2 className={styles.title}>
						{title}
					</h2>
				</header>
				<dl className={styles.addrGroup}>
					<dt>毕业于</dt>
					<dd>{degree}</dd>
					{addressRows}
				</dl>
			</div>

			{children}

			<DecryptingIndicator state={state}/>
		</section>
	);
}

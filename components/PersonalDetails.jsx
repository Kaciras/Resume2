import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { downloadSecret } from "@/lib/common.mjs";
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

/**
 * 解密指示器，用于提示用户等待解密完成再看。
 *
 * 虽然不太可能在解密上卡很久，但还是指示下保险些。
 */
function DecryptingIndicator({ running }) {
	if (!running) {
		return null;
	}
	return (
		<div className={styles.indicator}>
			<AtomSpinner className={styles.spinner}/>
			正在加载个人信息...
		</div>
	);
}

/**
 * 简历最上方的个人信息栏，可以使用演示信息或真实信息。
 *
 * 如果 URL 带有 key=[password] 参数则尝试解密真实的身份，
 * 如果没有或者密码错误则使用演示信息（Placeholder）
 *
 * <h2>静态站与禁用JS</h2>
 * 如果使用静态构建并部署到开源平台（比如 GitHub），那么预渲染的结果会包含真实信息，
 * 所以就只能在客户端解密，这么一来要求客户端不能禁用 JS。
 */
export default function PersonalDetails({ title, children }) {
	const { key } = useRouter().query;
	const [running, setRunning] = useState(!!key);
	const [info, setInfo] = useState(Placeholder);

	async function tryUseRealData() {
		if (!key) {
			return;
		}
		setRunning(true);
		try {
			const json = await downloadSecret("/info.json.aes", key);
			setInfo(JSON.parse(new TextDecoder().decode(json)));
		} catch (e) {
			alert(`用户信息解密失败，${e.message}`);
		} finally {
			setRunning(false);
		}
	}

	useEffect(() => void tryUseRealData(), [key]);

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

			<DecryptingIndicator running={running}/>
		</section>
	);
}

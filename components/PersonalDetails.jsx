import { useEffect, useState } from "react";
import * as webCrypto from "@/lib/crypto-web";
import AtomSpinner from "@/components/AtomSpinner";
import university from "@/assets/hbpu.jpg";
import realInfo from "@/secret.json.encrypt";
import style from "./PersonalDetails.module.scss";

/**
 * 用于演示的身份信息，尽量保证与真实信息渲染出来的高度一样，以避免布局移动。
 */
const Placeholder = {
	name: "演示姓名",
	degree: ["某某大学 本科 某某很强的专业 2018-2022"],
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
 * 解密由 script/secret-file 加密的敏感数据。
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
		return <div className={style.failed}>个人信息加载失败！</div>;
	}
	return (
		<div className={style.indicator}>
			<AtomSpinner className={style.spinner}/>
			正在加载个人信息...
		</div>
	);
}

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
 * 【静态站与禁用JS】
 * 如果使用静态构建并部署到开源平台（比如 GitHub），那么预渲染的结果会包含真实信息，
 * 所以这种情况下只能构建含演示信息的版本，真实信息在客户端解密。
 *
 * 这么一来要求客户端不能禁用JS，否则只能看到演示信息。
 */
export default function PersonalDetails({ title }) {
	const [state, setState] = useState(initDecryptState);
	const [info, setInfo] = useState(Placeholder);

	function tryUseRealData() {
		const password = new URLSearchParams(location.search).get("key");
		if (!password) {
			return;
		}
		setState(DecryptState.Running);

		decrypt(password, realInfo).then(json => {
			setInfo(JSON.parse(new TextDecoder().decode(json)));
			setState(DecryptState.Free);
		}).catch(() => {
			console.error(`错误的密码（${password}），无法解密个人信息`);
			setState(DecryptState.Failed);
		});
	}

	useEffect(tryUseRealData, []);

	const { name, degree, addresses } = info;
	const addrRow = [];
	for (const [k, v] of Object.entries(addresses)) {
		addrRow.push(<dt key={k}>{k}</dt>);
		addrRow.push(<dd key={v}>{v}</dd>);
	}

	return (
		<section
			suppressHydrationWarning={true}
			className={style.container}
		>
			<div>
				<header className={style.nameGroup}>
					<h1 className={style.name}>{name}</h1>
					<h2 className={style.title}>{title}</h2>
				</header>
				<div className={style.degree}>
					毕业于：
					{degree.map(p => <span key={p}>{p}</span>)}
				</div>
				<dl className={style.addrGroup}>{addrRow}</dl>
			</div>
			<img
				src={university}
				alt="university"
				className={style.university}
			/>
			<DecryptingIndicator state={state}/>
		</section>
	);
}

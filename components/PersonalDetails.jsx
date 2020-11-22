import React, { useEffect, useState } from "react";
import university from "@/assets/hbpu.jpg";
import style from "./PersonalDetails.module.scss";
import realInfo from "@/secret.json.encrypt";
import * as webCrypto from "@/lib/crypto-web";

/** 用于演示的身份信息 */
const Placeholder = {
	name: "演示姓名",
	degree: ["某某大学", "本科"],
	addresses: {
		电话和微信: 12345678900,
		QQ: 100000000,
		Email: "foobar@example.com",
	},
};

const DecryptState = {
	Success: 0,
	Failed: 1,
	Running: 2,
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
 * @returns {Promise<string|undefined>} 解密的数据，如果密码错误则为 undefined
 */
async function decrypt(data, password) {
	try {
		if ("subtle" in window.crypto) {
			const data = await webCrypto.decrypt(password, data);
			return new TextDecoder().decode(data);
		} else {
			const nodeCrypto = await import("@/lib/crypto-node");
			return nodeCrypto.decrypt(password, data);
		}
	} catch (e) {
		console.error(`错误的密码（${password}），无法解密个人信息`);
	}
}

function DecryptIndicator({ state }) {
	if (state === DecryptState.Success) {
		return null;
	}
	const message = state === DecryptState.Failed ? "个人信息加载失败" : "正在加载个人信息";
	return (<div className={style.indicator}>{message}</div>);
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
	const [info, setInfo] = useState(Placeholder);
	const [state, setState] = useState(DecryptState.Success);

	function tryUseRealData() {
		const params = new URLSearchParams(location.search);
		if (!params.has("key")) {
			return;
		}
		setState(DecryptState.Running);
		decrypt(params.get("key"), realInfo).then(data => {
			if (data) {
				setState(DecryptState.Success);
				setInfo(data);
			} else {
				setState(DecryptState.Failed);
			}
		});
	}

	useEffect(tryUseRealData, []);

	const { name, degree, addresses } = info;
	const addrRow = [];
	for (const [k, v] of Object.entries(addresses)) {
		addrRow.push(<span key={k}>{k}</span>);
		addrRow.push(<address key={v}>{v}</address>);
	}

	return (
		<section className={style.container}>
			<DecryptIndicator state={state}/>
			<div>
				<header className={style.nameGroup}>
					<h1 className={style.name}>{name}</h1>
					<h2 className={style.title}>{title}</h2>
				</header>
				<div className={style.degree}>
					毕业于：
					{degree.map(p => <span key={p}>{p}</span>)}
				</div>
				<div className={style.addrGroup}>{addrRow}</div>
			</div>
			<img
				src={university}
				alt="university"
				className={style.university}
			/>
		</section>
	);
}

import React, { useEffect, useState } from "react";
import university from "@/assets/hbpu.jpg";
import { decryptNode } from "@/lib/encrypt";
import style from "./ResumeHeader.module.scss";
import encryptedData from "@/secret.json.encrypt";

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

function tryUseRealData(callback) {
	if (typeof window === "undefined") {
		return;
	}
	const key = new URLSearchParams(location.search).get("key");
	if (!key) {
		return;
	}
	try {
		const data = decryptNode(key, encryptedData);
		callback(JSON.parse(data));
	} catch (e) {
		console.error("参数错误，无法解密个人信息");
	}
}

/**
 * 简历最上方的个人信息栏，可以使用演示信息或真实信息。
 *
 * 如果 URL 带有 key=[password] 参数则尝试解密真实的身份，
 * 如果没有或者密码错误则使用演示信息（Placeholder）
 *
 * 【静态站与禁用JS】
 * 如果使用静态构建并部署到开源平台（比如GitHub），那么预渲染的结果会包含真实信息，
 * 所以这种情况下只能构建含演示信息的版本，真实信息在客户端解密。
 *
 * 这么一来要求客户端不能禁用JS，否则只能看到演示信息。
 */
export default function ResumeHeader({ title }) {
	const [info, setInfo] = useState(Placeholder);
	const { name, degree, addresses } = info;

	useEffect(() => tryUseRealData(setInfo), []);

	const addrRow = [];
	for (const [k, v] of Object.entries(addresses)) {
		addrRow.push(<span key={k}>{k}</span>);
		addrRow.push(<address key={v}>{v}</address>);
	}

	return (
		<header className={style.container}>
			<div>
				<div className={style.nameGroup}>
					<h1 className={style.name}>{name}</h1>
					<span>{title}</span>
				</div>
				<div className={style.degree}>
					毕业于：
					{degree.map(p => <span key={p}>{p}</span>)}
				</div>
				<div className={style.addrGroup}>{addrRow}</div>
			</div>
			<img className={style.university} src={university} alt="university"/>
		</header>
	);
}

import React, { useEffect, useState } from "react";
import university from "@/assets/hbpu.jpg";
import { decryptNode } from "@/lib/encrypt";
import style from "./ResumeHeader.module.scss";
import encryptedData from "@/secret.json.encrypt";

const Placeholder = {
	name: "演示姓名",
	degree: ["某某大学", "本科"],
	addresses: {
		电话和微信: 12345678900,
		QQ: 100000000,
		Email: "foobar@example.com",
	},
};

/**
 * 读取身份信息，用于展示在简历最上面一栏。
 *
 * 如果 URL 带有 key=[password] 参数则尝试解密真实的身份信息，
 * 如果没有或者密码错误则使用演示信息（Placeholder）
 *
 * @return {Promise<object>} 身份信息
 */
async function getPersonalInfo() {
	if (typeof window === "undefined") {
		return Placeholder;
	}
	const key = new URLSearchParams(location.search).get("key");
	if (!key) {
		return Placeholder;
	}
	try {
		return JSON.parse(decryptNode(key, encryptedData));
	} catch (e) {
		return Placeholder; // 密码错误，返回默认数据
	}
}

export default function ResumeHeader({ title }) {
	const [info, setInfo] = useState(Placeholder);
	const { name, degree, addresses } = info;

	useEffect(() => {
		getPersonalInfo().then(setInfo);
		return () => {};
	}, []);

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
					{degree.map(p => (
						<span key={p}>{p}</span>
					))}
				</div>
				<div className={style.addrGroup}>{addrRow}</div>
			</div>
			<img className={style.university} src={university} alt="university" />
		</header>
	);
}

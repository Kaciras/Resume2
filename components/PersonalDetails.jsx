import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { GoAlert } from "react-icons/go";
import { IoIosSchool } from "react-icons/io";
import QQIcon from "../assets/icon/qq.svg?react";
import { downloadSecret } from "../lib/common.js";
import AtomSpinner from "./AtomSpinner";
import styles from "./PersonalDetails.module.scss";

/**
 * 用于演示的身份信息，尽量保证与真实信息渲染出来的高度一样，以避免布局移动。
 */
const placeholder = {
	name: "演示姓名",
	education: "某某大学，本科，网络工程，2014-2018",
	phone: 12345678900,
	mail: "Kaciras@protonmail.com",
	qq: 123456789,
	note: "公共模式下，上面只有邮箱是真的",
};

/**
 * 解密指示器，用于提示用户等待解密完成。
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
 * 如果没有或者密码错误则使用演示信息（placeholder）
 *
 * <h2>静态站与禁用JS</h2>
 * 如果使用静态构建并部署到开源平台（比如 GitHub），那么预渲染的结果会包含真实信息，
 * 所以就只能在客户端解密，这么一来要求客户端不能禁用 JS。
 */
export default function PersonalDetails({ title, children }) {
	const { key } = useRouter().query;
	const [running, setRunning] = useState(!!key);
	const [info, setInfo] = useState(placeholder);

	function tryUseRealData() {
		if (key === undefined) {
			return;
		}
		setRunning(true);
		downloadSecret("/info.json.aes", key)
			.then(json => JSON.parse(new TextDecoder().decode(json)))
			.then(setInfo)
			.catch(e => alert(`用户信息解密失败，${e.message}`))
			.finally(() => setRunning(false));
	}

	useEffect(tryUseRealData, [key]);

	const { name, phone, mail, qq, education, note } = info;
	const attributes = [];

	// 图标要对应，同时一些项还要是链接，只能一个个写死了。
	if (mail) {
		attributes.push(<dt><GrMail/>邮箱</dt>);
		attributes.push(<dd><a href={"mailto:" + mail}>{mail}</a></dd>);
	}
	if (phone) {
		attributes.push(<dt><BsFillTelephoneFill/>电话</dt>);
		attributes.push(<dd><a href={"tel:" + phone}>{phone}</a></dd>);
	}
	if (qq) {
		attributes.push(<dt><QQIcon/>QQ</dt>, <dd>{qq}</dd>);
	}
	if (education) {
		attributes.push(<dt><IoIosSchool/>学历</dt>, <dd>{education}</dd>);
	}
	if (note) {
		attributes.push(<dt><GoAlert/>注意</dt>, <dd>{note}</dd>);
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
				<dl className={styles.attributes}>
					{attributes}
				</dl>
			</div>

			{children}

			<DecryptingIndicator running={running}/>
		</section>
	);
}

import { useContext } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { GoAlert } from "react-icons/go";
import { IoIosSchool } from "react-icons/io";
import QQIcon from "../assets/icon/qq.svg?react";
import AtomSpinner from "./AtomSpinner";
import styles from "./PersonalDetails.module.scss";
import { PersonInfoContext } from "./PersonInfoContext.jsx";

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
	const { loading, info } = useContext(PersonInfoContext);

	const { name, phone, mail, qq, education, note } = info;
	const attributes = [];

	// 图标要对应，同时一些项还要是链接，一个个写死也行，就是这个 key 属性挺烦人。
	if (mail) {
		attributes.push(<dt key="mail-k"><GrMail/>邮箱</dt>);
		attributes.push(<dd key="mail-v"><a href={"mailto:" + mail}>{mail}</a></dd>);
	}
	if (phone) {
		attributes.push(<dt key="phone-k"><BsFillTelephoneFill/>电话</dt>);
		attributes.push(<dd key="phone-v"><a href={"tel:" + phone}>{phone}</a></dd>);
	}
	if (qq) {
		attributes.push(<dt key="qq-k"><QQIcon/>QQ</dt>, <dd key="qq-k">{qq}</dd>);
	}
	if (education) {
		attributes.push(<dt key="edu-k"><IoIosSchool/>学历</dt>);
		attributes.push(<dd key="edu-v">{education}</dd>);
	}
	if (note) {
		attributes.push(<dt key="ps-k"><GoAlert/>注意</dt>, <dd key="ps-v">{note}</dd>);
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

			<DecryptingIndicator running={loading}/>
		</section>
	);
}

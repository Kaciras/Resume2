import React from "react";

/**
 * 简化一下第三方跳转的链接元素，设置一些通用属性并默认使用地址作为内容。
 */
export default function OutLink(props) {
	const content = props.children || props.href;
	return <a {...props} rel="noopener">{content}</a>;
}

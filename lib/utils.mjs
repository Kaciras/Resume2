/**
 * 解码 base64 字符串，同时支持 Node 和浏览器。
 *
 * @param text {string} base64 字符串
 * @returns {Uint8Array} 解码后的数据
 */
export function base64Decode(text) {
	if (typeof window === "undefined") {
		return Buffer.from(text, "base64");
	}
	return Uint8Array.from(atob(text), c => c.charCodeAt(0));
}

/**
 * 编码 base64 字符串，同时支持 Node 和浏览器。
 *
 * @param data {ArrayBuffer} 原始数据
 * @return {string} base64 字符串
 */
export function base64Encode(data) {
	if (typeof window === "undefined") {
		return Buffer.from(data).toString("base64");
	}
	return btoa(new TextDecoder().decode(data));
}

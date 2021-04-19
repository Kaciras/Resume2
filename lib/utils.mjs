/**
 * 解码 base64 字符串，浏览器竟然没有一个原生的 API。
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

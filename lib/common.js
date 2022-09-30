import * as webCrypto from "./crypto-web.js";

/**
 * 下载被加密的资源，然后使用指定的密码解密，同时处理该过程中的各种异常。
 *
 * @param url 资源的 URL
 * @param password 密码
 * @return {Promise<ArrayBuffer>} 解密后的数据
 */
export async function downloadSecret(url, password) {
	let response;
	let data;
	try {
		response = await fetch(url);
		data = await response.text();
	} catch (e) {
		throw new Error("网络错误");
	}

	const { status } = response;
	if (status === 404) {
		throw new Error("指定的资源不存在");
	} else if (status !== 200) {
		throw new Error(`HTTP 错误：${status}`);
	}

	/*
	 * 优先使用原生的加密 API，如果不支持则回退到 Polyfill。
	 * 因为 Polyfill 文件很大所以要动态加载，以便 webpack 分割。
	 *
	 * 一些浏览器限制了原生的加密 API 只能运行在 HTTPS 下，
	 * 所以为了允许 HTTP 访问，不能删掉这个 Polyfill。
	 */
	const library = "subtle" in window.crypto
		? webCrypto
		: await import("./crypto-node");

	try {
		return await library.decrypt(password, data);
	} catch (e) {
		// 这里打印一下便于调试。
		console.error(e);
		throw new Error(`密码错误：${password}`);
	}
}

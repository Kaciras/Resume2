import { iterations, IV, SALT } from "./constants";

function base64Decode(text) {
	return Uint8Array.from(atob(text), c => c.charCodeAt(0));
}

/**
 * 将任意长度的字符串密码转换为供 AES 用的密钥。
 *
 * @param password 密码
 * @returns {PromiseLike<CryptoKey>} AES密钥
 */
async function getKey(password) {
	const encoder = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		"PBKDF2",
		false,
		["deriveKey"]);

	return crypto.subtle.deriveKey({
		name: "PBKDF2",
		hash: "SHA-256",
		salt: encoder.encode(SALT),
		iterations,
	}, keyMaterial, {
		name: "AES-GCM",
		length: 128,
	}, false, ["encrypt", "decrypt"]);
}

/**
 * 使用浏览器内置的 CryptoAPI 加密数据。
 *
 * @param password {string} 密码
 * @param input {*} 数据
 * @return {string} 加密的数据，是base64编码的字符串
 */
export async function encrypt(password, input) {
	const key = await getKey(password);
	const aesParams = {
		name: "AES-GCM",
		iv: base64Decode(IV),
	};
	const data = await crypto.subtle.encrypt(aesParams, key, input);
	const decoder = new TextDecoder();
	return btoa(decoder.decode(data));
}

/**
 * 使用浏览器内置的 CryptoAPI 解密数据。
 *
 * @param password {string} 密码
 * @param input {string} base64编码的数据
 * @return {PromiseLike<ArrayBuffer>} 解码后的数据
 */
export async function decrypt(password, input) {
	let data = base64Decode(input);

	const key = await getKey(password);
	const aesParams = {
		name: "AES-GCM",
		iv: base64Decode(IV),
	};
	return crypto.subtle.decrypt(aesParams, key, data);
}

import { iterations, IV, SALT } from "./constants";

function base64Decode(text) {
	return Uint8Array.from(atob(text), c => c.charCodeAt(0));
}

async function pbkdf2Native(password, salt, iterations, length, hash) {
	const ec = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		Uint8Array.from(password, c => c.charCodeAt(0)),
		'PBKDF2',
		false,
		["deriveKey"]);
	return crypto.subtle.deriveKey({
		name: 'PBKDF2',
		hash,
		salt: Uint8Array.from(salt, c => c.charCodeAt(0)),
		iterations,
	}, keyMaterial, {
		name: 'AES-GCM',
		length,
	}, true, ['decrypt']);
}

/**
 * 使用浏览器内置的 CryptoAPI 解密数据。
 *
 * TODO: 好像有点问题
 *
 * @param password {string} 密码
 * @param input {string} base64编码的数据
 * @return {PromiseLike<ArrayBuffer>} 解码后的数据
 */
export async function decryptCryptoAPI(password, input) {
	let data = base64Decode(input);
	const authTag = data.slice(data.length - 16);
	data = data.slice(0, data.length - 16);

	const key = await pbkdf2Native(password, SALT, iterations, 128, "SHA-256");
	const aesParams = {
		name: "AES-GCM",
		iv: base64Decode(IV),
		tagLength: 128,
		additionalData: authTag,
	};
	return crypto.subtle.decrypt(aesParams, key, data);
}

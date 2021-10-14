import { iterations, iv, salt } from "./constants";
import { base64Decode, base64Encode } from "./utils";

// Node 的模块还处于实验状态，仅用于测试。
let subtle;
if (typeof window !== "undefined") {
	subtle = crypto.subtle;
} else {
	subtle = require("crypto").webcrypto.subtle;
}

/**
 * 将任意长度的字符串密码转换为供 AES 用的密钥。
 *
 * @param password {string} 密码
 * @returns {PromiseLike<CryptoKey>} AES密钥
 */
async function getKey(password) {
	const encoder = new TextEncoder();
	const keyMaterial = await subtle.importKey(
		"raw",
		encoder.encode(password),
		"PBKDF2",
		false,
		["deriveKey"]);

	return subtle.deriveKey({
		name: "PBKDF2",
		hash: "SHA-256",
		salt: encoder.encode(salt),
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
 * @return {Promise<string>} 加密的数据，是 base64 编码的字符串
 */
export async function encrypt(password, input) {
	const key = await getKey(password);
	const algorithm = {
		name: "AES-GCM",
		iv: base64Decode(iv),
	};
	const buffer = await subtle.encrypt(algorithm, key, input);
	return base64Encode(buffer);
}

/**
 * 使用浏览器内置的 CryptoAPI 解密数据。
 *
 * @param password {string} 密码
 * @param input {string} base64 编码的数据
 * @return {PromiseLike<ArrayBuffer>} 解码后的数据
 */
export async function decrypt(password, input) {
	const data = base64Decode(input);
	const key = await getKey(password);
	const algorithm = {
		name: "AES-GCM",
		iv: base64Decode(iv),
	};
	return subtle.decrypt(algorithm, key, data);
}

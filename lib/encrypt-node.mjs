import crypto from "crypto";
import { iterations, IV, SALT } from "./constants";

/**
 * 解密数据，该函数可以在 NodeJS 中使用，如果要在浏览器里使用需要 webpack 的 polyfill。
 *
 * 【Polyfill 的坑】
 * Polyfill 里的 pbkdf2Sync 不能使用大写的 SHA256，如果用了也不报错而是生成全0的密钥。
 *
 * @param password {string} 密码
 * @param input {string} base64编码的数据
 * @return {Buffer} 解码后的数据
 */
export function decryptNode(password, input) {
	const key = crypto.pbkdf2Sync(password, SALT, iterations, 16, "sha256");

	// aes-128-gcm 的 authTag 长度为 16 bytes
	let data = Buffer.from(input, "base64");
	const authTag = data.slice(data.length - 16);
	data = data.slice(0, data.length - 16);

	const decipher = crypto.createDecipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));
	decipher.setAuthTag(authTag);

	return decipher.update(data) + decipher.final();
}

/**
 * 加密数据，该函数可以在 NodeJS 中使用，如果要在浏览器里使用需要 webpack 的 polyfill。
 *
 * @param password {string} 密码
 * @param data {*} 数据
 * @return {string} 加密的数据，是base64编码的字符串
 */
export function encryptNode(password, data) {
	const key = crypto.pbkdf2Sync(password, SALT, iterations, 16, "sha256");
	const cipher = crypto.createCipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));

	const firstBlock = cipher.update(data);
	const lastBlock = cipher.final();
	const authTag = cipher.getAuthTag();

	return Buffer.concat([firstBlock, lastBlock, authTag]).toString("base64");
}

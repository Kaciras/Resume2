import crypto from "crypto";
import { iterations, IV, SALT } from "./constants.mjs";

/**
 * 将任意长度的字符串密码转换为供 AES 用的密钥。
 *
 * 【坑】
 * Polyfill 里没有处理摘要算法名大小写，故最后那个参数只能用小写的。
 *
 * @param password {string} 密码
 * @returns {Buffer} AES密钥
 */
function getKey(password) {
	return crypto.pbkdf2Sync(password, SALT, iterations, 16, "sha256");
}

/**
 * 加密数据，该函数可以在 NodeJS 中使用，如果要在浏览器里使用需要 webpack 的 polyfill。
 *
 * @param password {string} 密码
 * @param input {BinaryLike} 数据
 * @return {string} 加密的数据，是 base64 编码的字符串
 */
export function encrypt(password, input) {
	const key = getKey(password);
	const cipher = crypto.createCipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));

	const firstBlock = cipher.update(input);
	const lastBlock = cipher.final();
	const authTag = cipher.getAuthTag();

	return Buffer.concat([firstBlock, lastBlock, authTag]).toString("base64");
}

/**
 * 解密数据，该函数可以在 NodeJS 中使用，如果要在浏览器里使用需要 webpack 的 polyfill。
 *
 * 【Polyfill 的坑】
 * Polyfill 里的 pbkdf2Sync 不能使用大写的 SHA256，如果用了也不报错而是生成全0的密钥。
 *
 * @param password {string} 密码
 * @param input {string} base64 编码的数据
 * @return {Buffer} 解码后的数据
 */
export function decrypt(password, input) {
	const key = getKey(password);

	// 分离尾部的校验数据，AES-128-GCM 的 AuthTag 长度为 16 bytes
	let data = Buffer.from(input, "base64");
	const authTag = data.slice(data.length - 16);
	data = data.slice(0, data.length - 16);

	const decipher = crypto.createDecipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));
	decipher.setAuthTag(authTag);

	return Buffer.concat([decipher.update(data), decipher.final()]);
}

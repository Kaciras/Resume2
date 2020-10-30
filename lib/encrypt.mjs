import crypto from "crypto";

// PKDF2 的盐值，文档里建议至少 16 字节
// assert Buffer.from(SALT).length >= 16
const SALT = "我为何这么帅";

// 提高迭代次数防爆破，但会增加运算量
const iterations = 16;

// 固定的向量值，跟 Hash 里的盐值作用差不多
const IV = "hithGRpq0orJcvDOZQwgZQ==";

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
	const encoder = new TextEncoder();

	const iv = Uint8Array.from(atob(IV), c => c.charCodeAt(0));
	const key = encoder.encode(password);
	input = encoder.encode(btoa(input));

	const cKey = await crypto.subtle.importKey("raw", key, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);

	const aesKey = await crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: encoder.encode(SALT),
			iterations,
			hash: "SHA-256",
		},
		cKey,
		{
			name: "AES-GCM",
			length: 128,
		},
		true,
		["decrypt"]
	);

	return crypto.subtle.decrypt({ name: "AES-GCM", iv }, aesKey, input);
}

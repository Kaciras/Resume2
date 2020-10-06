import crypto from "crypto";

// PKDF2 的盐值，文档里建议至少 16 字节
// assert Buffer.from(SALT).length >= 16
const SALT = "我为何这么帅";

const Iterations = 16;

// 固定的向量值，跟 Hash 里的盐值作用差不多
const IV = "hithGRpq0orJcvDOZQwgZQ==";

/**
 *
 */
class InvalidPasswordError extends Error {
	constructor(key) {
		super("Invalid decrypt password: " + key);
	}
}

InvalidPasswordError.prototype.name = "InvalidPasswordError";

// data 都是 base64 string

export function decryptAESNode(password, data) {
	const key = crypto.pbkdf2Sync(password, SALT, Iterations, 16, "SHA256");

	data = Buffer.from(data, "base64");
	const authTag = data.slice(data.length - 16);
	data = data.slice(0, data.length - 16);

	const decipher = crypto.createDecipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));
	decipher.setAuthTag(authTag);

	return decipher.update(data, "base64") + decipher.final();
}

export function encryptAESNode(password, data) {
	const key = crypto.pbkdf2Sync(password, SALT, Iterations, 16, "SHA256");
	const cipher = crypto.createCipheriv("aes-128-gcm", key, Buffer.from(IV, "base64"));

	const firstBlock = cipher.update(data);
	const lastBlock = cipher.final();
	const authTag = cipher.getAuthTag();

	return Buffer.concat([firstBlock, lastBlock, authTag]).toString("base64");
}

export async function decryptAESCryptoAPI(password, data) {
	const encoder = new TextEncoder();

	const iv = Uint8Array.from(atob("hithGRpq0orJcvDOZQwgZQ=="), c => c.charCodeAt(0));
	const key = encoder.encode(password);
	data = encoder.encode(btoa(data));

	const cKey = await crypto.subtle.importKey("raw", key, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);

	const aesKey = await crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: encoder.encode("salt"),
			iterations: 666,
			hash: "SHA-256"
		},
		cKey,
		{
			name: "AES-GCM",
			length: 128
		},
		true,
		["decrypt"]
	);
	console.log(iv.length);

	try {
		const d = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, aesKey, data);
		return new TextDecoder().decode(d);
	} catch (e) {
		throw new InvalidPasswordError(password);
	}
}

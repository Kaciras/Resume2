import { createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";
import { AESHelper } from "@kaciras/utilities/browser";

/**
 * 解密数据，该函数可以在 NodeJS 中使用，如果要在浏览器里使用需要 webpack 的 polyfill。
 */
export default class NodeAESHelper {

	// 【坑】Polyfill 里的 pbkdf2Sync 不能使用大写的 SHA512,如果用了也不报错而是生成全 0 的密钥。
	constructor(password) {
		this.algorithm = "aes-128-gcm";
		this.iv = AESHelper.DEFAULT_IV;
		this.key = pbkdf2Sync(password, AESHelper.DEFAULT_SALT, 240537, 16, "sha512");
	}

	encrypt(input) {
		const { algorithm, key, iv } = this;
		const cipher = createCipheriv(algorithm, key, iv);

		const firstBlock = cipher.update(input);
		const lastBlock = cipher.final();
		const authTag = cipher.getAuthTag();

		return Buffer.concat([firstBlock, lastBlock, authTag]);
	}

	decrypt(input) {
		const { algorithm, key, iv } = this;

		// 分离尾部的校验数据，AES-128-GCM 的 AuthTag 长度为 16 bytes
		let data = Buffer.from(input);
		const authTag = data.subarray(data.length - 16);
		data = data.subarray(0, data.length - 16);

		const decipher = createDecipheriv(algorithm, key, iv);
		decipher.setAuthTag(authTag);

		return Buffer.concat([decipher.update(data), decipher.final()]);
	}
}

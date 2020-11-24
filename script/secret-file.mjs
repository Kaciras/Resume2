/**
 * 该脚本用于加密敏感数据，比如个人信息，以免在开源平台泄漏。
 *
 * 【使用方法】
 * node script/secret-file.mjs encrypt secret.json [password]
 *
 * 使用指定的密码加密根目录下的 secret.json -> secret.json.encrypt
 */
import { join } from "path";
import fs from "fs";
import { decrypt, encrypt } from "../lib/crypto-node.mjs";

if (process.argv.length !== 5) {
	console.error("Arguments required, usage: node script/secret-file.mjs [en|de]crypt filename password");
	process.exit(1);
}

const [, self, mode, filename, password] = process.argv;

// ES Module 模式下没有 __dirname 变量，所以只能用参数里的。
process.chdir(join(self, "../.."));
const distFile = filename + ".encrypt";

switch (mode) {
	case "encrypt": {
		const data = encrypt(password, fs.readFileSync(filename));
		fs.writeFileSync(distFile, data);
		break;
	}
	case "decrypt": {
		const data = fs.readFileSync(distFile, { encoding: "utf8" });
		console.log(decrypt(password, data));
		break;
	}
	default:
		console.error(`Unknown mode: ${mode}, allow "encrypt" or "decrypt"`);
		process.exit(2);
}

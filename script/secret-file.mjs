/**
 * 该脚本用于加密敏感数据，比如个人信息，以免在开源平台泄漏。
 *
 * 【使用方法】
 * node script/secret-file.mjs encrypt <password>
 * 使用指定的密码加密 /secret 目录下的文件，结果全部保存到 /public 目录。
 *
 * node script/secret-file.mjs decrypt <password> info.json.aes
 * 解密 /public/info.json.aes 文件，在控制台输出其内容。
 *
 * 【加密后的编码】
 * 加密的文件使用 base64 编码，这虽然多了一步，但 base64 文本在 webpack 打包时更具扩展性。
 */
import { join } from "path";
import fs from "fs";
import { decrypt, encrypt } from "../lib/crypto-node.mjs";

if (process.argv.length < 4) {
	console.error("Arguments required, usage: node script/secret-file.mjs [en|de]crypt password [filename]");
	process.exit(2);
}

const [, __filename, mode, password, filename] = process.argv;

// ES Module 模式下没有 __dirname，只能用运行参数。
process.chdir(join(__filename, "../../secret"));

function encryptFiles(path) {
	const stat = fs.statSync(path);
	if (stat.isDirectory()) {
		fs.readdirSync(path).forEach(encryptFiles);
	} else {
		let data = fs.readFileSync(path);
		data = encrypt(password, data);
		fs.writeFileSync(`public/${path}.aes`, data);
	}
}

function decryptFile(path) {
	if (!path) {
		console.error("File name needed for decryption.");
		process.exit(2);
	}
	const data = fs.readFileSync(`public/${path}.aes`, "utf8");
	process.stdout.write(decrypt(password, data).toString());
}

switch (mode) {
	case "encrypt":
		encryptFiles(filename ?? ".");
		break;
	case "decrypt":
		decryptFile(filename);
		break;
	default:
		console.error(`Unknown mode: ${mode}, allow "encrypt" or "decrypt"`);
		process.exit(2);
}

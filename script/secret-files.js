/**
 * 该脚本用于加密敏感数据，比如个人信息，以免在部署到公有平台时泄漏。
 *
 * 【使用方法】
 * node script/secret-file.js encrypt <password>
 * 使用指定的密码加密 /secret 目录下的文件，结果全部保存到 /public 目录。
 *
 * node script/secret-file.js decrypt <password> info.json.aes
 * 解密 /public/info.json.aes 文件，在控制台输出其内容。
 */
import { argv, exit, stdout } from "process";
import { dirname, join } from "path";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { AESHelper } from "@kaciras/utilities/browser";

if (argv.length < 4) {
	console.error("Arguments required, usage: node script/secret-file.js [en|de]crypt password [path]");
	exit(2);
}

const [, , mode, password, filename] = argv;

// ES Module 模式下没有 __dirname，用运行参数代替。
const root = dirname(import.meta.dirname);
const inputDir = join(root, "secret");
const outputDir = join(root, "public");

const aes = await AESHelper.withPassword(password);

/**
 * 加密 inputDir 下的文件，如果是目录则递归，结果保存到 outputDir。
 */
async function encryptFiles(name) {
	const path = join(inputDir, name);

	if (statSync(path).isDirectory()) {
		return readdirSync(path).forEach(encryptFiles);
	}

	let data = await aes.encrypt(readFileSync(path));
	data = Buffer.from(data);
	writeFileSync(`${outputDir}/${name}.aes`, data);
}

async function decryptFile(name) {
	if (!name) {
		console.error("File name needed for decryption.");
		exit(2);
	}
	const path = join(outputDir, name + ".aes");
	stdout.write(await aes.decryptText(readFileSync(path)));
}

if (mode === "encrypt") {
	await encryptFiles(filename ?? "secret");
} else if (mode === "decrypt") {
	await decryptFile(filename);
} else {
	throw new Error(`Unknown command: ${mode}, available: encrypt, decrypt`);
}

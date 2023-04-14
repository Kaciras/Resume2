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
import NodeAESHelper from "../lib/crypto-node.js";

if (argv.length < 4) {
	console.error("Arguments required, usage: node script/secret-file.js [en|de]crypt password [filename]");
	exit(2);
}

const [, __filename, mode, password, filename] = argv;

// ES Module 模式下没有 __dirname，用运行参数代替。
const root = dirname(dirname(__filename));
const inputDir = join(root, "secret");
const outputDir = join(root, "public");

const aes = new NodeAESHelper(password);

/**
 * 加密 inputDir 下的文件，如果是目录则递归，结果保存到 outputDir。
 */
function encryptFiles(name) {
	const path = join(inputDir, name);

	if (statSync(path).isDirectory()) {
		return readdirSync(path).forEach(encryptFiles);
	}

	const data = aes.encrypt(readFileSync(path));
	writeFileSync(`${outputDir}/${name}.aes`, data);
}

function decryptFile(name) {
	if (!name) {
		console.error("File name needed for decryption.");
		exit(2);
	}
	const path = join(outputDir, name + ".aes");
	stdout.write(aes.decrypt(readFileSync(path)));
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
		exit(2);
}

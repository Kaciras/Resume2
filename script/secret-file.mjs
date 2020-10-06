import { join } from "path";
import fs from "fs";
import { decryptNode, encryptNode } from "../lib/encrypt.mjs";

if (process.argv.length !== 5) {
	console.error("Arguments required, use: node script/secret-file.mjs mode filename password");
	process.exit(1);
}

const [, self, mode, filename, password] = process.argv;

process.chdir(join(self, "../.."));
const distFile = filename + ".encrypt";

switch (mode) {
	case "encrypt": {
		const data = encryptNode(password, fs.readFileSync(filename));
		fs.writeFileSync(distFile, data);
		break;
	}
	case "decrypt": {
		const data = fs.readFileSync(distFile, { encoding: "utf8" });
		console.log(decryptNode(password, data));
		break;
	}
	default:
		console.error(`Unknown mode: ${mode}, use "encrypt" or "decrypt"`);
		process.exit(2);
}

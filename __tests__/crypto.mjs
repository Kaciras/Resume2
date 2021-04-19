import fs from "fs";
import { join } from "path";
import * as nodeCrypto from "../lib/crypto-node";
import * as webCrypto from "../lib/crypto-web";

const data = fs.readFileSync(join(__dirname, "fixtures/data.json"));

it("should ", async () => {
	const encrypted = nodeCrypto.encrypt("foo+bar", data);
	const decrypted = await webCrypto.decrypt("foo+bar", encrypted);
	expect(decrypted).toEqual(Array.from(data));
});

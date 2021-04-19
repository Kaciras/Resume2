import fs from "fs";
import { join } from "path";
import * as nodeCrypto from "../lib/crypto-node";
import * as webCrypto from "../lib/crypto-web";

const data = fs.readFileSync(join(__dirname, "fixtures/data.json"));

it("should support node encrypt and web decrypt", async () => {
	const encrypted = nodeCrypto.encrypt("foo+bar", data);
	const decrypted = await webCrypto.decrypt("foo+bar", encrypted);
	expect(Buffer.from(decrypted)).toEqual(data);
});

it("should support web encrypt and node decrypt", async () => {
	const encrypted = await webCrypto.encrypt("foo+bar", data);
	const decrypted = nodeCrypto.decrypt("foo+bar", encrypted);
	expect(Buffer.from(decrypted)).toEqual(data);
});

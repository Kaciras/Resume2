import { readFileSync } from "fs";
import { join } from "path";
import * as nodeCrypto from "../lib/crypto-node";
import * as webCrypto from "../lib/crypto-web";

const plain = readFileSync(join(__dirname, "fixtures/data.json"));
const encrypted = readFileSync(join(__dirname, "fixtures/data.aes"), { encoding: "utf8" });

it("should support web encrypt", async () => {
	expect(await webCrypto.encrypt("foo+bar", plain)).toEqual(encrypted);
});

it("should support node encrypt", () => {
	expect(nodeCrypto.encrypt("foo+bar", plain)).toEqual(encrypted);
});

it("should support web decrypt", async () => {
	const arrayBuffer = await webCrypto.decrypt("foo+bar", encrypted);
	expect(Buffer.from(arrayBuffer)).toEqual(plain);
});

it("should support node decrypt", () => {
	expect(nodeCrypto.decrypt("foo+bar", encrypted)).toEqual(plain);
});

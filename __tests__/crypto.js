import { readFileSync } from "fs";
import { join } from "path";
import nodeCrypto from "../lib/crypto-node.js";

const plain = readFileSync(join(__dirname, "fixtures/data.json"));
const encrypted = readFileSync(join(__dirname, "fixtures/data.aes"), { encoding: "utf8" });

it("should support node encrypt", () => {
	expect(nodeCrypto.encrypt("foo+bar", plain)).toEqual(encrypted);
});

it("should support node decrypt", () => {
	expect(nodeCrypto.decrypt("foo+bar", encrypted)).toEqual(plain);
});

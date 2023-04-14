import { readFileSync } from "fs";
import { AESHelper } from "@kaciras/utilities/browser";
import NodeAESHelper from "../lib/crypto-node.js";

const plain = readFileSync("__tests__/fixtures/data.json");
const encrypted = readFileSync("__tests__/fixtures/data.aes");

it("should support web encrypt", async () => {
	const aes = await AESHelper.withPassword("foo+bar");
	expect(Buffer.from(await aes.encrypt(plain))).toEqual(encrypted);
});

it("should support web decrypt", async () => {
	const aes = await AESHelper.withPassword("foo+bar");
	expect(Buffer.from(await aes.decrypt(encrypted))).toEqual(plain);
});

it("should support node encrypt", () => {
	expect(new NodeAESHelper("foo+bar").encrypt(plain)).toEqual(encrypted);
});

it("should support node decrypt", () => {
	expect(new NodeAESHelper("foo+bar").decrypt(encrypted)).toEqual(plain);
});

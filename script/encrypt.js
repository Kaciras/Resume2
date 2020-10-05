const { pbkdf2Sync, createCipheriv, createDecipheriv, randomBytes } = require("crypto");
const fs = require("fs");
const { join } = require("path");

process.chdir(join(__dirname, ".."));

const IV = Buffer.from("hithGRpq0orJcvDOZQwgZQ==", "base64");

function decryptAES(password, data) {
	data = Buffer.from(data, "base64");
	const tag = data.slice(data.length - 16);
	data = data.slice(0, data.length - 16);

	const key = pbkdf2Sync(password, "salt", 666, 16, "SHA256");
	const decipher = createDecipheriv("aes-128-gcm", key, IV);
	decipher.setAuthTag(randomBytes(16));
	return decipher.update(data, "base64", "utf8") + decipher.final("utf8");
}

function encryptAES(password, data) {
	const key = pbkdf2Sync(password, "salt", 666, 16, "SHA256");
	const cipher = createCipheriv("aes-128-gcm", key, IV);
	return Buffer.concat([cipher.update(data), cipher.final(), cipher.getAuthTag()]);
}

const [, , filename, password] = process.argv;
// const raw = fs.readFileSync(filename);
// const encrypted = encryptAES(password, raw);
// fs.writeFileSync(filename + ".enc", encrypted.toString("base64"));

const raw = fs.readFileSync(filename + ".enc", "utf8");
const x = decryptAES(password, raw);
console.log(x);

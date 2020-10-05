const { pbkdf2Sync, createCipheriv } = require("crypto");
const fs = require("fs");
const { join } = require("path");

process.chdir(join(__dirname, ".."));

const IV = Buffer.from("hithGRpq0orJcvDOZQwgZQ==", "base64");

function aesEncrypt(password, data) {
	const key = pbkdf2Sync(password, "salt", 666, 16, "SHA256");
	const cipher = createCipheriv("aes-128-gcm", key, IV);
	return Buffer.concat([cipher.update(data), cipher.final()]);
}

const [, , filename, password] = process.argv;
const raw = fs.readFileSync(filename);
const encrypted = aesEncrypt(password, raw);
fs.writeFileSync(filename + ".enc", encrypted);

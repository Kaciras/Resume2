import { AESHelper, FetchClient } from "@kaciras/utilities/browser";

// import { writeFileSync } from "fs";

/**
 * 下载被加密的资源，然后使用指定的密码解密，同时处理该过程中的各种异常。
 *
 * @param url 资源的 URL
 * @param password 密码
 * @return {Promise<ArrayBuffer>} 解密后的数据
 */
export async function downloadSecret(url, password) {
	let response;
	let data;
	try {
		response = await fetch(url);
		data = await response.arrayBuffer();
	} catch (e) {
		throw new Error("网络错误");
	}

	const { status } = response;
	if (status === 404) {
		throw new Error("指定的资源不存在");
	} else if (status !== 200) {
		throw new Error(`HTTP 错误：${status}`);
	}

	if (!window.crypto.subtle) {
		throw new Error("没有启用 HTTPS，或浏览器不支持解密。");
	}

	const library = await AESHelper.withPassword(password);
	try {
		return await library.decrypt(data);
	} catch (e) {
		// 这里打印一下便于调试。
		console.error(e);
		throw new Error(`密码错误：${password}`);
	}
}


function getEndDate(to) {
	if (!to) {
		return new Date();
	}
	const year = new Date(to).getFullYear();
	return new Date(year, 11, 31);
}

function padding(length, timestamp) {
	const value = { level: 0, date: timestamp, count: 0 };
	return Array.from({ length }, () => value);
}

export async function getGitHubContributions(user, to) {
	const url = new URL(`https://github.com/users/${user}/contributions`);
	if (to) {
		url.searchParams.set("to", to);
	}
	const html = await new FetchClient().get(url).text();

	const tooltips = html.matchAll(/>(\w+) contributions? on \w+ \w+/g);
	const cells = html.matchAll(/data-date="(\d+-\d+-\d+)" .*? data-level="(\d+)"/g);
	let commits = [];

	for (const [, count] of tooltips) {
		let [, date, level] = cells.next().value;
		commits.push({
			level: parseInt(level),
			date: new Date(date).getTime(),
			count: parseInt(count) || 0,
		});
	}

	const dayOfWeek = getEndDate().getDay();
	commits.push(...padding(6 - dayOfWeek, Number.MAX_VALUE));
	commits.push(...padding(371 - commits.length, 0));
	return commits.sort((a, b) => a.date - b.date);
}

// writeFileSync("commits.json", JSON.stringify(await getGitHubContributions("Kaciras")));

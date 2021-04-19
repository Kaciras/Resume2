// 将 ES Modules 转为 CJS 的配置，用于 Jest 测试。
// 本文件仅被 babel-jest 使用，next.js 使用它内置的配置。
//
// Jest 以后会内置 ES Modules 支持：
// https://jestjs.io/docs/ecmascript-modules
module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
	],
};

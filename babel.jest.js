// 将 ES Modules 转为 CJS 的配置，用于 Jest 测试。
// 本文件仅被 babel-jest 使用，next.js 有它内置的文件。
//
// Jest 有实验性的原生 ES Modules 支持，但需要添加 node 参数太麻烦：
// https://jestjs.io/docs/ecmascript-modules
module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
	],
};

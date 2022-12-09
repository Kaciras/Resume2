import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router.js";
import { downloadSecret } from "../lib/common.js";

/**
 * 用于演示的身份信息，尽量保证与真实信息渲染出来的高度一样，防止布局移动太大（移动本身是无法避免的）。
 */
const demoInfo = {
	name: "演示姓名",
	education: "某某大学，本科，网络工程，2014-2018",
	phone: 12345678900,
	mail: "Kaciras@outlook.com",
	note: "公共模式下，上面只有邮箱是真的",
};

export const PersonInfoContext = createContext({ loading: false, info: demoInfo });

export default function PersonInfoProvider({ children }) {
	const { key } = useRouter().query;
	const [loading, setLoading] = useState(Boolean(key));
	const [info, setInfo] = useState(demoInfo);

	// 俩状态写一起吧难看，分开吧又要保证 Context 的值在浅比较下不变，只能加个 Memo。
	const value = useMemo(() => ({ loading, info }), [loading, info]);

	function tryUseRealData() {
		if (!key || typeof window === "undefined") {
			return;
		}
		setLoading(true);
		downloadSecret("/info.json.aes", key)
			.then(json => JSON.parse(new TextDecoder().decode(json)))
			.then(setInfo)
			.catch(e => alert(`用户信息解密失败，${e.message}`))
			.finally(() => setLoading(false));
	}

	useEffect(tryUseRealData, [key]);

	return <PersonInfoContext.Provider value={value}>{children}</PersonInfoContext.Provider>;
}

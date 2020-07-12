import React from "react";
import "../css/global.scss";
import "../css/layout.scss";
import "../css/mobile.scss";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

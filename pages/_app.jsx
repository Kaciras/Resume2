import PersonInfoProvider from "../components/PersonInfoContext.jsx";
import "@/css/index.scss";

// This default export is required in a new `pages/_app.jsx` file.
export default function MyApp({ Component, pageProps }) {
	return <PersonInfoProvider><Component {...pageProps} /></PersonInfoProvider>;
}

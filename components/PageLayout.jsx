import React from "react";
import Footer from "./Footer";

export default function PageLayout({ children }) {
	return <>{children}<Footer/></>;
}

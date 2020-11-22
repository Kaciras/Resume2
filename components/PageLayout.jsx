import React from "react";
import PageFooter from "./PageFooter";

export default function PageLayout({ children }) {
	return <>{children}<PageFooter/></>;
}

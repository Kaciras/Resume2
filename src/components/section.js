import React from "react";

export default function Section({ tag = "section", children }) {
	const TagName = tag;
	return (<TagName className="section"><div className="section-content">{children}</div></TagName>);
};

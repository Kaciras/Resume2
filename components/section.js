import React from "react";

export default function Section({ title, subtitle, children }) {
	let header = null;

	if (title) {
		header =
			<div className="section-header">
				<h1>{title}</h1>
				{subtitle ? <h2>{subtitle}</h2> : null}
			</div>
	}

	return (
		<section className="section">
			<div className="section-content">
				{header}
				{children}
			</div>
		</section>
	);
};

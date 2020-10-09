import React from "react";
import clsx from "clsx";
import style from "./TechLabels.module.scss";

export default function TechLabels({ stack }) {
	const labels = [];

	function render(type) {
		(stack[type] || []).forEach(name =>
			labels.push(
				<span key={name} className={clsx(style.label, style[type])}>
					{name}
				</span>
			)
		);
	}

	render("lang");
	render("frontend");
	render("backend");
	render("operation");

	return <div>{labels}</div>;
}

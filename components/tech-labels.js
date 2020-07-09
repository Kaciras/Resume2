import React from "react";
import style from "./tech.module.scss";

export default function TechLabels({ stack }) {
	const labels = [];

	function render(type) {
		(stack[type] || []).forEach(name => labels.push(
			<span key={name} className={style.label + " " + style[type]}>{name}</span>
		))
	}

	render("frontend");
	render("lang");
	render("backend");
	render("operation");

	return <div>{labels}</div>;
};
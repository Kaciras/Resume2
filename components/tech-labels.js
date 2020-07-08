import React from "react";
import "./tech.scss";

export default function TechLabels({ stack }) {
	const labels = [];

	function render(type) {
		(stack[type] || []).forEach(name => labels.push(<span className={"tech " + type}>{name}</span>))
	}

	render("frontend");
	render("lang");
	render("backend");
	render("operation");

	return <div>{labels}</div>;
};
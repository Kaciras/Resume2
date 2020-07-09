import React from "react"
import style from "./section.module.scss"

export default function Section({ title, subtitle, children }) {
	let header = null

	if (title) {
		header = (
			<div className={style.header}>
				<h1>{title}</h1>
				{subtitle ? <h2>{subtitle}</h2> : null}
			</div>
		)
	}

	return (
		<section>
			<div className={style.content}>
				{header}
				{children}
			</div>
		</section>
	)
}

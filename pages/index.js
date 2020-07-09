import React from "react";
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="container">
			<Link href="/web/index.js">
				<a>Web前端开发工程师</a>
			</Link>
		</div>
	)
}

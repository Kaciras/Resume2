import React from "react";
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>

			</Head>

			<Link href="web/index.js"/>
			<footer>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel Logo" className="logo"/>
				</a>
			</footer>
		</div>
	)
}

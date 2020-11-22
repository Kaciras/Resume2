import React from "react";
import PageFooter from "@/components/PageFooter";
import Head from "next/head";
import PersonalDetails from "@/components/PersonalDetails";
import Section from "@/components/Section";

export default function BackendResume() {
	return (
		<>
			<Head>
				<title>JAVA工程师 | 简历</title>
				<base target="_blank" />
			</Head>
			<PersonalDetails title="JAVA工程师" />
			<Section title="TODO" subtitle="编织有艺术感的代码" />
			<PageFooter />
		</>
	);
}

import React from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import ResumeHeader from "@/components/ResumeHeader";
import Section from "@/components/Section";

export default function BackendResume() {
	return (
		<>
			<Head>
				<title>JAVA工程师 | 简历</title>
				<base target="_blank" />
			</Head>
			<ResumeHeader title="JAVA工程师" />
			<Section title="TODO" subtitle="编织有艺术感的代码" />
			<Footer />
		</>
	);
}

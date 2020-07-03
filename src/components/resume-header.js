import React from "react";
import Section from "./section";

const ResumeHeader = ({ title }) => (
	<>
		<div id="name-group">
			<h1 id="name">徐帆</h1>
			<span>{title}</span>
		</div>
		<div>
			毕业于
			<strong>湖北理工学院</strong>
			<span id="degree">本科</span>
			电气与电子信息工程
		</div>
		<div id="addr-group">
			<address>QQ: 907421955</address>
			<address>Email: Kaciras@outlook.com</address>
			<address>电话: 18271645765</address>
		</div>
		<img
			id="university"
			src="../images/hbpu.jpg"
			alt="湖北理工学院"
		/>
	</>
);

export default ResumeHeader;
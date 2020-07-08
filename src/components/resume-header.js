import React from "react";

const ResumeHeader = ({ title }) => (
	<header>
		<div id="name-group">
			<h1 id="name">徐帆</h1>
			<span>{title}</span>
		</div>
		<div id="degree">
			毕业于：
			<span>湖北理工学院</span>
			<span>本科</span>
			<span>电气与电子信息工程</span>
		</div>
		<div id="addr-group">
			<address>QQ: 907421955</address>
			<address>Email: Kaciras@outlook.com</address>
			<address>电话: 18271645765</address>
		</div>
		<img
			id="university"
			src="../images/hbpu.jpg"
			alt="university"
		/>
	</header>
);

export default ResumeHeader;
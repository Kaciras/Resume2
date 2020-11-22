import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import styles from "./PageFooter.module.scss";
import ExternalLink from "@/components/ExternalLink";

function drawQRCode(canvas) {
	const options = {
		margin: 1,
		color: { light: "#fafafaff" },
	};
	QRCode.toDataURL(canvas, location.href, options, (err, url) => {
		canvas.onclick = () => window.open(url, "_blank");
	});
}

export default function PageFooter() {
	const qrCodeRef = useRef(null);
	useEffect(() => drawQRCode(qrCodeRef.current), []);

	return (
		<footer className={styles.container}>
			<div>
				<p>Copyright &copy; Kaciras 2020</p>
				<p>
					<ExternalLink href="https://github.com/Kaciras/Resume2"/>
				</p>
			</div>
			<canvas title="本页的二维码" className={styles.qrcode} ref={qrCodeRef}/>
		</footer>
	);
}

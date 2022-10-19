import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import ExternalLink from "./ExternalLink";
import styles from "./PageFooter.module.scss";

const ProjectURL = "https://github.com/Kaciras/Resume2";

const options = {
	margin: 1,
	color: { light: "#fafafaff" },
};

export default function PageFooter() {
	const [qrCodeUrl, setQRCodeUrl] = useState("");
	const qrCodeRef = useRef(null);

	function drawQRCode() {
		const canvas = qrCodeRef.current;
		QRCode.toDataURL(canvas, location.href, options).then(setQRCodeUrl);
	}

	useEffect(drawQRCode, []);

	return (
		<footer className={styles.container}>
			<div>
				<p>Copyright &copy; Kaciras 2020-2022</p>
				<p>
					<ExternalLink href={ProjectURL}/>
				</p>
			</div>
			<a href={qrCodeUrl} className={styles.qrcode}>
				<canvas ref={qrCodeRef} title="本页的二维码"/>
			</a>
		</footer>
	);
}

import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

function drawQRCode(canvas) {
	const options = {
		margin: 1,
		color: { light: "#fafafaff" },
	};
	QRCode.toDataURL(canvas, location.href, options, (err, url) => {
		canvas.onclick = () => window.open(url, "_blank");
	});
}

export default function Footer() {
	const qrCodeRef = useRef(null);
	useEffect(() => drawQRCode(qrCodeRef.current), []);

	return (
		<footer>
			<div>
				<p>Copyright &copy; Kaciras 2020</p>
				<p>
					<a href="https://github.com/Kaciras/Resume2">https://github.com/Kaciras/Resume2</a>
				</p>
			</div>
			<canvas id="qrcode" ref={qrCodeRef} />
		</footer>
	);
}

import "./globals.css";
import * as React from "react";
import { Theme } from "../components/theme";
import { AuthUserProvider } from "../../firebase/auth";

export const metadata = {
	title: "SmartNota",
	description: "by Singularity",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthUserProvider>
					<Theme>{children}</Theme>
				</AuthUserProvider>
			</body>
		</html>
	);
}

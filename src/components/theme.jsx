"use client";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeOptions = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#f4f4f5",
			light: "#09090b",
			dark: "#f4f4f5",
		},
		secondary: {
			main: "#f50057",
		},
		background: {
			default: "#3730a3",
			paper: "#312e81",
		},
		info: {
			main: "#0288d1",
		},
	},
});

export const Theme = ({ children }) => {
	return (
		<ThemeProvider theme={themeOptions}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

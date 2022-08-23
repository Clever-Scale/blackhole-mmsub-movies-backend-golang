import { colors, createTheme, responsiveFontSizes } from "@mui/material";

var theme = createTheme({
	palette: {
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			main: "#438FFE",
		},
	},

	typography: {
		subtitle2: {
			fontWeight: 900,
			fontFamily: [
				"Quicksand",
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;

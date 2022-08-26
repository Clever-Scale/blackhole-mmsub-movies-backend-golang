import localStorageProvider from "@libs/localstorageProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import App from "./App";
import "./index.css";
import theme from "./libs/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SWRConfig>
			<BrowserRouter>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</StyledEngineProvider>
			</BrowserRouter>
		</SWRConfig>
	</React.StrictMode>
);

import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "../public/vite.svg";
import "./App.css";
import { Button, Typography } from "@mui/material";
import appLanguageStore from "@atoms/appLanguage.atom";
import MainLayout from "@layouts/MainLayout";

function App() {
	const [count, setCount] = useState(0);
	const setLang = appLanguageStore((state) => state.setLanguage);
	const toggleLanguage = appLanguageStore((state) => state.toggleLanguage);

	return (
		<MainLayout>
			<Typography variant={"h1"}>{count}</Typography>
			<Button color={"secondary"} onClick={() => setCount(count + 1)}>
				+
			</Button>
			<Button variant={"contained"} onClick={() => toggleLanguage()}>
				Toggle Language
			</Button>
			<Typography variant={"h2"}>Hello, Welcome to MMSub Movies</Typography>
		</MainLayout>
	);
}

export default App;

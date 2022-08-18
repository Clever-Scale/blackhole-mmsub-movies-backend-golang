import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "../public/vite.svg";
import "./App.css";
import { Button, Typography } from "@mui/material";
import { Header } from "./Components/Header";
import appLanguageStore from "@atoms/appLanguage.atom";

function App() {
	const [count, setCount] = useState(0);
	const setLang = appLanguageStore((state) => state.setLanguage);
	const toggleLanguage = appLanguageStore((state) => state.toggleLanguage);

	return (
		<div className="App">
			<Header />
			<h1>{count}</h1>
			<button onClick={() => setCount(count + 1)}>+</button>
			<Button variant={"contained"} onClick={() => toggleLanguage()}>
				Toggle Language
			</Button>
			<Typography variant={"h2"}>Hello, Welcome to MMSub Movies</Typography>
		</div>
	);
}

export default App;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	resolve: {
		alias: {
			"@localization": "./src/localization",
			"@atoms": "./src/atoms",
		},
	},
});

import appLanguageStore from "@atoms/appLanguage.atom";
import { getText } from "@localization/index";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
	return (
		<AppBar>
			<Toolbar>
				<Typography variant={"h5"}>{getText("welcome")}</Typography>
			</Toolbar>
		</AppBar>
	);
}

import appLanguageStore from "@atoms/appLanguage.atom";
import texts from "./localization.json";

const getText = (string: keyof typeof texts) => {
	const key = string as keyof typeof texts;
	const language = appLanguageStore(
		(state) => state.language
	) as keyof typeof texts[keyof typeof texts];
	const text = texts[key][language];
	return text;
};

export { getText };

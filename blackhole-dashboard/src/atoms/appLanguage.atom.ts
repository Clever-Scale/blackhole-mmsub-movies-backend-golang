import create from "zustand";
import texts from "@localization/localization.json";

interface AppLanguageAtomInterface {
	language: keyof typeof texts[keyof typeof texts];

	setLanguage(language: keyof typeof texts[keyof typeof texts]): void;

	toggleLanguage(): void;
}

const appLanguageStore = create<AppLanguageAtomInterface>((set, get, sub) => ({
	language:
		(localStorage.getItem(
			"language"
		) as keyof typeof texts[keyof typeof texts]) || "eng",
	setLanguage: (language) => {
		set((state) => ({ language }));
		localStorage.setItem("language", language);
	},

	toggleLanguage() {
		const language = get().language;
		localStorage.setItem("language", language === "eng" ? "mm" : "eng");
		set((state) => ({ language: state.language === "eng" ? "mm" : "eng" }));
	},
}));

export default appLanguageStore;

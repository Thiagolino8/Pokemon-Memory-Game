import { vitePreprocess } from "@astrojs/svelte";

export default {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true,
	},
	vitePlugin: {
		dynamicCompileOptions({ filename }) {
			if (filename.includes("node_modules")) {
				return { runes: undefined }; // or false, check what works
			}
		},
	},
};

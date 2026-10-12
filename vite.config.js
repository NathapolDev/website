import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				// Our own Sass is fully modern (@use / sass:color, no @import and
				// no global colour functions), but Vite invokes Dart Sass through
				// the deprecated legacy JS API, which emits this warning 34x per
				// build. Silenced so genuine deprecations are not lost in the
				// noise. Remove this block once the toolchain stops using the
				// legacy API, or when Dart Sass 2.0 lands and forces the issue.
				silenceDeprecations: ["legacy-js-api"]
			}
		}
	}
});

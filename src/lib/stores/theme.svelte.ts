/**
 * Theme selection.
 *
 * The CSS in src/routes/scss/system.scss already handles `prefers-color-scheme`,
 * so the site follows the OS by default. This store adds an explicit override:
 * `data-theme` on <html> wins over the media query, and "system" removes the
 * attribute so the media query takes over again.
 *
 * The choice is persisted to localStorage and applied before first paint by an
 * inline script in src/app.html, so there is no flash of the wrong theme.
 */

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "jikan-theme";

function isThemeChoice(value: unknown): value is ThemeChoice {
	return value === "light" || value === "dark" || value === "system";
}

function readStored(): ThemeChoice {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return isThemeChoice(stored) ? stored : "system";
	} catch {
		// Private browsing or a blocked storage partition.
		return "system";
	}
}

function createThemeStore() {
	let choice = $state<ThemeChoice>("system");

	function apply(next: ThemeChoice) {
		choice = next;
		const root = document.documentElement;
		if (next === "system") {
			root.removeAttribute("data-theme");
		} else {
			root.setAttribute("data-theme", next);
		}
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Non-fatal: the theme still applies for this page view.
		}
	}

	return {
		get current() {
			return choice;
		},
		/** The theme actually in effect, resolving "system" via the media query. */
		get resolved(): "light" | "dark" {
			if (choice !== "system") return choice;
			return typeof window !== "undefined" &&
				window.matchMedia?.("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		},
		set: apply,
		toggle() {
			apply(this.resolved === "dark" ? "light" : "dark");
		},
		/** Called once on mount to sync with what is already in localStorage. */
		init() {
			apply(readStored());
		}
	};
}

export const theme = createThemeStore();

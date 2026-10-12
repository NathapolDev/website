/**
 * Minimal tooltip action, replacing @svelte-plugins/tooltips.
 *
 * That package has no `svelte` export condition, so Vite warned about it on
 * every build, and it is unmaintained. This covers what the project actually
 * uses: a text tooltip shown on hover.
 *
 * The trigger gets aria-describedby while shown, and the text is also exposed
 * as an aria-label so it is available to assistive tech whether or not the
 * tooltip is currently on screen.
 */

interface TooltipOptions {
	/** Text to display. */
	content: string;
	/** Accepted for compatibility with the previous package; unused. */
	animation?: string;
	/** Placement relative to the trigger. Defaults to "top". */
	placement?: "top" | "bottom";
}

const TOOLTIP_CLASS = "jikanTooltip";

export function tooltip(node: HTMLElement, options: TooltipOptions) {
	let current = options;
	let tip: HTMLElement | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;
	let visible = false;

	const id = `jikan-tooltip-${Math.random().toString(36).slice(2)}`;

	function show() {
		if (visible || !current.content) return;
		visible = true;

		tip = document.createElement("div");
		tip.id = id;
		tip.className = TOOLTIP_CLASS;
		tip.textContent = current.content;
		tip.setAttribute("role", "tooltip");
		document.body.appendChild(tip);

		const rect = node.getBoundingClientRect();
		const gap = 8;
		const margin = 8;
		const below = current.placement === "bottom";

		const top = below ? rect.bottom + gap : rect.top - tip.offsetHeight - gap;
		let left = rect.left + rect.width / 2 - tip.offsetWidth / 2;
		// Keep it inside the viewport rather than letting it hang off the edge.
		left = Math.min(Math.max(left, margin), window.innerWidth - tip.offsetWidth - margin);

		tip.style.top = `${Math.max(top, margin)}px`;
		tip.style.left = `${left}px`;
		tip.dataset.placement = below ? "bottom" : "top";

		node.setAttribute("aria-describedby", id);
	}

	function hide() {
		if (hideTimer !== null) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			if (!visible || !tip) return;
			visible = false;
			tip.remove();
			tip = null;
			node.removeAttribute("aria-describedby");
		}, 80);
	}

	// Pointer events only: a hover tooltip should not appear on keyboard focus,
	// where it would cover the content being read.
	node.addEventListener("pointerenter", show);
	node.addEventListener("pointerleave", hide);
	node.addEventListener("pointerdown", hide);

	if (!node.hasAttribute("aria-label")) {
		node.setAttribute("aria-label", current.content);
	}

	return {
		update(next: TooltipOptions) {
			current = next;
			if (!node.hasAttribute("aria-label")) node.setAttribute("aria-label", next.content);
			if (visible) {
				tip?.remove();
				visible = false;
				show();
			}
		},
		destroy() {
			if (hideTimer !== null) clearTimeout(hideTimer);
			node.removeEventListener("pointerenter", show);
			node.removeEventListener("pointerleave", hide);
			node.removeEventListener("pointerdown", hide);
			node.removeAttribute("aria-describedby");
			tip?.remove();
		}
	};
}

<script lang="ts">
	/**
	 * The node/line/node join between two blocks in the "How does this work?"
	 * diagram.
	 *
	 * Purely decorative and completely content-free, but it was written out
	 * three times identically. The CSS keys off .connector and .connector__*,
	 * so those class names are unchanged and the existing rules still apply.
	 */
	let { orientation = "vertical" }: { orientation?: "vertical" | "horizontal" } = $props();
</script>

<div class="connector connector--{orientation}">
	<div class="connector__node"></div>
	<div
		class="connector__line"
		class:connector__line--horizontal={orientation === "horizontal"}
	></div>
	<div class="connector__node"></div>
</div>

<script>
	import Chip from "../Chip.svelte";
	import Divider from "../Divider.svelte";
	import string from "../../helpers/string.js";

	export let statusClass = "";
	export let status = "";
	export let season = 0;
	export let year = 0;
	export let episodes = 0;
</script>

<Chip size="small" type={statusClass}>
	{string.capitalize(status)}
</Chip>
<div class="cardAnime__meta">
	{#if season !== null}
		<small>{string.capitalize(season)} {year}</small>
	{/if}
	{#if season !== null && episodes !== null}
		<Divider type="circle" />
	{/if}
	{#if episodes !== null}
		<small>{episodes} episodes</small>
	{/if}
</div>

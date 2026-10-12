<script lang="ts">
	import Chip from "../Chip.svelte";
	import Divider from "../Divider.svelte";
	import string from "../../helpers/string";

	export let statusClass: string = "";
	export let status: string = "";
	export let season: string | number | null = 0;
	export let year: number | null = 0;
	export let episodes: number | null = 0;
</script>

<Chip size="small" type={statusClass}>
	{string.capitalize(status)}
</Chip>
<div class="cardAnime__meta">
	{#if season !== null}
		<small>{string.capitalize(String(season))} {year}</small>
	{/if}
	{#if season !== null && episodes !== null}
		<Divider type="circle" />
	{/if}
	{#if episodes !== null}
		<small>{episodes} episodes</small>
	{/if}
</div>

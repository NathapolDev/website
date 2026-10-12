<script lang="ts">
	import Chip from "../Chip.svelte";
	import Divider from "../Divider.svelte";
	import string from "../../helpers/string";

	interface Props {
		statusClass?: string;
		status?: string;
		season?: string | number | null;
		year?: number | null;
		episodes?: number | null;
	}

	let { statusClass = "", status = "", season = 0, year = 0, episodes = 0 }: Props = $props();
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

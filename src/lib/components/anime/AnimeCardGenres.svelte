<script lang="ts">
	import Chip from "../Chip.svelte";

	interface Props {
		genres?: { name: string }[];
	}

	let { genres = [] }: Props = $props();
</script>

<div class="cardAnime__genres">
	{#if genres.length > 2}
		{#each genres.slice(0, 2) as genre (genre.name)}
			<Chip size="small" length="small" type="flat">{genre.name}</Chip>
		{/each}
		<Chip size="small" type="flat">+{genres.length - genres.slice(0, 2).length}</Chip>
	{:else}
		{#each genres as genre (genre.name)}
			<Chip size="small" length="small" type="flat">{genre.name}</Chip>
		{/each}
	{/if}
</div>

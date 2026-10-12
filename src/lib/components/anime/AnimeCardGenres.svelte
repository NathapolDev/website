<script>
	import Chip from "../Chip.svelte";

	export let genres = [];
</script>

<div class="cardAnime__genres">
	{#if genres.length > 2}
		{#each genres.slice(0, 2) as genre}
			<Chip size="small" length="small" type="flat">{genre.name}</Chip>
		{/each}
		<Chip size="small" type="flat">+{genres.length - genres.slice(0, 2).length}</Chip>
	{:else}
		{#each genres as genre}
			<Chip size="small" length="small" type="flat">{genre.name}</Chip>
		{/each}
	{/if}
</div>

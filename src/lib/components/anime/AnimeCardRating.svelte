<script lang="ts">
	import { IconStar, IconHash } from "@tabler/icons-svelte";

	interface Props {
		score?: number | null;
		scoredBy?: number | null;
		rank?: number | null;
	}

	let { score = 0, scoredBy = 0, rank = 0 }: Props = $props();
</script>

<div class="cardAnime__rating">
	{#if score !== null}
		<div class="cardAnime__score">
			<div>
				<IconStar stroke={1.5} size={16} />
				{score}
			</div>
			<small>{scoredBy} users</small>
		</div>
	{/if}
	<div class="cardAnime__rank">
		<div>
			{#if rank !== null}
				<IconHash stroke={1.5} size={16} />
				{rank}
			{:else}
				Unranked
			{/if}
		</div>
		<small>Ranking</small>
	</div>
</div>

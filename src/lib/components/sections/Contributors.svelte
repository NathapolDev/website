<script lang="ts">
	import { IconInfoCircle } from "@tabler/icons-svelte";
	import type { GithubData } from "../../types/github";

	/** How many contributor avatars are rendered before the "+N" overflow chip. */
	const CONTRIBUTORS_SHOWN = 6;

	/** Repository contributors, captured at build time. */
	let { contributors = [] }: { contributors?: GithubData["contributors"] } = $props();
</script>

<div class="diagram__contributorsWrapper">
	<div class="diagram__contributors">
		<div class="diagram__contributorsBody">
			<IconInfoCircle size={20} stroke={1.5} />
			<p>
				You can help us by contributing and reporting issues - so we can keep this API
				running bug-free.
			</p>
		</div>

		{#if contributors.length > 0}
			<div class="avatars">
				{#each contributors.slice(0, CONTRIBUTORS_SHOWN) as contributor (contributor.login)}
					<a href={contributor.html_url} class="avatar avatar--stacked avatar--image"
						><img
							src={contributor.avatar_url}
							alt={contributor.login}
							loading="lazy"
							decoding="async"
						/></a
					>
				{/each}
				<span class="avatar avatar--stacked avatar--more"
					>+{Math.max(contributors.length - CONTRIBUTORS_SHOWN, 0)}</span
				>
			</div>
		{/if}

		<div class="diagram__contributorsBorderHighlight"></div>
	</div>
</div>

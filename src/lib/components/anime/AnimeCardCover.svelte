<script lang="ts">
	import string from "../../helpers/string";

	interface Props {
		imageUrl?: string;
		title?: string;
		rating?: string | null;
	}

	let { imageUrl = "", title = "", rating = "" }: Props = $props();
</script>

<div class="cardAnime__cover">
	<img src={imageUrl} {title} alt={title} loading="lazy" decoding="async" />
	<div class="cardAnime__overlay">
		<div class="cardAnime__rated">
			<small>{rating === null ? "" : string.ratedToSmall(rating)}</small>
		</div>
	</div>
</div>

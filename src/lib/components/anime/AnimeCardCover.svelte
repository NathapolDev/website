<script lang="ts">
	import string from "../../helpers/string";

	export let imageUrl: string = "";
	export let title: string = "";
	export let rating: string | null = "";
</script>

<div class="cardAnime__cover">
	<img src={imageUrl} {title} alt={title} loading="lazy" decoding="async" />
	<div class="cardAnime__overlay">
		<div class="cardAnime__rated">
			<small>{rating === null ? "" : string.ratedToSmall(rating)}</small>
		</div>
	</div>
</div>

<script>
	import string from "../../helpers/string.js";

	export let imageUrl = "";
	export let title = "";
	export let rating = "";
</script>

<div class="cardAnime__cover">
	<img src={imageUrl} {title} alt={title} loading="lazy" decoding="async" />
	<div class="cardAnime__overlay">
		<div class="cardAnime__rated">
			<small>{rating === null ? "" : string.ratedToSmall(rating)}</small>
		</div>
	</div>
</div>

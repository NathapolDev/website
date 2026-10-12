<script lang="ts">
	import Button from "./Button.svelte";
	import { IconCopy, IconCheck } from "@tabler/icons-svelte";

	interface Props {
		isCopyable?: boolean;
		id?: string | null;
		value?: string;
	}

	let { isCopyable = true, id = null, value = "" }: Props = $props();

	let showCopied = $state(false);

	async function copyToClipboard() {
		const type = "text/plain";
		const blob = new Blob([value], { type });
		const data = [new ClipboardItem({ [type]: blob })];
		await navigator.clipboard.write(data);

		if (showCopied) {
			return;
		}

		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 2000);
	}
</script>

<label class="input input--read-only" for={id}>
	<input
		{id}
		type="text"
		{value}
		autocapitalize="off"
		autocomplete="off"
		spellcheck="false"
		autocorrect="off"
		readonly
	/>

	{#if isCopyable}
		<Button type="tertiary" size="small" onmessage={copyToClipboard}>
			{#if showCopied}
				<IconCheck size={20} stroke={1.5} class="inputReadOnly__copiedIcon" />
			{:else}
				<IconCopy size={20} stroke={1.5} />
			{/if}
		</Button>
	{/if}
</label>

<style lang="scss">
	:global(.inputReadOnly__copiedIcon) {
		color: forestgreen;
	}

	input {
		font-size: 12px;
	}

	@media screen and (max-width: 700px) {
		label {
			display: grid;
			grid-template-columns: auto 70px;
		}
	}
</style>

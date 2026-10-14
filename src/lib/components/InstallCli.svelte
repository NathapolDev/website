<script lang="ts">
	import InputReadOnly from "./InputReadOnly.svelte";
	import { IconCopy, IconCheck, IconTerminal } from "@tabler/icons-svelte";
	import Button from "./Button.svelte";

	/**
	 * The self-hosting quickstart shown in the hero.
	 *
	 * Replaces the old "here's the public API" demo. The public endpoint is
	 * discontinued, so the hero now shows what to run instead: the
	 * container-setup.sh workflow from jikan-rest.
	 *
	 * Every command is one real command from that script, copied verbatim, so
	 * the page cannot drift from the repository the way the old hero could.
	 */

	interface Step {
		/** What this step achieves, shown above the command. */
		label: string;
		/** The command itself. */
		command: string;
		/** Shown after the command as a hint. */
		note?: string;
	}

	const STEPS: Step[] = [
		{
			label: "Check you have Docker",
			command: "./container-setup.sh validate-prereqs",
			note: "needs the docker compose plugin"
		},
		{
			label: "Build the image",
			command: "./container-setup.sh build-image",
			note: "first run only"
		},
		{
			label: "Start the stack",
			command: "./container-setup.sh start",
			note: "mongodb, typesense, redis, api"
		}
	];

	/**
	 * A self-contained prompt an AI agent can act on to install Jikan, so a
	 * reader can hand the whole task over rather than paste commands one at a
	 * time.
	 *
	 * Kept as a single template string so it can be copied verbatim. If you
	 * change a command above, change it here too - the two are deliberately
	 * duplicated so this stays readable without the component's context.
	 */
	const LLM_PROMPT = `Set up a self-hosted Jikan REST API using Docker, from the jikan-rest repository.

1. Clone the repository and enter it:
   git clone https://github.com/jikan-me/jikan-rest.git
   cd jikan-rest

2. Verify the host has what it needs:
   ./container-setup.sh validate-prereqs

3. Build the container image:
   ./container-setup.sh build-image

4. Start the full stack (MongoDB, Typesense, Redis and the API workers):
   ./container-setup.sh start

5. Populate the database. A full scrape takes days, so run it and keep it warm:
   ./container-setup.sh execute-indexers
   ./container-setup.sh index-incrementally

The API is then served at http://localhost:8000/v4/ and an interactive reference
at http://localhost:8000/v4/docs.

Work through the steps in order, reporting each command's output. If a command
fails, diagnose and fix the cause before continuing. Do not skip steps and do
not guess at flags that the script does not document - run ./container-setup.sh
help if you are unsure what an option does.`;

	let showCopied = $state(false);

	async function copyPrompt() {
		const blob = new Blob([LLM_PROMPT], { type: "text/plain" });
		await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);

		if (showCopied) return;
		showCopied = true;
		setTimeout(() => (showCopied = false), 2000);
	}
</script>

<div class="install">
	<header class="install__head">
		<span class="install__eyebrow"><IconTerminal size={15} stroke={1.5} /></span>
		<h3>Run your own</h3>
		<p>
			Clone <code>jikan-rest</code> and the script below brings up the full stack. A first scrape
			takes days, so expect the indexers to run a while.
		</p>
	</header>

	<ol class="install__steps">
		{#each STEPS as step, i (i)}
			<li class="install__step">
				<span class="install__stepLabel">
					<span class="install__stepIndex">{i + 1}</span>
					{step.label}
					{#if step.note}<span class="install__stepNote">{step.note}</span>{/if}
				</span>
				<InputReadOnly id={`install-step-${i}`} value={step.command} />
			</li>
		{/each}
	</ol>

	<div class="install__ai">
		<div class="install__aiHead">
			<strong>Let an AI do it</strong>
			<p>
				No copy-paste needed - hand this to Claude Code, Codex, or your agent of choice and
				it will run the whole thing.
			</p>
		</div>

		<pre class="install__prompt">{LLM_PROMPT}</pre>

		<Button type="secondary-outline" size="small" callback={copyPrompt}>
			{#if showCopied}
				<IconCheck size={20} stroke={1.5} />
			{:else}
				<IconCopy size={20} stroke={1.5} />
			{/if}
			{showCopied ? "Copied" : "Copy agent prompt"}
		</Button>
	</div>
</div>

<style lang="scss">
	.install {
		display: flex;
		flex-direction: column;
		gap: 20px;

		&__head {
			display: flex;
			flex-direction: column;
			gap: 6px;

			h3 {
				margin: 0;
				font-size: 20px;
				line-height: 1.2;
			}

			p {
				margin: 0;
				color: var(--typography-300);
				font-size: 13px;
				line-height: 1.5;
			}
		}

		&__eyebrow {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			color: var(--primary-500);
			font-size: 12px;
			font-weight: 600;
			letter-spacing: 0.06em;
			text-transform: uppercase;
		}

		&__steps {
			display: flex;
			flex-direction: column;
			gap: 14px;
			margin: 0;
			padding: 0;
			list-style: none;

			counter-reset: step;
		}

		&__step {
			display: flex;
			flex-direction: column;
			gap: 8px;

			counter-increment: step;
		}

		&__stepLabel {
			display: flex;
			align-items: baseline;
			gap: 8px;
			color: var(--typography-100);
			font-size: 13px;
			font-weight: 600;
		}

		&__stepIndex {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			height: 20px;
			border-radius: 6px;
			background: var(--background-100);
			color: var(--typography-200);
			font-size: 11px;
			font-weight: 700;
			line-height: 1;
		}

		&__stepNote {
			color: var(--typography-400);
			font-size: 11px;
			font-weight: 400;
		}

		&__ai {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 16px;
			border: 1px solid var(--background-300);
			border-radius: var(--border-radius-large);
			background: var(--background-100);

			p {
				margin: 0;
				color: var(--typography-300);
				font-size: 12px;
				line-height: 1.5;
			}
		}

		&__aiHead {
			display: flex;
			flex-direction: column;
			gap: 2px;

			strong {
				color: var(--typography-100);
				font-size: 14px;
			}
		}

		&__prompt {
			margin: 0;
			padding: 12px;
			max-height: 180px;
			overflow: auto;
			border-radius: var(--border-radius-small);
			background: var(--surface-code);
			color: var(--surface-code-fg);
			font-family: "IBM Plex Mono", monospace;
			font-size: 11px;
			line-height: 1.6;
			white-space: pre;
		}
	}
</style>

<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { BlockContent } from '$lib/types/Blocks';
	import Block from '$lib/components/blocks/Block.svelte';

	interface Props {
		queryElements: BlockContent[];
	}

	let { queryElements = $bindable() }: Props = $props();

	const handleConsider = (event: CustomEvent) => {
		queryElements = event.detail.items;
	};

	const handleFinalize = (event: CustomEvent) => {
		queryElements = event.detail.items;
	};
</script>

<div class="container">
	{#if queryElements.length <= 0}
		<p class="placeholder">Drop some blocks here to begin</p>
	{/if}
	<div
		role="textbox"
		class="query_holder"
		tabindex="-1"
		use:dndzone={{ items: queryElements }}
		onconsider={handleConsider}
		onfinalize={handleFinalize}
	>
		{#each queryElements as element (element.id)}
			<Block content={element} />
		{/each}
	</div>
	<button onclick={() => (queryElements = [])}>RESET</button>
</div>

<style>
	button {
		all: unset;
		background-color: #0582ca;
		border-radius: 5px;
		color: #eee;
		cursor: pointer;
		padding: 10px;
	}

	button:hover {
		opacity: 0.8;
	}

	.container {
		align-items: center;
		display: flex;
		flex-direction: row;
		gap: 10px;
		padding: 10px;
		width: 100%;
	}

	.placeholder {
		color: #003554;
		font-family: monospace;
	}

	.query_holder {
		align-items: baseline;
		background-color: #003554;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		min-height: 80%;
		justify-content: flex-start;
		padding: 10px;
		width: 80%;
	}
</style>

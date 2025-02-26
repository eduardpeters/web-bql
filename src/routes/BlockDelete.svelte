<script lang="ts">
	import type { BlockContent } from '$lib/appTypes';
	import Block from '$lib/components/Block.svelte';
	import { dndzone } from 'svelte-dnd-action';

	let blocks: BlockContent[] = [];

	const handleConsider = (event: CustomEvent) => {
		blocks = event.detail.items;
	};

	const handleFinalize = (event: CustomEvent) => {
		blocks = [];
	};
</script>

<div class="container">
	<div class="title__container">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xml:space="preserve" width="32" height="32">
			<path
				fill="none"
				stroke="#bb1a1a"
				stroke-width="2"
				stroke-miterlimit="10"
				d="M23 27H11c-1.1 0-2-.9-2-2V8h16v17c0 1.1-.9 2-2 2zm4-19H7m7 0V6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v2m-3 15V12m4 11V12m-8 11V12"
			/>
		</svg>
		<p class="zone-title">Block disposal zone</p>
	</div>
	<div
		class="delete__dropzone"
		use:dndzone={{ items: blocks }}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each blocks as block (block.id)}
			<Block content={block} />
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 10px;
		padding: 10px;
	}

	.delete__dropzone {
		background-color: #bb1a1a;
		border-radius: 10px;
		width: 20%;
	}

	.title__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.zone-title {
		color: #bb1a1a;
		font-family: monospace;
		margin: 0;
	}
</style>

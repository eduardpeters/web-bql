<script lang="ts">
	import QueryDisplay from './QueryDisplay.svelte';
	import type { BlockContent } from '$lib/types/Blocks';
	import QueryResult from './QueryResult.svelte';
	import BlockDelete from '../blocks/BlockDelete.svelte';

	let queryElements = $state<BlockContent[]>([]);
</script>

<div class="container">
	<QueryDisplay bind:queryElements />
	<BlockDelete />
	<QueryResult {queryElements} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		width: 100%;
	}
</style>

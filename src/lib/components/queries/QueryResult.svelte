<script lang="ts">
	import query from '$lib/database/connection';
	import { dbState } from '$lib/database/dbState.svelte';
	import queryParser from '$lib/utils/queryParser';
	import type { BlockContent } from '$lib/types/Blocks';
	import type { QueryResult } from '$lib/types/Queries';

	interface Props {
		queryElements: BlockContent[];
	}

	let { queryElements }: Props = $props();
	let queryString = $state<string>('');
	let queryResult = $state<QueryResult | undefined>(undefined);

	const runQuery = async () => {
		if (!dbState.dbFile || queryElements.length === 0) return;
		queryString = queryParser(queryElements);
		if (queryString.length === 0) return;
		queryResult = await query(dbState.dbFile, queryString);
	};

	const handleReset = () => {
		queryResult = undefined;
		queryString = '';
	};
</script>

<div class="container">
	<div class="query_controls">
		<button class="button_run" onclick={runQuery}>Run Query</button>
		<button class="button_reset" onclick={handleReset}> Reset Result</button>
	</div>
	{#if !queryResult}
		<p class="placeholder">Run a query to display results here</p>
	{:else}
		<div class="overflow_handled">
			<table>
				<caption>
					{queryString}
				</caption>
				<thead>
					<tr>
						{#each queryResult.columns as column}
							<th>{column}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each queryResult.rows as row}
						<tr>
							{#each row as cell}
								<td>{cell}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	button {
		all: unset;
		border-radius: 5px;
		color: #eee;
		cursor: pointer;
		padding: 10px;
	}

	button:hover {
		opacity: 0.8;
	}

	caption {
		font-style: italic;
		color: #999;
		padding: 5px;
	}

	table {
		border-bottom: 2px solid #000;
		border-top: 2px solid #000;
		border-collapse: collapse;
		table-layout: fixed;
		text-align: center;
	}

	th {
		background-color: #0582ca;
		border-bottom: 2px solid #000;
		color: #fff;
	}

	th,
	td {
		padding: 5px;
	}

	tr:hover {
		background-color: #00a6fb44;
	}

	.button_run {
		background-color: #00a6fb;
	}

	.button_reset {
		background-color: #0582ca;
	}

	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	.overflow_handled {
		display: flex;
		justify-content: center;
		overflow-x: auto;
		width: 100%;
	}

	.placeholder {
		font-weight: bold;
	}

	.query_controls {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: 10px;
		margin: 10px;
	}
</style>

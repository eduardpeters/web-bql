<script lang="ts">
    import { dbFile } from "$lib/stores/dbStore";
    import query from "$lib/database/connection";
    import type { BlockContent, QueryResult } from "$lib/appTypes";

    export let queryElements: BlockContent[];
    let queryResult: QueryResult | undefined;

    const runQuery = async () => {
        if (!$dbFile || queryElements.length == 0) return;
        let queryString = queryElements.map((e) => e.name).join(" ");
        queryResult = await query($dbFile, queryString);
    };
</script>

<div class="container">
    <div class="query_controls">
        <button class="button_run" on:click={runQuery}>Run Query</button>
        <button class="button_reset" on:click={() => (queryResult = undefined)}>
            Reset Result</button
        >
    </div>
    {#if !queryResult}
        <p class="placeholder">Run a query to display results here</p>
    {:else}
        <table>
            <thead>
                {#each queryResult.columns as column}
                    <th>{column}</th>
                {/each}
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

    .placeholder {
        font-weight: bold;
    }

    .query_controls {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 10px;
    }
</style>

<script lang="ts">
    import { dbFile } from "$lib/stores/dbStore";
    import type { BlockContent, QueryResult } from "$lib/appTypes";
    import query from "$lib/database/connection";

    export let queryElements: BlockContent[];
    let queryResult: QueryResult | undefined;

    const runQuery = async () => {
        if (!$dbFile || queryElements.length == 0) return;
        let queryString = queryElements.map((e) => e.name).join(" ");
        queryResult = await query($dbFile, queryString);
    };
</script>

<div>
    <button on:click={runQuery}>Run Query</button>
    <button on:click={() => queryResult = undefined}>Reset Result</button>
    {#if !queryResult}
        <p>Run a query to display results</p>
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

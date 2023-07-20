<script lang="ts">
    import { dbFile } from "$lib/stores/dbFile";
    import type { BlockContent, QueryResult } from "$lib/appTypes";
    import query from "$lib/database/connection";

    export let queryElements: BlockContent[];
    let queryResult: QueryResult | undefined;

    const runQuery = async () => {
        if (!$dbFile || queryElements.length == 0) return;
        let queryString = queryElements.map((e) => e.name).join(" ");
        queryString += " pets";
        console.log(queryString);
        queryResult = await query($dbFile, queryString);
    };
</script>

<div>
    {#if !queryResult}
        <p>results table goes here</p>
    {:else}
        <p>{queryResult.columns}</p>
    {/if}
    <button on:click={runQuery}>Run Query</button>
</div>

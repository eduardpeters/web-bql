<script lang="ts">
    import { dbFile } from "$lib/stores/dbFile";
    import type { BlockContent } from "$lib/appTypes";
    import query from "$lib/database/connection";

    export let queryElements: BlockContent[];

    const runQuery = () => {
        if (!$dbFile || queryElements.length == 0) return;
        let queryString = queryElements.map((e) => e.name).join(" ");
        queryString += " pets";
        console.log(queryString);
        query($dbFile, queryString);
    };
</script>

<div>
    <p>results table goes here</p>
    <button on:click={runQuery}>Run Query</button>
</div>

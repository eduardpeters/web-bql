<script lang="ts">
    import { onMount } from "svelte";
    import { dbFile, tablesAndColumns } from "$lib/stores/dbStore";

    import { getColumns, getTables } from "$lib/database/dbUtils";

    import DbSelection from "./DBSelection.svelte";
    import BlockDisplay from "./BlockDisplay.svelte";
    import CurrentQuery from "./CurrentQuery.svelte";

    onMount(async () => {
        const res = await fetch("/simplefolks.sqlite");
        $dbFile = await res.arrayBuffer();
        const tables = await getTables($dbFile);
        console.log(tables);
        const forStore = await Promise.all(
            tables?.map(async (table) => {
                const columnNames = await getColumns($dbFile, table);
                const blockColumns = columnNames?.map((name) => ({
                    name: name,
                    type: "column",
                }));
                return {
                    name: table,
                    type: "table",
                    columns: blockColumns,
                };
            })
        );
        console.log(forStore);
    });
</script>

<h1>Welcome to Block Query Language</h1>
<main class="container">
    <DbSelection />
    <div class="displays">
        <BlockDisplay />
        <CurrentQuery />
    </div>
</main>

<style>
    .container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
    }
    .displays {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
</style>

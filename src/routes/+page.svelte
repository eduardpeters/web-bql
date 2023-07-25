<script lang="ts">
    import { onMount } from "svelte";
    import { dbFile, tablesAndColumns } from "$lib/stores/dbStore";

    import { getDbBlocks } from "$lib/database/dbUtils";

    import DbSelection from "./DBSelection.svelte";
    import BlockDisplay from "./BlockDisplay.svelte";
    import CurrentQuery from "./CurrentQuery.svelte";

    onMount(async () => {
        const res = await fetch("/simplefolks.sqlite");
        $dbFile = await res.arrayBuffer();
        $tablesAndColumns = await getDbBlocks($dbFile);
    });
</script>

<main class="container">
    <h1>Welcome to Block Query Language</h1>
    <div class="split_displays">
        <div class="display_side">
            <BlockDisplay />
        </div>
        <div class="display_side">
            <DbSelection />
            <CurrentQuery />
        </div>
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

    .display_side {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .split_displays {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }
</style>

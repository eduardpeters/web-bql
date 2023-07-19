<script lang="ts">
    import { onMount } from "svelte";
    import { dbFile } from "$lib/stores/dbFile";

    import DbSelection from "./DBSelection.svelte";
    import BlockDisplay from "./BlockDisplay.svelte";
    import QueryDisplay from "./QueryDisplay.svelte";

    onMount(async () => {
        const res = await fetch("/simplefolks.sqlite");
        $dbFile = await res.arrayBuffer();
    });
</script>

<h1>Welcome to Block Query Language</h1>
<main class="container">
    <DbSelection />
    <div class="displays">
        <BlockDisplay />
        <QueryDisplay />
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

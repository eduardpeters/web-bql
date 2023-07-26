<script lang="ts">
    import QueryDisplay from "./QueryDisplay.svelte";
    import type { BlockContent } from "$lib/appTypes";
    import QueryResult from "./QueryResult.svelte";

    let queryElements: BlockContent[] = [];
</script>

<div class="container">
    <QueryDisplay bind:queryElements />
    <QueryResult bind:queryElements />
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
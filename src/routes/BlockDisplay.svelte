<script lang="ts">
    import { tablesAndColumns } from "$lib/stores/dbStore";

    import Block from "$lib/components/Block.svelte";

    const keywords = [
        {
            name: "SELECT",
            type: "keyword",
        },
        {
            name: "FROM",
            type: "keyword",
        },
        {
            name: "WHERE",
            type: "keyword",
        },
        {
            name: "*",
            type: "column",
        },
    ];
</script>

<div class="keywords_holder">
    {#each keywords as keyword}
        <Block {keyword} />
    {/each}
    {#if $tablesAndColumns}
        {#each $tablesAndColumns as table}
            <Block keyword={table} />
            {#each table.columns as column}
                <Block keyword={column} />
            {/each}
        {/each}
    {/if}
</div>

<style>
    .keywords_holder {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        border: 1px solid black;
        padding: 5px;
    }
</style>

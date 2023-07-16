<script lang="ts">
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
</div>

<style>
    .keywords_holder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border: 1px solid black;
        padding: 10px;
    }
</style>

<script lang="ts">
    import Block from "$lib/components/Block.svelte";
</script>

<div class="keywords_holder">
    {#each ["SELECT", "FROM", "WHERE"] as keyword}
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

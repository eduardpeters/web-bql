<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let blocks: BlockContent[];

    const handleConsider = (event: any) => {
        console.log(event);
        blocks = event.detail.items;
    };

    const handleFinalize = (event: any) => {
        console.log(event);
        blocks = event.detail.items;
    };
</script>

<div
    class="keywords_holder"
    use:dndzone={{ items: blocks }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
>
    {#each blocks as block (block.id)}
        <Block content={block} />
        {#if block.columns}
            {#each block.columns as column}
                <Block content={column} />
            {/each}
        {/if}
    {/each}
</div>

<style>
    .keywords_holder {
        align-items: center;
        border: 1px solid #051923;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 5px;
        width: 95%;
    }
</style>

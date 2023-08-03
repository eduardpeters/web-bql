<script lang="ts">
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let blocks: BlockContent[];

    const handleDragStart = (event: DragEvent, content: BlockContent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.setData("text/plain", JSON.stringify(content));
        event.dataTransfer.dropEffect = "copy";
    };
</script>

<div class="keywords_holder">
    {#each blocks as block}
        <Block content={block} {handleDragStart} />
        {#if block.columns}
            {#each block.columns as column}
                <Block content={column} {handleDragStart} />
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

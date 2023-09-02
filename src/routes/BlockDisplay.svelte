<script lang="ts">
    import {
        dndzone,
        TRIGGERS,
        SHADOW_ITEM_MARKER_PROPERTY_NAME,
    } from "svelte-dnd-action";
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let blocks: BlockContent[];

    let ignoreDndEvents = false;

    const handleConsider = (event: any) => {
        console.log(event);
        const { trigger, id } = event.detail.info;
        if (trigger === TRIGGERS.DRAG_STARTED) {
            console.warn("generating copy for", id);
            const index = blocks.findIndex((block) => block.id === id);
            const newId = `${id}_copy_${Math.round(Math.random() * 1000)}`;
            event.detail.items = event.detail.items.filter(
                (item: Item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
            );
            event.detail.items.splice(index, 0, {
                ...blocks[index],
                id: newId,
            });
            blocks = event.detail.items;
            ignoreDndEvents = true;
        } else if (!ignoreDndEvents) {
            blocks = event.detail.items;
        } else {
            blocks = [...blocks];
        }
    };

    const handleFinalize = (event: any) => {
        console.log(event);
        if (!ignoreDndEvents) {
            blocks = event.detail.items;
        } else {
            blocks = [...blocks];
            ignoreDndEvents = false;
        }
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

<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let queryElements: BlockContent[];
    let draggedElement: { content: BlockContent; removed: boolean } | null;

    const handleConsider = (event: any) => {
        console.log(event);
        queryElements = event.detail.items;
    };

    const handleFinalize = (event: any) => {
        console.log(event);
        queryElements = event.detail.items;
    };

    const handleDragStart = (event: DragEvent, content: BlockContent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.setData("text/plain", JSON.stringify(content));
        event.dataTransfer.dropEffect = "move";
        draggedElement = { content, removed: false };
    };

    const handleDragEnd = (event: DragEvent, content: BlockContent) => {
        if (!event || !event.dataTransfer) return;
        if (event.dataTransfer.dropEffect === "none") {
            queryElements = queryElements.filter(
                (element) => element !== content
            );
        }
        draggedElement = null;
    };

    const handleDragOver = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        if (draggedElement) return;
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        queryElements = [...queryElements, data];
    };

    const handleDragEnter = (event: DragEvent) => {
        if (!event || !event.dataTransfer || !draggedElement) return;
        draggedElement.removed = false;
    };

    const handleDragLeave = (event: DragEvent) => {
        if (!event || !event.dataTransfer || !draggedElement) return;
        draggedElement.removed = true;
    };
</script>

<div class="container">
    <div
        role="textbox"
        class="query_holder"
        tabindex="-1"
        on:dragover|preventDefault={handleDragOver}
        on:drop|preventDefault={handleDrop}
        on:dragenter|preventDefault={handleDragEnter}
        on:dragleave|preventDefault={handleDragLeave}
    >
        {#if queryElements.length > 0}
            {#each queryElements as element}
                <Block content={element} {handleDragStart} {handleDragEnd} />
            {/each}
        {:else}
            <p class="placeholder">Drop some blocks here to begin</p>
        {/if}
    </div>
    <button on:click={() => (queryElements = [])}>RESET</button>
</div>
<p>DND re-implementation</p>
<div class="container">
    {#if queryElements.length <= 0}
        <p class="placeholder">Drop some blocks here to begin</p>
    {/if}
    <div
        role="textbox"
        class="query_holder"
        tabindex="-1"
        use:dndzone={{ items: queryElements }}
        on:consider={handleConsider}
        on:finalize={handleFinalize}
    >
        {#each queryElements as element}
            <Block content={element} />
        {/each}
    </div>
    <button on:click={() => (queryElements = [])}>RESET</button>
</div>

<style>
    button {
        all: unset;
        background-color: #0582ca;
        border-radius: 5px;
        color: #eee;
        cursor: pointer;
        padding: 10px;
    }

    button:hover {
        opacity: 0.8;
    }

    .container {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding: 10px;
        width: 100%;
    }

    .placeholder {
        color: #eee;
        font-family: monospace;
    }

    .query_holder {
        align-items: baseline;
        background-color: #003554;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 10px;
        width: 80%;
    }
</style>

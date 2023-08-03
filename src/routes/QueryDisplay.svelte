<script lang="ts">
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    export let queryElements: BlockContent[];
    let draggedElement: any;

    const handleDragStart = (event: DragEvent, content: BlockContent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.setData("text/plain", JSON.stringify(content));
        event.dataTransfer.dropEffect = "move";
        draggedElement = { content, removed: false };
    };

    const handleDragEnd = (event: DragEvent, content: BlockContent) => {
        if (!event || !event.dataTransfer) return;
        console.log(event.dataTransfer);
        if (event.dataTransfer.dropEffect === "none") {
            console.log("dropped outside");
            console.log(draggedElement);
        }
        draggedElement = null;
    };

    const handleDragOver = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        if (draggedElement && draggedElement.removed) return;
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

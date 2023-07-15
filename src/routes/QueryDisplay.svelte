<script lang="ts">
    let queryElements: string[] = [];

    const handleDragOver = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        const data = event.dataTransfer.getData("text/plain");
        queryElements = [...queryElements, data];
    };
</script>

<div
    role="textbox"
    class="queries_holder"
    tabindex="-1"
    on:dragover|preventDefault={handleDragOver}
    on:drop|preventDefault={handleDrop}
>
    {#if queryElements.length > 0}
        <p>{queryElements.join(" ")}</p>
    {:else}
        <p>Drop some keywords here to begin</p>
    {/if}
</div>
<button on:click={() => (queryElements = [])}>RESET</button>

<style>
    .queries_holder {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: flex-start;
        border: 1px solid black;
        min-width: 400px;
    }
</style>

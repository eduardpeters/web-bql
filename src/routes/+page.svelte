<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";

    let queryElements: string[] = [];

    const handleDrag = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        const target = event.target as HTMLElement;
        event.dataTransfer.setData("text/plain", target.innerText);
        event.dataTransfer.dropEffect = "copy";
    };

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

<h1>Welcome to Block Query Language</h1>
<main class="container">
    <BlockDisplay handleDrag={handleDrag} />
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
    <button on:click={() => queryElements = []}>RESET</button>
</main>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        min-height: 300px;
    }

    .queries_holder {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: flex-start;
        border: 1px solid black;
        min-width: 400px;
    }
</style>

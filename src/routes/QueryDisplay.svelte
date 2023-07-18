<script lang="ts">
    import { onMount } from "svelte";
    import type { BlockContent } from "$lib/appTypes";
    import Block from "$lib/components/Block.svelte";

    import initializeDB from "$lib/database/connection";

    let queryElements: BlockContent[] = [];
    let input;
    let file;

    onMount(async () => {
        const res = await fetch('/simplefolks.sqlite');
        file = await res.arrayBuffer();
    });

    const handleUpload = () => {
        //const f = input.files[0];
        const f  = file;
        if (!f) return;
        console.log(f);
        initializeDB(f);
        /* const r = new FileReader();
        r.addEventListener('load', function onLoad() {
            initializeDB(r.result);
            this.removeEventListener('load', onLoad);
        });
        r.readAsArrayBuffer(f); */
    };

    const handleDragOver = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
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
        {#each queryElements as element}
            <Block keyword={element} />
        {/each}
    {:else}
        <p>Drop some keywords here to begin</p>
    {/if}
</div>
<button on:click={() => (queryElements = [])}>RESET</button>
<input type="file" bind:this={input} />
<button on:click={handleUpload}>TEST DB</button>

<style>
    .queries_holder {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: flex-start;
        border: 1px solid black;
        padding: 10px;
    }
</style>

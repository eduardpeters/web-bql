<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";
    import QueryDisplay from "./QueryDisplay.svelte";

    const handleDrag = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        const target = event.target as HTMLElement;
        event.dataTransfer.setData("text/plain", target.innerText);
        event.dataTransfer.dropEffect = "copy";
    };
</script>

<h1>Welcome to Block Query Language</h1>
<main class="container">
    <BlockDisplay {handleDrag} />
    <QueryDisplay />
</main>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        min-height: 300px;
    }
</style>

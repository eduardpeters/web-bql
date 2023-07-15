<script lang="ts">
    export let keyword: string;

    const handleDrag = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        const target = event.target as HTMLElement;
        event.dataTransfer.setData("text/plain", target.innerText);
        event.dataTransfer.dropEffect = "copy";
    };
</script>

<div
    class="block"
    role="textbox"
    tabindex="-1"
    draggable="true"
    on:dragstart={handleDrag}
>
    {keyword}
</div>

<style>
    .block {
        background-color: #57cc99;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        cursor: grab;
    }
</style>

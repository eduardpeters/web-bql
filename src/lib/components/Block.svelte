<script lang="ts">
    import type { BlockContent, Dictionary } from "$lib/appTypes";

    export let content: BlockContent;

    const colors: Dictionary<string> = {
        keyword: '#57cc99',
        column: '#80ED99',
        table: '#38A3A5',
    };

    const handleDrag = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.setData("text/plain", JSON.stringify(content));
        event.dataTransfer.dropEffect = "copy";
    };
</script>

<div
    class="block"
    style="--block-color: {colors[content.type]}"
    role="textbox"
    tabindex="-1"
    draggable="true"
    on:dragstart={handleDrag}
>
    {content.name}
</div>

<style>
    .block {
        background-color: var(--block-color);
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        cursor: grab;
    }
</style>

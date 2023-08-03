<script lang="ts">
    import type { BlockContent, Dictionary } from "$lib/appTypes";

    export let content: BlockContent;
    export let handleDrag: (event: DragEvent, content: BlockContent) => void;

    const colors: Dictionary<string> = {
        keyword: '#78C6A3',
        column: '#67B99A',
        table: '#14746F',
        symbol: '#99E2B4',
    };
</script>

<div
    class="block"
    style="--block-color: {colors[content.type]}"
    role="textbox"
    tabindex="-1"
    draggable="true"
    on:dragstart={(event) => handleDrag(event, content)}
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

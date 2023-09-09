<script lang="ts">
    import type { BlockContent, Dictionary } from "$lib/appTypes";
    import { BlockTypes } from "$lib/appTypes";

    export let content: BlockContent;

    const colors: Dictionary<string> = {
        [BlockTypes.keyword]: "#78C6A3",
        [BlockTypes.column]: "#67B99A",
        [BlockTypes.table]: "#14746F",
        [BlockTypes.symbol]: "#99E2B4",
        [BlockTypes.number]: "#469D89",
    };
</script>

<div
    class="block"
    style="--block-color: {colors[content.type]}"
    role="textbox"
    tabindex="-1"
>
    {content.name}
</div>

<style>
    .block {
        background-color: var(--block-color);
        border-radius: 5px;
        cursor: grab;
        margin: 5px;
        padding: 5px;
        width: fit-content;
    }
</style>

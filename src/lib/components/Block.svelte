<script lang="ts">
    export let keyword: { name: string; type: string };

    type ColorMap = { [key: string]: string};
    const colors: ColorMap = {
        keyword: '#57cc99',
        column: '#80ED99',
    }
    const handleDrag = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        event.dataTransfer.setData("text/plain", JSON.stringify(keyword));
        event.dataTransfer.dropEffect = "copy";
    };
</script>

<div
    class="block"
    style="--block-color: {colors[keyword.type]}"
    role="textbox"
    tabindex="-1"
    draggable="true"
    on:dragstart={handleDrag}
>
    {keyword.name}
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

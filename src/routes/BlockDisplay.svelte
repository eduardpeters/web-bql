<script lang="ts">
    export let handleDrag: (event: DragEvent) => void;
</script>

<div class="keywords_holder">
    {#each ["SELECT", "FROM", "WHERE"] as keyword}
        <p draggable="true" on:dragstart={handleDrag}>{keyword}</p>
    {/each}
</div>

<style>
    .keywords_holder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        min-width: 400px;
    }
</style>

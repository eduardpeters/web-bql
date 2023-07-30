<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";

    import { tablesAndColumns } from "$lib/stores/dbStore";
    import { keywords } from "$lib/keywords/keywords";
</script>

<div>
    <BlockDisplay blocks={keywords} />
</div>

<style>
</style>

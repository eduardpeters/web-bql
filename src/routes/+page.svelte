<script lang="ts">
    import BlockDisplay from "./BlockDisplay.svelte";
    import QueryDisplay from "./QueryDisplay.svelte";
</script>

<h1>Welcome to Block Query Language</h1>
<main class="container">
    <BlockDisplay />
    <QueryDisplay />
</main>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 10px;
    }
</style>

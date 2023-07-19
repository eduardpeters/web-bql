<script lang="ts">
    export let dbFile;
    let input: HTMLInputElement;

    const handleUpload = () => {
        if (!input.files) return;
        const newFile = input.files[0];
        if (!newFile) return;
        const r = new FileReader();
        r.addEventListener("load", function onLoad() {
            dbFile = r.result;
            this.removeEventListener("load", onLoad);
        });
        r.readAsArrayBuffer(newFile);
    };
</script>

<h2>Use the default DB or upload your own</h2>
{#if input?.files && input?.files[0]}
    <p>Using user DB</p>
{:else}
    <p>Using default DB</p>
{/if}
<input
    type="file"
    accept=".sqlite"
    bind:this={input}
    on:change={handleUpload}
/>

<style>
</style>

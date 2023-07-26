<script lang="ts">
    import { dbFile, tablesAndColumns } from "$lib/stores/dbStore";
    import { getDbBlocks } from "$lib/database/dbUtils";

    let input: HTMLInputElement;
    let isOnDragArea = false;

    $: active_class = isOnDragArea ? "input_active" : "";

    const handleDrop = (event: DragEvent) => {
        if (!event || !event.dataTransfer) return;
        input.files = event.dataTransfer.files;
        handleUpload();
    };

    const handleUpload = () => {
        if (!input.files) return;
        const newFile = input.files[0];
        if (!newFile) return;
        const r = new FileReader();
        r.addEventListener("load", async function onLoad() {
            $dbFile = r.result as ArrayBuffer;
            $tablesAndColumns = await getDbBlocks($dbFile);
            this.removeEventListener("load", onLoad);
        });
        r.readAsArrayBuffer(newFile);
    };
</script>

<div class="selection_container">
    <h2>Use the default DB or upload your own</h2>
    <div class="row_container">
        <div class="selected_db">
            {#if input?.files && input?.files[0]}
                Using user DB
            {:else}
                Using default DB
            {/if}
        </div>
        <label
            class="input_container {active_class}"
            on:dragenter={() => (isOnDragArea = true)}
            on:dragleave={() => (isOnDragArea = false)}
            on:dragover|preventDefault
            on:drop|preventDefault={handleDrop}
        >
            <span class="input_title">Drop a SQLite DB here!</span>
            or
            <input
                type="file"
                accept=".sqlite"
                bind:this={input}
                on:change={handleUpload}
            />
        </label>
    </div>
</div>

<style>
    h2 {
        margin: 5px;
    }

    input[type="file"] {
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        color: #444;
        padding: 5px;
    }

    input[type="file"]::file-selector-button {
        background: #00A6FB;
        border: none;
        border-radius: 5px;
        color: #eee;
        padding: 5px;
    }
    input[type="file"]::file-selector-button:hover {
        opacity: 0.8;
    }

    .input_container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        border: 2px dashed #081c15;
        border-radius: 10px;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }

    .input_container:hover,
    .input_active {
        background-color: #eee;
    }

    .input_title {
        font-weight: bold;
    }

    .selection_container {
        display: flex;
        flex-flow: column;
        margin: 10px;
        padding: 5px;
    }

    .selected_db {
        background-color: #00A6FB;
        border-radius: 5px;
        color: #eee;
        padding: 5px;
    }

    .row_container {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>

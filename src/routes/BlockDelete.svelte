<script lang="ts">
    let blocks = [];
</script>

<div class="container">
    <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            xml:space="preserve"
            width="32"
            height="32"
        >
            <path
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-miterlimit="10"
                d="M23 27H11c-1.1 0-2-.9-2-2V8h16v17c0 1.1-.9 2-2 2zm4-19H7m7 0V6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v2m-3 15V12m4 11V12m-8 11V12"
            />
        </svg>
        <p>Block disposal zone</p>
    </div>
    <div class="delete__dropzone" />
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
    }

    .delete__dropzone {
        background-color: #bb1a1a;
        border-radius: 10px;
        height: 100%;
        width: 50%;
    }
</style>

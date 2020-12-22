<script lang="ts">
    export let value: number;
</script>

<div class="progressBar">
    <progress {value} />
    <div class="slot">
        <slot/>
    </div>
</div>

<style>
    .progressBar {
        display: grid;
        position: relative;
        border-radius: 1em;
        overflow: hidden;
    }
    .slot {
        z-index: 1;
    }
    progress {
        position: absolute;
        width: 100%;
        height: 100%;
        color: var(--winColorLight);
        background-color: var(--loseColorLight);
        border: 0;
    }
    progress::-moz-progress-bar {
        background-color: var(--winColorLight);
    }
    progress::-webkit-progress-value {
        background-color: var(--winColorLight);
    }
    progress::-webkit-progress-bar {
        background-color: var(--loseColorLight);
    }
</style>
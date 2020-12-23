<script lang="ts" context="module">
    export async function preload(page) {
        const { hasWon } = page.query;

        return { hasWon: hasWon === "true" };
}
</script>

<script lang="ts">
    export let hasWon: boolean;
</script>

<div>
    {#if hasWon}
        <h1>You won!</h1>
        😃
    {:else}
        <h1>You lost!</h1>
        😟
    {/if}
</div>

<style>
    div {
        display: grid;
        align-content: center;
        text-align: center;
        min-height: 100vh;
    }
</style>
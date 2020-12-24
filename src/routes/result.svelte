<script lang="ts" context="module">
    export async function preload(page) {
        const { hasWon, payAmount } = page.query;

        return {
            hasWon: hasWon === "true",
            payAmount,
        };
}
</script>

<script lang="ts">
import Loader from "../components/Loader.svelte";

    export let hasWon: boolean;
    export let payAmount: string;

    let address: string;

    const result = new Promise(resolve=>setTimeout(()=>resolve(hasWon), 1000))
</script>

<div>
    {#await result}
        <Loader/>
    {:then hasWon}
        {#if hasWon}
            <h1>You won!</h1>
            😃
            <h4>Where should we send your reward?</h4>
            <input
                bind:value={address}
                type="text"
                placeholder="Bitcoin address, e.g. bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
            >
            <button disabled={!address}>Send {payAmount}$</button>
        {:else}
            <h1>You lost!</h1>
            😟
            <button on:click={()=>history.back()}>Try Again!</button>
        {/if}
    {/await}
</div>

<style>
    div {
        display: grid;
        align-content: center;
        text-align: center;
        min-height: 100vh;
    }
    h4 {margin-top: 2em;}
    input {
        font-size: 0.7em;
        padding: 0.7em;
    }
    button {
        padding: 0.5em;
        font-size: 1em;
        margin: 1em 0;
        width: 100%;
    }
</style>
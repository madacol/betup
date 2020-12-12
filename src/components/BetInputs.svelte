<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import InputNumber from "./InputNumber.svelte";

	export let netWinAmount: number;
	export let betAmount: number;

    /**
     * Trigger fade-in transition on mounting
     */
    let isMounted = false;
    onMount(()=>isMounted=true)
</script>

{#if isMounted}
    <div in:fade|local>
        <InputNumber
            bind:value={netWinAmount}
            label="How much you'd like to win?"
            autofocus
            min="0"
        />
    </div>
{/if}
{#if netWinAmount}
    <div transition:fade|local>
        <InputNumber
            bind:value={betAmount}
            label="How much you'd like to bet?"
            min="0"
        />
    </div>
{/if}

<script lang="ts">
import { fade, slide } from "svelte/transition";

/**
 * This component works like an `{#if ...}` statement,
 * but with built-in transitions, fade and slide
 */
    export let _: boolean | number;
</script>

{#if _}
    <div transition:fade|local>
        <div transition:slide|local {...$$restProps}>
            <slot/>
        </div>
    </div>
{/if}

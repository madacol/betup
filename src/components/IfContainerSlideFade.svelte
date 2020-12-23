<script lang="ts">
import { fade, slide } from "svelte/transition";

    export let if_: boolean | number;
</script>

{#if if_}
    <div transition:fade|local>
        <div transition:slide|local {...$$restProps}>
            <slot/>
        </div>
    </div>
{/if}

<script lang="ts">
import { tweened } from "svelte/motion";

import { getPercentageString } from "../helpers/getPorcentageString";
import ProgressBar from "./ProgressBar.svelte";

    export let winChance: number;
    export let payAmount: number;

    /**
     * Tweened variables / smoothing changing
     */
    const winChanceTweened = tweened(0);
    $: $winChanceTweened = winChance || 0;
</script>


<div class="winChance" title={winChance.toString()}>
    <h4>Win chance</h4>
    <ProgressBar value={$winChanceTweened}>
        <span>{getPercentageString($winChanceTweened)}</span>
    </ProgressBar>
    <span>We'd pay {payAmount}$</span>
</div>

<style>
	.winChance {
        display: grid;
    }
    div > :global(.progressBar){
        font-size: 1.5em;
    }
    div > span {
        font-size: 0.6em;
        margin-top: 0.5em;
    }
</style>
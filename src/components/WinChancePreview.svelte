<script lang="ts">
import { tweened } from "svelte/motion";
import { getPercentageString } from "../helpers/getPorcentageString";
import ShowValue from "./ShowValue.svelte";

    export let winChance: number;

    /**
     * `winChance` with smoothing motion
     */
    const winChanceProgress = tweened(0);
    $: $winChanceProgress = winChance || 0;
</script>


<div title={$winChanceProgress.toString()}>
    <ShowValue label="Win chance" value={getPercentageString($winChanceProgress)}/>
    <progress value={$winChanceProgress} />
</div>

<style>
	div {
		display: grid;
	}
</style>
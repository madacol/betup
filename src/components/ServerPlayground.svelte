<script lang="ts">
import { getPercentageString } from "../helpers/getPorcentageString";
import InputNumber from "./InputNumber.svelte";
import ShowValue from "./ShowValue.svelte";

    export let maxWinChanceReached: boolean;
    export let fairWinChance: number;
    export let realProfitPercent: number;
    export let availableCapital: number;
    export let maxRiskChance: number;
    export let profitPercent: number;
</script>

{#if maxWinChanceReached}
	<div class="warning">
		<ShowValue label="Fair win chance" value={getPercentageString(fairWinChance)}/>
		<br>
		<ShowValue label="Profit percent" value={getPercentageString(realProfitPercent)}/>
		<br>
		<br>
		<span>
			Max risk chance reached!
			<br>
			Win chance is now capped and below the "Fair win chance"
			<br>
			If higher, the chance of losing the "available capital" gets above the "max risk chance" configured below
		</span>
	</div>
{/if}
<div class="settings">
	<InputNumber bind:value={availableCapital} label="Available capital"/>
	<InputNumber bind:value={maxRiskChance} label="Max risk chance" step="any"/>
	<InputNumber bind:value={profitPercent} label="Profit percent" step="0.01"/>
</div>

<style>
	.warning {
		background-color: rgb(185, 185, 185);
	}
	.settings {
		display: grid;
		align-items: center;
		grid-template-rows: 1fr 1fr auto;
		gap: 2em;
		transition-duration: 1s;
	}
</style>
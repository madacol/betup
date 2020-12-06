<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script lang="ts">
	import InputNumber from "../components/InputNumber.svelte";
	import ShowValue from "../components/ShowValue.svelte";

	let winAmount: number = 100;
	let betAmount: number = 76;

	let availableCapital = 10000;
	let maxRiskChance = 0.000000000001;
	let profitPercent = 0.02;

	let winChance: number;
	let maxWinChanceReached: boolean;
	$: {
		let fairWinChance = betAmount/winAmount * (1-profitPercent);
		let maxWinChance: number;
		{
			let repeatedBetsCapacity = availableCapital / winAmount;
			maxWinChance = maxRiskChance ** (1/repeatedBetsCapacity);
		}
		maxWinChanceReached = fairWinChance > maxWinChance;
		if (maxWinChanceReached) {
			winChance = maxWinChance;
			betAmount = maxWinChance*winAmount / (1-profitPercent);
		} else {
			winChance = fairWinChance;
		}
	}

</script>

<h1>Bet Up!</h1>

<div class="sequentialInputs">
	<div class="input"><InputNumber bind:value={winAmount} label="How much you'd like to win?"/></div>
	<div class="input"><InputNumber bind:value={betAmount} label="How much you'd like to bet?"/></div>
</div>
<div class="results" class:maxWinChanceReached>
	<ShowValue label="Win chance" value={`${(winChance*100)||0}%`}/>
	<br>
	{#if maxWinChanceReached}
		<span>
			Max win chance reached!.
			<br>
			If higher, the chance of losing the "available capital" gets above the "max risk chance" below
		</span>
	{/if}
</div>
<hr>
<div class="settings">
	<div class="input"><InputNumber bind:value={availableCapital} label="Available capital"/></div>
	<div class="input"><InputNumber bind:value={maxRiskChance} step="any" label="Max risk chance"/></div>
	<div class="input"><InputNumber bind:value={profitPercent} step="0.01" label="Profit percent"/></div>
</div>

<style>
	h1 {
		text-align: center;
		margin-bottom: 1em;
	}
	.sequentialInputs,
	.settings {
		display: grid;
	}
	.results {
		background-color: rgb(129, 255, 129);
	}
	.results.maxWinChanceReached {
		background-color: rgb(255, 136, 136);
	}
	.input {
		margin: 0.5em;
	}
</style>
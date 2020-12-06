<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script lang="ts">
	import InputNumber from "../components/InputNumber.svelte";
	import ShowValue from "../components/ShowValue.svelte";

	let winAmount: number = 100;
	let betAmount: number = 10;

	let availableCapital = 10000;
	let maxRiskChance = 0.000000000001;
	let profitPercent = 0.02;

	let winChance: number;
	$: {
		let idealWinChance = betAmount/winAmount * (1-profitPercent);
		let repeatedBetsCapacity = availableCapital / winAmount;
		let maxWinChance = maxRiskChance ** (1/repeatedBetsCapacity);
		winChance = Math.min(idealWinChance, maxWinChance);
	}

</script>

<h1>Bet Up!</h1>

<div class="sequentialInputs">
	<div class="input"><InputNumber bind:value={winAmount} label="How much you'd like to win?"/></div>
	<div class="input"><InputNumber bind:value={betAmount} label="How much you'd like to bet?"/></div>
</div>
<div class="results">
	<ShowValue label="Win chance" value={`${(winChance*100)||0}%`}/>
</div>
<hr>
<div class="settings">
	<div class="input"><InputNumber bind:value={availableCapital} label="Available capital"/></div>
	<div class="input"><InputNumber bind:value={maxRiskChance} label="Max risk chance"/></div>
	<div class="input"><InputNumber bind:value={profitPercent} label="Profit percent"/></div>
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
	.input {
		margin: 0.5em;
	}
</style>
<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script lang="ts">
	import InputNumber from "../components/InputNumber.svelte";
	import ShowValue from "../components/ShowValue.svelte";

	let winAmount: number = 100;
	let betAmount: number = 54;

	let availableCapital = 1000;
	let maxRiskChance = 1e-6;
	let profitPercent = 0.02;


	let winChance: number;
	let maxWinChanceReached: boolean;
	let fairWinChance: number;
	let realProfitPercent: number;
	$: {
		let idealWinChance = betAmount/winAmount;
		fairWinChance = idealWinChance * (1-profitPercent);
		let maxWinChance: number;
		{
			let riskAmount = winAmount-betAmount;
			let repeatedBetsCapacity = availableCapital / (riskAmount);
			maxWinChance = maxRiskChance ** (1/repeatedBetsCapacity);
		}
		maxWinChanceReached = fairWinChance > maxWinChance;
		if (maxWinChanceReached) {
			winChance = maxWinChance;
			realProfitPercent = 1 - (winChance / idealWinChance)
			// betAmount = maxWinChance*winAmount / (1-profitPercent);
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
</div>
<hr>
{#if maxWinChanceReached}
	<div class="warning">
		<ShowValue label="Fair win chance" value={`${(fairWinChance*100)||0}%`}/>
		<br>
		<ShowValue label="Profit percent" value={`${(realProfitPercent*100)||0}%`}/>
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
	<div><InputNumber bind:value={availableCapital} label="Available capital"/></div>
	<div><InputNumber bind:value={maxRiskChance} label="Max risk chance" step="any"/></div>
	<div><InputNumber bind:value={profitPercent} label="Profit percent" step="0.01"/></div>
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
	.warning {
		background-color: rgb(185, 185, 185);
	}
	.input {
		margin: 0.5em;
	}
</style>
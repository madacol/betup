<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	import InputNumber from "../components/InputNumber.svelte";
	import ShowValue from "../components/ShowValue.svelte";

	let payAmount: number;
	let betAmount: number;

	let availableCapital = 10000;
	let maxRiskChance = 1e-6;
	let profitPercent = 0.02;

	let winChance: number;
	let maxWinChanceReached: boolean;
	let fairWinChance: number;
	let realProfitPercent: number;
	$: {
		let idealWinChance = betAmount/payAmount;
		fairWinChance = idealWinChance * (1-profitPercent);

		let maxWinChance: number;
		{
			let netWinAmount = payAmount-betAmount;
			let repeatedBetsCapacity = availableCapital / (netWinAmount);
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

	const winChanceProgress = tweened(0);
	$: $winChanceProgress = winChance || 0;

	let isMounted = false;
	onMount(()=>isMounted=true)

	function getPercentageString (probability) {
		const percentage = (probability*100)||0;
		return `${percentage}%`;
	}
</script>


<div id="screenSize">
	<h1>Bet Up!</h1>

	<div class="sequentialAppearingElements">
		{#if isMounted}
			<div in:fade>
				<InputNumber
					bind:value={payAmount}
					label="How much you'd like to win?"
				/>
			</div>
		{/if}
		{#if payAmount}
			<div transition:fade>
				<InputNumber
					bind:value={betAmount}
					label="How much you'd like to bet?"
				/>
			</div>
		{/if}
		{#if winChance}
			<div transition:fade class="results" class:maxWinChanceReached>
				<ShowValue label="Win chance" value={getPercentageString($winChanceProgress)}/>
				<progress value={$winChanceProgress} />
			</div>
		{/if}
	</div>
</div>

<hr>

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
	<div><InputNumber bind:value={availableCapital} label="Available capital"/></div>
	<div><InputNumber bind:value={maxRiskChance} label="Max risk chance" step="any"/></div>
	<div><InputNumber bind:value={profitPercent} label="Profit percent" step="0.01"/></div>
</div>

<style>
	#screenSize {
		display: grid;
		grid-template-rows: 10em auto 10em;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 100vh;
	}
	h1 {
		text-align: center;
		font-size: 5em;
		margin-top: 1em;
		margin-bottom: 0.5em;
	}
	.sequentialAppearingElements,
	.settings {
		display: grid;
		align-items: center;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 2em;
	}
	.results {
		display: grid;
		background-color: rgb(129, 255, 129);
	}
	.results.maxWinChanceReached {
		background-color: rgb(255, 136, 136);
	}
	.warning {
		background-color: rgb(185, 185, 185);
	}
</style>
<svelte:head>
	<title>Bet Up!</title>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	import InputNumber from "../components/InputNumber.svelte";
	import ShowValue from "../components/ShowValue.svelte";

	/**
	 * User inputs
	 */
	let netWinAmount: number;
	let betAmount: number;

	/**
	 * Server parameters
	 */
	let availableCapital = 10000;
	let maxRiskChance = 1e-6;
	let profitPercent = 0.02;

	/**
	 * Update calculations
	 */
	$: payAmount = netWinAmount+betAmount;
	$: idealWinChance = betAmount/payAmount;
	$: fairWinChance = idealWinChance * (1-profitPercent);

	let maxWinChance: number;
	$: {
		let repeatedBetsCapacity = availableCapital / (netWinAmount);
		maxWinChance = maxRiskChance ** (1/repeatedBetsCapacity);
	}
	$: maxWinChanceReached = fairWinChance > maxWinChance;

	let winChance: number;
	let realProfitPercent: number;
	$: if (maxWinChanceReached) {
		winChance = maxWinChance;
		realProfitPercent = 1 - (winChance / idealWinChance)
		/**
		 * Put a limit to the betAmount when this condition happens
		 */
		// betAmount = maxWinChance*netWinAmount / (1-profitPercent);
	} else {
		winChance = fairWinChance;
		realProfitPercent = profitPercent;
	}

	/**
	 * `winChance` with smoothing motion
	 */
	const winChanceProgress = tweened(0);
	$: $winChanceProgress = winChance || 0;

	/**
	 * Trigger fade-in transition on mounting
	 */
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
					bind:value={netWinAmount}
					label="How much you'd like to win?"
					autofocus
				/>
			</div>
		{/if}
		{#if netWinAmount}
			<div transition:fade>
				<InputNumber
					bind:value={betAmount}
					label="How much you'd like to bet?"
				/>
			</div>
		{/if}
		{#if winChance}
			<div transition:fade>
				<div transition:slide class="offer">
					<div title={$winChanceProgress.toString()} class="grid">
						<ShowValue label="Win chance" value={getPercentageString($winChanceProgress)}/>
						<progress value={$winChanceProgress} />
					</div>
				</div>
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
	<InputNumber bind:value={availableCapital} label="Available capital"/>
	<InputNumber bind:value={maxRiskChance} label="Max risk chance" step="any"/>
	<InputNumber bind:value={profitPercent} label="Profit percent" step="0.01"/>
</div>

<style>
	#screenSize {
		display: grid;
		grid-template-rows: 10em auto;
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
		grid-template-rows: 1fr 1fr auto;
		gap: 2em;
		font-size: 1.5em;
		transition-duration: 1s;
	}
	.offer {
		display: grid;
		gap: 2em;
		text-align: center;
	}
	.grid {
		display: grid;
	}
	.warning {
		background-color: rgb(185, 185, 185);
	}
</style>
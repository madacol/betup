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

	/**
	 * Bet management
	 */
	let betAccepted=false;
	function acceptBet() {betAccepted=true;}
	function unacceptBet() {betAccepted=false;}

	function getPercentageString (probability) {
		const roundedProbability = Math.floor(probability*10000)/10000
		const percentage = (roundedProbability*100).toFixed(2)||0;
		return `${percentage}%`;
	}
</script>


<div id="screenSize">

	<div id="body">
		<h1>Bet Up!</h1>
		{#if !betAccepted}
			<div transition:slide class="makeBet">
				{#if isMounted}
					<div in:fade|local>
						<InputNumber
							bind:value={netWinAmount}
							label="How much you'd like to win?"
							autofocus
							min="0"
						/>
					</div>
				{/if}
				{#if netWinAmount}
					<div transition:fade|local>
						<InputNumber
							bind:value={betAmount}
							label="How much you'd like to bet?"
							min="0"
						/>
					</div>
				{/if}
				{#if netWinAmount && winChance}
					<div transition:fade|local>
						<div transition:slide|local class="bet-offer">
							<div title={$winChanceProgress.toString()} class="simple-grid">
								<ShowValue label="Win chance" value={getPercentageString($winChanceProgress)}/>
								<progress value={$winChanceProgress} />
							</div>
							<button on:click={acceptBet}>Accept Bet</button>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div transition:slide|local>
				<div transition:fade|local>
					<h1>Overview</h1>
					<div class="overview-bet">
						<span>Win chance:</span>{getPercentageString(winChance)}
						<span>We pay:</span>{payAmount}
						<span>You pay:</span>{betAmount}
					</div>
					<div class="payment">
						<h4>Pay to</h4>
						<code>bc1testtesttesttesttesttesttesttesttesttes</code>
						<button on:click={unacceptBet}>Go back</button>
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
		padding: 2em;
		display: grid;
		align-items: center;
		justify-content: stretch;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
	}
	#body {
		width: 100%;
	}
	#body > h1 {
		font-size: 3em;
	}
	.makeBet,
	.settings {
		display: grid;
		align-items: center;
		grid-template-rows: 1fr 1fr auto;
		gap: 2em;
		transition-duration: 1s;
	}
	.bet-offer {
		display: grid;
		gap: 2em;
	}
	.simple-grid {
		display: grid;
	}
	.overview-bet {
		display: grid;
		grid-template-columns: auto auto;
		text-align: start;
		column-gap: 1em;
		font-size: 1.3em;
	}
	.overview-bet > span{
		text-align: end;
	}
	.payment {
		margin-top: 2em;
		display: grid;
		gap: 1em;
	}
	.payment > h4 {margin: 0;}
	.payment > code {font-size: 0.7em;}
	.warning {
		background-color: rgb(185, 185, 185);
	}
</style>